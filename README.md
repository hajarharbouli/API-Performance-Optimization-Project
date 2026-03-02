🎓 API Performance Optimization Project
📌 Objective

Analyze and improve the performance of a REST API under heavy load.

Phase 1 — Baseline (No Cache)

Tech Stack: Node.js + Express + MySQL

Database Volume:

10,000 users

5,000 products

50,000 orders

~200,000 order_items

Tested Endpoint: GET /top-customers
Complex SQL query using JOIN, GROUP BY, ORDER BY, Aggregations

Load Test (Autocannon):

autocannon -c 100 -d 30 http://localhost:3000/top-customers

Results:

Avg latency: 5623 ms

Requests/sec: 1

270 timeouts

High saturation under load

Conclusion:
Without caching, the API struggles under concurrent load due to heavy SQL aggregation queries on large datasets.

Phase 2 — In-Memory Cache (RAM)

Modification:

Added memory cache in Node.js

First request queries MySQL

Subsequent requests served from RAM

Endpoint: GET /top-customers

Same SQL query as baseline

Load Test (Autocannon):

autocannon -c 100 -d 30 http://localhost:3000/top-customers

Results:

Avg latency: 8 ms ✅

Requests/sec: 11,067 ✅

Max latency: 52 ms

0 timeouts

Observation:

Latency reduced by ~700x

Throughput massively improved

Cache drastically reduces database load

Conclusion:
In-memory cache is extremely effective for repeated queries and dramatically improves API performance under high load.

