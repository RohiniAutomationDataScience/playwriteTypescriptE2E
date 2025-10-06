import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 4000, SECRET = 'sauce-secret';

app.use(express.json());

//  Health check for readiness
app.get('/health', (_req, res) => res.status(200).send('OK'));

const USERS = new Set([
  'standard_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user',
]);

app.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === 'locked_out_user') return res.status(403).json({ error: 'locked' });
  if (USERS.has(username) && password === 'secret_sauce') {
    const token = jwt.sign({ sub: username }, SECRET, { expiresIn: '15m' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'unauthorized' });
});

const INVENTORY = [
  { id: 1, name: 'Sauce Labs Backpack', price: 29.99 },
  { id: 2, name: 'Sauce Labs Bike Light', price: 9.99 },
  { id: 3, name: 'Sauce Labs Fleece Jacket', price: 49.99 },
];

function auth(req, res, next) {
  const [, t] = (req.headers.authorization || '').split(' ');
  try { jwt.verify(t, SECRET); next(); }
  catch { res.status(401).json({ error: 'unauthorized' }); }
}

app.get('/inventory', auth, (_req, res) => res.json(INVENTORY));

const cart = new Map();
app.post('/cart/add', auth, (req, res) => {
  const [, t] = (req.headers.authorization || '').split(' ');
  const { productId, qty } = req.body || {};
  const items = cart.get(t) || [];
  items.push({ productId, qty });
  cart.set(t, items);
  res.json({ added: true });
});
app.get('/cart', auth, (req, res) => {
  const [, t] = (req.headers.authorization || '').split(' ');
  res.json({ items: cart.get(t) || [] });
});

//  Safe server start: prevents EADDRINUSE crash
const server = app.listen(PORT, () => {
  console.log(`[mock] API running at http://127.0.0.1:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`[mock] Port ${PORT} already in use → skipping duplicate start.`);
  } else {
    throw err; // rethrow unexpected errors only
  }
});
