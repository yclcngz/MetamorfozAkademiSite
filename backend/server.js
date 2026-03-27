require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Metamorfoz Akademi API Çalışıyor');
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışmaya başladı.`);
});
