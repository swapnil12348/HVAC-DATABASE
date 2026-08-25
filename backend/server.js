import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vendorRoutes from './routes/vendorRoutes.js';

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use('/api/vendors', vendorRoutes);

// If running locally on your laptop, use port 5000. 
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

// THIS IS THE MAGIC LINE FOR VERCEL
export default app;