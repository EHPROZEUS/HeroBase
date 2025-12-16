# HeroBase# 📊 HeroBase - Tableau de Filtres

Application React pour le suivi et la gestion des filtres automobiles basée sur Firebase Firestore.

## 🚀 Fonctionnalités

- ✅ Affichage des tableaux de filtres par devis
- 📅 Filtrage par jour, mois et année
- 📊 Calcul automatique des totaux
- 🔄 Tri des colonnes
- 📱 Interface responsive
- 🎨 Design moderne et épuré

## 📦 Installation

1. **Cloner le repository**
```bash
git clone https://github.com/EHPROZEUS/HeroBase.git
cd HeroBase
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration Firebase**

Créer un fichier `.env` à la racine du projet avec vos credentials Firebase : 

```env
REACT_APP_FIREBASE_API_KEY=votre_api_key
REACT_APP_FIREBASE_PROJECT_ID=votre_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
REACT_APP_FIREBASE_APP_ID=votre_app_id
```

4. **Lancer l'application**
```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 🏗️ Structure du Projet

```
src/
├── config/
│   └── firebase.js              # Configuration Firebase
├── services/
│   └── firebaseService.js       # Services d'accès aux données
├── components/
│   ├── Dashboard.js             # Composant principal
│   ├── FilterTable.js           # Tableau des filtres
│   ├── PeriodFilter.js          # Filtres de période
│   └── LoadingSpinner.js        # Indicateur de chargement
├── utils/
│   └── dateUtils.js             # Utilitaires de dates
├── styles/
│   ├── App.css
│   ├── Dashboard.css
│   ├── FilterTable.css
│   ├── PeriodFilter.css
│   └── LoadingSpinner.css
├── App.js
└── index.js
```

## 📊 Structure des Données Firebase

Collection :  `herotoolQuotes`

Champs principaux :
- `dateVehicule` : date du devis (YYYY-MM-DD)
- `marque`, `modele`, `moteur` : informations véhicule
- `LPCAR`, `LPCAV`, `LPD`, `LPG`, etc. : compteurs de filtres
- `lead` : numéro du devis

## 🎯 Utilisation

1. **Vue globale** : Par défaut, tous les devis sont affichés
2. **Filtrage par période** : 
   - Sélectionner "Jour", "Mois" ou "Année"
   - Choisir la date souhaitée
3. **Tri** : Cliquer sur les en-têtes de colonnes
4. **Totaux** : Consultez les totaux en bas du tableau

## 🛠️ Technologies Utilisées

- **React 18** - Framework JavaScript
- **Firebase Firestore** - Base de données NoSQL
- **CSS3** - Styling moderne

## 📝 Scripts Disponibles

- `npm start` - Lance l'application en mode développement
- `npm build` - Compile l'application pour la production
- `npm test` - Lance les tests

## 🔒 Sécurité

⚠️ **Important** : Ne commitez jamais le fichier `.env` avec vos credentials Firebase. 
Le fichier est déjà inclus dans `.gitignore`.

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge (dernières versions)
- ✅ Responsive (mobile, tablette, desktop)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.

## 📄 Licence

Ce projet est privé et propriétaire. 

---

Développé avec ❤️ pour HeroTool