🎓 API Performance Optimization Project
📌 Objective

Analyze and improve the performance of a REST API under heavy load.

Experiment 1 — Baseline (No Cache)
🛠 Tech Stack

Node.js

Express

MySQL

autocannon

📊 Database Volume

10,000 users

5,000 products

50,000 orders

~200,000 order_items

Bulk inserted using transactions.

🔍 Tested Endpoint

GET /top-customers

Complex SQL query using:

JOIN

GROUP BY

ORDER BY

Aggregations

🚀 Load Test Configuration
autocannon -c 100 -d 30 http://localhost:3000/top-customers

100 concurrent connections

30 seconds duration

📉 Results (No Cache)

Average latency: 5623 ms

Requests/sec: 1 req/sec

270 timeouts

High saturation under load

🧠 Conclusion

Without caching, the API struggles under concurrent load due to heavy SQL aggregation queries on large datasets.

Next step: Implement in-memory cache.