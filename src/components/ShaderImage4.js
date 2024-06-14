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

// ShaderToy GLSL code

// Function to generate 2D noise - can be used for movement
float noise(vec2 p) {
  return fract(sin(dot(p ,vec2(127.1,311.7))) * 43758.5453123);
}

// Interpolated noise function for smooth transitions
float smoothNoise(vec2 p) {
  vec2 inter = fract(p);
  p = floor(p);
  float a = noise(p);
  float b = noise(p + vec2(1.0, 0.0));
  float c = noise(p + vec2(0.0, 1.0));
  float d = noise(p + vec2(1.0, 1.0));
  float u = inter.x * inter.x * (3.0 - 2.0 * inter.x);
  float v = inter.y * inter.y * (3.0 - 2.0 * inter.y);
  return mix(a, b, u) + (c - a) * v * (1.0 - u) + (d - b) * u * v;
}

// 3D Perlin noise function for dynamic movements inside the sphere
float perlinNoise(vec3 p) {
  float total = 0.0;
  float frequency = 1.0;
  float amplitude = 1.0;
  for (int i = 0; i < 4; i++) {
    total += smoothNoise(p.xy * frequency) * amplitude;
    frequency *= 2.0;
    amplitude /= 2.0;
  }
  return total;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  // Normalized coordinates [0,1]
  vec2 uv = fragCoord / iResolution.xy;
  uv = uv * 2.0 - 1.0;
  uv.x *= iResolution.x / iResolution.y;

  // Settings for Sphere
  vec3 camPos = vec3(0.0, 0.0, -5.0);
  vec3 ro = camPos;
  vec3 rd = normalize(vec3(uv, 1.0));

  float time = iTime * 0.5;
  vec3 spherePos = vec3(sin(time) * 1.0, sin(time * 0.7) * 1.0, 5.0);
  float sphereRadius = 5.0; // Considerable larger sphere

  // Sphere Rendering
  float A = dot(rd, rd);
  float B = 2.0 * dot(rd, ro - spherePos);
  float C = dot(ro - spherePos, ro - spherePos) - sphereRadius * sphereRadius;

  float D = B * B - 4.0 * A * C;

  if (D < 0.0) {
    // No hit, pastel pink background
    fragColor = vec4(1.0, 0.9, 0.9, 1.0);
    return;
  }

  // Calculate intersection distance
  float t = (-B - sqrt(D)) / (2.0 * A);

  // Intersection point and normal
  vec3 intersectPos = ro + t * rd;
  vec3 normal = normalize(intersectPos - spherePos);

  // Light Direction
  vec3 lightDir = normalize(vec3(-0.5, 1.0, -1.0));

  // Basic Diffuse Lighting
  float diffuse = max(dot(normal, lightDir), 0.0);

  // Add dynamic Perlin noise for internal organic movement
  float noiseValue = perlinNoise(intersectPos + vec3(0.0, 0.0, iTime * 0.5));

  // Combine colors and lighting
  vec3 color = vec3(0.3, 0.6, 0.9) * diffuse;
  color += vec3(0.1, 0.1, 0.5) * noiseValue;

  fragColor = vec4(color, 1.0);
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

const ShaderImage4 = ({ width, height }) => {
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

export default ShaderImage4;
