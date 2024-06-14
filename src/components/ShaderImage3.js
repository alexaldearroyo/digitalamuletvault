'use client';

import { useRef, useEffect } from 'react';

const vertexShaderSource = `
attribute vec4 aPosition;
void main() {
  gl_Position = aPosition;
}
`;

const fragmentShaderSource = `
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  uv = uv * 2.0 - 1.0;
  uv.x *= iResolution.x / iResolution.y;

  float scale = 2.5;
  float rotationSpeed = 0.02; // Reducir la velocidad de rotación
  float zoomSpeed = 0.01;     // Reducir la velocidad de zoom

  // Aumentar y reducir la escala de los fractales con el tiempo
  float t = iTime * zoomSpeed;
  scale /= sin(0.5 * t) * 0.5 + 1.0; // Oscilar entre aumentar y disminuir

  // Rotar los fractales con el tiempo
  float angle = iTime * rotationSpeed;
  mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

  vec3 col = vec3(0.0);
  vec2 z = uv * scale;

  // Ajustar la animación de color
  float hue = atan(z.y, z.x) + sin(iTime * 0.1) * 10.0; // Reducir velocidad de hue
  z *= rot; // Aplicar la rotación

  vec2 c = vec2(0.355, 0.355);
  float iters = 0.0;

  for (int i = 0; i < 256; i++) {
    if (dot(z, z) > 4.0) break;
    z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
    iters += 1.0;
  }

  // Convertir iters en color RGB y suavizar los colores
  float normIters = iters / 256.0;
  col = vec3(0.5 + 0.3 * sin(6.28318 * (normIters + vec3(0.0, 0.33, 0.67) + hue)));

  // Añadir una iluminación central más suave
  float distance = length(uv);
  vec3 background = vec3(0.5 + 0.5 * sin(iTime * 0.1 + uv.xyx + vec3(0,2,4))); // Fondo cambiante más lento
  col = mix(background, col, smoothstep(1.0, 0.6, distance));

  fragColor = vec4(col, 1.0);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Error compiling shader:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Error linking program:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

const ShaderImage3 = ({ width, height }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.error('No WebGL support');
      return;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );
    const program = createProgram(gl, vertexShader, fragmentShader);

    if (!program) {
      console.error('Failed to create program');
      return;
    }

    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    const resolutionUniformLocation = gl.getUniformLocation(
      program,
      'iResolution',
    );
    const timeUniformLocation = gl.getUniformLocation(program, 'iTime');

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    function render(time) {
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(program);

      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(
        resolutionUniformLocation,
        gl.canvas.width,
        gl.canvas.height,
      );
      gl.uniform1f(timeUniformLocation, time * 0.001);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="rounded-lg"
    />
  );
};

export default ShaderImage3;
