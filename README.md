📄  API Performance Optimization Project
🎯 Objectif du projet

Améliorer la performance d’une API REST sous forte charge.
Technologies : Node.js + Express + MySQL (+ cache mémoire et Redis pour optimisation).

🛠️ Stack utilisée

Node.js / Express

MySQL (base de données réelle, 10k+ users, 50k+ commandes, 200k+ order_items)

Redis (cache distribué)

Autocannon (outil de test de charge)

📌 Endpoint testé

GET /top-customers

SQL complexe avec JOIN, GROUP BY, ORDER BY, SUM et COUNT

Retourne les 10 meilleurs clients en fonction des dépenses totales
📊 Comparaison des performances
| Phase|Cache | Latence moyenne | Req/sec moyenne | Max latency | Total requests | Total data |
| -----| -----| --------------- | --------------- | ----------- | -------------- | ---------- |
| Ph 1 | Aucun| 5623 ms | 1 | 8309 ms| 400| 38.6 KB|
| Ph 2 | RAM (mémoire locale)| 8 ms| 11 067| 52 ms| 332k| 444 MB|
| Ph 3 | Redis (TTL 60s, distribué)| 16.6 ms| 5 857| 135 ms| 176k| 236 MB|

🔍 Observations

1️⃣ Phase 1 (Baseline)

Très lente sous forte charge

Timeouts fréquents

SQL complexe saturait MySQL

2️⃣ Phase 2 (RAM Cache)

Latence < 10 ms

Très haut débit (Req/sec)

Parfait pour requêtes répétitives sur un seul serveur

Non persistant et limité à la RAM locale

3️⃣ Phase 3 (Redis Cache)

Latence légèrement supérieure à RAM locale (TCP overhead)

Req/sec élevé et stable

Persistance et partage multi-instance

TTL = 60 s → cache se rafraîchit automatiquement

Production-ready et adapté à architecture distribuée

⚡ Conclusion

L’ajout d’un cache améliore drastiquement les performances d’une API REST.

Cache RAM → idéal pour serveur unique et répétition de requêtes fréquentes.

Redis → indispensable pour architecture distribuée et production.

Ce projet montre l’importance d’optimiser les endpoints SQL lourds avec un cache adapté.