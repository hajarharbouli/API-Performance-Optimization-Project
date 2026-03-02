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


RAM vs Redis — Conclusion Technique

Pour une architecture mono-serveur, le cache RAM est plus rapide car l’accès se fait directement en mémoire sans overhead réseau.
Cependant, dans une architecture multi-serveurs, Redis devient indispensable : il permet de partager le cache entre toutes les instances, d’assurer la persistance et de gérer automatiquement TTL et éviction.

RAM = ultra rapide (mono-instance)
Redis = scalable et distribué (production)