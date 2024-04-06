import express from 'express';
import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;
import usersRoutes from './routes/routesUsers.js';
import ordersRoutes from './routes/routesOrders.js';
const app = express();

// routes
app.use('/users', usersRoutes);
app.use('/orders', ordersRoutes);
app.use('/users/:id', ordersRoutes);
app.use('/orders/:id', ordersRoutes);



const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});