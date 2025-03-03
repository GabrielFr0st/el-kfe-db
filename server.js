const express = require("express");
const cors = require("cors");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

const allowedOrigins = [
    "https://el-kfe-frontend.netlify.app",
    "http://localhost:3000"
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(🚀 Servidor corriendo en puerto ${PORT}));

module.exports = app;
