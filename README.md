# 🛒 Plateforme E-commerce Fullstack

Une plateforme e-commerce moderne et complète avec React/Tailwind CSS pour le frontend et Laravel/MySQL pour le backend.

## 🚀 Fonctionnalités

### 👨‍💼 Panel Administrateur
- 📊 **Tableau de bord** avec statistiques en temps réel
- 🏪 **Configuration boutique** (nom, logo, couleurs, adresse)
- 📦 **Gestion produits** (CRUD, upload d'images, catégories)
- 📋 **Gestion commandes** (suivi, statuts, historique)
- 👥 **Gestion clients** et profils utilisateurs

### 🛍️ Interface Client
- 🏠 **Page d'accueil** moderne et responsive
- 📱 **Catalogue produits** avec filtres et recherche
- 🛒 **Panier d'achat** et processus de commande
- 👤 **Profil client** et historique des achats
- 📱 **Design responsive** optimisé mobile

### 🔧 Technique
- 🔐 **Authentification sécurisée** (JWT/Sanctum)
- 🌐 **API REST** complète et documentée
- 📸 **Upload et gestion d'images**
- 🎨 **Interface moderne** avec Tailwind CSS
- ⚡ **Performance optimisée**

## 🏗️ Architecture

```
ecom/
├── backend/          # Laravel API
│   ├── app/
│   ├── database/
│   └── routes/
└── frontend/         # React App
    ├── src/
    ├── public/
    └── package.json
```

## 🛠️ Installation

### Prérequis
- PHP 8.2+
- Node.js 18+
- MySQL 8.0+
- Composer

### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend (React)
```bash
cd frontend
npm install
npm start
```

## 📚 Documentation API

L'API REST complète sera documentée avec tous les endpoints disponibles pour :
- Authentification
- Gestion produits
- Gestion commandes
- Configuration boutique

## 🎨 Design

Interface moderne utilisant Tailwind CSS avec :
- Design responsive mobile-first
- Composants réutilisables
- Thème personnalisable
- Animations fluides

## 🧪 Tests et Validation

- ✅ **Backend testé** : API endpoints fonctionnels
- ✅ **Base de données** : Migrations et seeders exécutés  
- ✅ **Frontend compilé** : Application React démarrée
- ✅ **Intégration** : Communication frontend-backend validée

**Comptes de test :**
- Admin : `admin@ecommerce.com` / `password`
- Client : `client@example.com` / `password`

---

**Développé avec ❤️ pour une expérience e-commerce exceptionnelle**
