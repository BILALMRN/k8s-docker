# Ecomerce_k8s

---
## the main functionality of BackEnd Api

`1. product `

	Créer , search , supprimer des produits.
	Récupérer des informations sur les produits.

`2. order`

	Gérer la création de nouvelles commandes.
	Mettre à jour le statut des commandes (par exemple, en attente, expédiée, livrée).
			--Order lifecycle:
				• OrderCreated
				• OrderApproved
				• OrderPaid
				• OrderPrepared
				• OrderShipped
				• OrderDelivered
	l'historique des commandes pour les utilisateurs et admin par id
	
`3.  admin` 

	Créer un compte admin.
	Authentifier les admin.
	Gérer les profils admin.
	Gérer la réinitialisation du mot de passe.
	
 `4. user` 

	Créer un compte utilisateur.
	Authentifier les utilisateurs.
	Gérer les profils utilisateur.
	Gérer la réinitialisation du mot de passe.
	
`5. stock`  

	Mettre à jour le stock des produit


-----
### Conventional Commit Messages 

* `feat:`     - Adding a new feature
* `fix:`      - Fixing a bug
* `perf:`     - Improving performance
* `refactor:` - Refactoring code without changing its behavior
* `style:`    - Making code style changes (e.g., formatting, indentation)
* `test:`     - Adding or modifying tests
* `docs:`     - Updating documentation
* `build:`    - Modifying (build system or external dependencies) (e.g.,build tools, CI pipeline, dependencies, project version)
* `ops:`      - Making operational changes (e.g., infrastructure, deployment, backup, recovery)
* `chore:`    - General tasks, maintenance, or other non-categorized changes (e.g., modifying `.gitignore`, updating README)
