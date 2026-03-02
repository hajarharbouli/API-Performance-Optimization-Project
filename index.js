let memoryCache = null;
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

//  Connexion MySQL
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'hatsstah',
  database: 'api_performance',
  connectionLimit: 10
});

//  ROUTE API (ICI )
app.get('/top-customers', async (req, res) => {
  try {

    const start = Date.now();

    // 1️ Vérifier cache mémoire
    if (memoryCache) {
      const end = Date.now();
      return res.json({
        source: "RAM Cache",
        execution_time_ms: end - start,
        data: memoryCache
      });
    }

    //  Sinon → MySQL
    const [rows] = await db.query(`
      SELECT 
        u.id,
        u.name,
        COUNT(DISTINCT o.id) as total_orders,
        SUM(oi.quantity) as total_products,
        SUM(o.total) as total_spent
      FROM users u
      JOIN orders o ON u.id = o.user_id
      JOIN order_items oi ON o.id = oi.order_id
      GROUP BY u.id
      ORDER BY total_spent DESC
      LIMIT 10
    `);

    memoryCache = rows; //  Stocker en mémoire

    const end = Date.now();

    res.json({
      source: "MySQL",
      execution_time_ms: end - start,
      data: rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
//  Lancer le serveur
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});