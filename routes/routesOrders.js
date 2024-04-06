import express from 'express';
import pool from '../modules/modules.js';
import exp from 'constants';

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  pool
  .query('SELECT * FROM orders')
  .then((data) => res.json(data.rows))
  .catch((err) => console.error(err));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool
  .query('SELECT * FROM orders WHERE id = $1', [id])
  .then((data) => res.json(data.rows))
  .catch((err) => console.error(err));
});

router.post('/', (req, res) => {
  const { id, price, date, user_id } = req.body;
  pool
  .query('INSERT INTO orders (id, price, date, user_id) VALUES ($1, $2, $3, $4)', [id, price, date, user_id])
  .then(() => res.send('Order added!'))
  .catch((err) => console.error(err));
});




router.put('/:id', (req, res) => {
  const { id, price, date, user_id } = req.body;
  pool
  .query('UPDATE orders SET price = $1, date = $2, user_id = $3 WHERE id = $4', [price, date, user_id, id])
  .then(() => res.send('Order updated!'))
  .catch((err) => console.error(err));
}
);

router.delete('/:id', async (req, res) => {
  const orderId = req.params.id;

  try {
    await pool.query('DELETE FROM orders WHERE id = $1', [orderId]);
    res.send('Order deleted!');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
);


export default router;