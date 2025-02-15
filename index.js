require("dotenv").config();
const express = require("express");
const fs = require("fs");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const PORT = 25030;
const adsFile = "ads.json";
const pointsFile = "points.json";


if (!fs.existsSync(pointsFile)) {
    fs.writeFileSync(pointsFile, JSON.stringify({}, null, 2));
}

// Fonctions utilitaires
function loadAds() {
    return JSON.parse(fs.readFileSync(adsFile));
}

function loadPoints() {
    return JSON.parse(fs.readFileSync(pointsFile));
}

function savePoints(pointsData) {
    fs.writeFileSync(pointsFile, JSON.stringify(pointsData, null, 2));
}

// Création du bot Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = process.env.BOT_TOKEN;
client.login(TOKEN).catch(console.error);

client.once("ready", () => {
    console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
});

// Gestion des commandes Discord
client.on("messageCreate", async (message) => {
    if (message.content.startsWith("!link")) {
        // Le lien ne contient plus d'adId, il suffit du userId
        const userId = message.author.id;
        const link = `http://node2.adky.net:25030/watch-ad?user=${userId}`;
        message.reply(`Voici ton lien unique : ${link}`);
    } 
    else if (message.content.startsWith("!points")) {
        const userId = message.author.id;
        const pointsData = loadPoints();
        const points = pointsData[userId] || 0;
        message.reply(`Tu as ${points} points.`);
    }
});

// Route d'accueil
app.get("/", (req, res) => {
    res.send("Bienvenue sur le site des publicités ! Utilise /ads pour voir les publicités disponibles.");
});

app.get("/ads", (req, res) => {
    const ads = loadAds();
    res.json(ads);
});


app.get("/watch-ad", (req, res) => {
    const userId = req.query.user;
    if (!userId) return res.send("Paramètres manquants");

    const ads = loadAds();
    const randomAd = ads[Math.floor(Math.random() * ads.length)];
    if (!randomAd) return res.send("Aucune publicité disponible");

    // Si randomAd.source commence par "http", on l'utilise directement, sinon on ajoute le domaine
    const videoUrl = randomAd.source.startsWith('http')
        ? randomAd.source
        : `http://node2.adky.net:25030/${randomAd.source}`;

    res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Publicité - Votre récompense</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            body {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: #fff;
                font-family: 'Arial', sans-serif;
            }
            .video-container {
                max-width: 800px;
                margin: 50px auto;
                background: rgba(0, 0, 0, 0.7);
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            }
            .video-container h1 {
                text-align: center;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="video-container">
            <h1>Regardez votre publicité et gagnez des points</h1>
            <video id="ad-video" class="w-100" controls>
                <source src="${videoUrl}" type="video/mp4">
                Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
        </div>
        <script>
            const video = document.getElementById("ad-video");
            const userId = "${userId}";
            const adId = ${randomAd.id};
            let lastTime = 0;
            
            // Mettre à jour le temps écoulé pendant la lecture normale
            video.addEventListener("timeupdate", () => {
                if (!video.seeking) {
                    lastTime = video.currentTime;
                }
            });
            
            // Désactiver le saut en avant
            video.addEventListener("seeking", () => {
                if (video.currentTime > lastTime) {
                    video.currentTime = lastTime;
                }
            });
            
            // Détection automatique de la fin de la vidéo
            video.addEventListener("ended", () => {
                fetch(\`http://node2.adky.net:25030/add-points?user=\${userId}&adId=\${adId}\`)
                    .then(response => response.text())
                    .then(data => alert("Vidéo terminée : " + data));
            });
        </script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    `);
});


app.get("/add-points", (req, res) => {
    const userId = req.query.user;
    const adId = req.query.adId;

    if (!userId || !adId) return res.send("Paramètres manquants");

    const ads = loadAds();
    const ad = ads.find(a => a.id == adId);
    if (!ad) return res.send("Publicité non trouvée");

    const pointsData = loadPoints();
    pointsData[userId] = (pointsData[userId] || 0) + ad.points;
    savePoints(pointsData);

    res.send(`Points ajoutés ! Tu as maintenant ${pointsData[userId]} points.`);
});

app.use("/videos", express.static("public/videos"));

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur en ligne sur http://node2.adky.net:${PORT}`);
});
