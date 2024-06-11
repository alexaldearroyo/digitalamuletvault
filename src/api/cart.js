export default function handler(req, res) {
  if (req.method === 'POST') {
    const { cart } = req.body;

    // Validate cart data (e.g., prices)
    const validatedCart = cart.map((item) => {
      const product = mockProducts.find((p) => p.id === item.id);
      return {
        ...item,
        price: product ? product.price : 0,
      };
    });

    res.status(200).json({ cart: validatedCart });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
