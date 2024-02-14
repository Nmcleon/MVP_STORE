import express from 'express';
import dotenv  from 'dotenv';
dotenv.config();
import path from 'path'
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js'

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const port = process.env.PORT;
connectDB();

const __dirname = path.resolve()
const app = express();

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookie parser middleware
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('API RUNNING...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes)

app.use('/api/upload', uploadRoutes)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }))

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server started on ${port}`));
