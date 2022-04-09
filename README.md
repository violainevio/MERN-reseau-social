"# MERN-reseau-social"

# 🚀 Javascript full-stack 🚀

## MERN Stack

### React / Express / MongoDB / Redux

Démarrer le server : `npm start`

Démarrer le front : `cd client` + `npm start`

---

### Back config :

- Mettez vos informations de cluster dans `/config/db.js`
- Créez le fichier `.env` dans `/config/` dans les données suivantes
  - PORT=5000 `votre port localhost`
  - CLIENT_URL=http://localhost:3000 `votre URL client`
  - DB_USER_PASS=violaine:mpd `votre identifiant et mot de passe`
  - TOKEN_SECRET=8uhXEmtVhFeKLxZojVj3cgaz5N9CpYKburR8UUy2DysY8AFfjfxuk4XAxfgh6KETQLxCP5tPWoRiNAZuZhvuFsy9oqZSnJar9nHkx5LmA3boAcn8EGdDUD3nQevytJYQ `votre clé secrète aléatoire`

---

### Front config :

- Créez un fichier `.env` dans l'URL du serveur :
  - REACT_APP_API_URL=http://localhost:5000/ `l'url de votre serveur`

---

![Texte alternatif](./client/public/img/screenshot.jpg "Capture d'écran")
