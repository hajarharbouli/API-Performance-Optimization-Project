🚀 API Performance Optimization Project
🎯 Objectif

Optimiser la performance d’une API REST exécutant une requête SQL complexe sous forte charge.
🏗️ Test Multi-Serveurs (Architecture Distribuée)

Deux instances Node.js lancées simultanément :

http://localhost:3000

http://localhost:3001

Redis partagé entre les deux serveurs.

Résultats :
Serveur 3000

Latence : 6.31 ms

Req/sec : 7 460

Serveur 3001

Latence : 6.49 ms

Req/sec : 7 144

✅ Performance stable
✅ Cache partagé entre instances
✅ Très faible charge sur MySQL

📈 Graphique ASCII
Latence (ms)
Phase 1 |████████████████████████████████████████████████| 5623 ms
Phase 2 |██                                              | 8 ms
Phase 3 |███                                             | 16 ms
Multi   |██                                              | 6 ms
Requests/sec
Phase 1 |█                                               | 1
Phase 2 |██████████████████████████████████████████████  | 11067
Phase 3 |██████████████████████                          | 5857
Multi   |████████████████████████                        | ~7200 per instance

RAM vs Redis — Conclusion Technique

Pour une architecture mono-serveur, le cache RAM est plus rapide car l’accès se fait directement en mémoire sans overhead réseau.
Cependant, dans une architecture multi-serveurs, Redis devient indispensable : il permet de partager le cache entre toutes les instances, d’assurer la persistance et de gérer automatiquement TTL et éviction.

RAM = ultra rapide (mono-instance)
Redis = scalable et distribué (production)