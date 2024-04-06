import express from 'express';
import pool from '../modules/modules.js';

const router = express.Router();

router.use(express.json());


router.get('/', (req, res) => {
  pool
  .query('SELECT * FROM users')
  .then((data) => res.json(data.rows))
  .catch((err) => console.error(err));
});



router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool
  .query('SELECT * FROM users WHERE id = $1', [id])
  .then((data) => res.json(data.rows))
  .catch((err) => console.error(err));
});

router.post('/', (req, res) => {
  const { id, first_name, last_name, age, active } = req.body;
  pool
  .query('INSERT INTO users (id, first_name, last_name, age, active) VALUES ($1, $2, $3, $4, $5)', [id, first_name, last_name, age, active])
  .then(() => res.send('User added!'))
  .catch((err) => console.error(err));
});

router.put('/:id', (req, res) => {
  const { id, first_name, last_name, age, active } = req.body;
  pool
  .query('UPDATE users SET first_name = $1, last_name = $2, age = $3, active = $4 WHERE id = $5', [first_name, last_name, age, active, id])
  .then(() => res.send('User updated!'))
  .catch((err) => console.error(err));
}   );

router.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Delete related rows in the "orders" table
    await pool.query('DELETE FROM orders WHERE user_id = $1', [userId]);

    // Then delete the user from the "users" table
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);

    res.send('User deleted!');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})




export default router;
