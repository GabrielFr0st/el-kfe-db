const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Pool } = require("pg");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect()
    .then(() => console.log("📦 Conectado a la base de datos"))
    .catch((err) => console.error("❌ Error al conectar la base de datos:", err));

const allowedOrigins = [
    "https://el-kfe.netlify.app",
    "http://localhost:3000"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));

module.exports = { app, pool };
