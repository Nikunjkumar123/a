// API Route
let cart = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const product = req.body;
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      cart.push({ ...product, quantity: product.quantity || 1 });
    }

    return res.status(200).json({ cart });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    cart = cart.filter((item) => item.id !== id);
    return res.status(200).json({ cart });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ cart });
  }

  res.status(405).end();
}
