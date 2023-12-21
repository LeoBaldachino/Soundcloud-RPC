const DiscordPresence = require("./src/modules/discordRPC.js")

const presence = new DiscordPresence('1187340825991069706');
presence.changeSong('Votre texte ici');
presence.changeAuthor('Votre état ici');
presence.changeLargeImage('nom_de_votre_grande_image');
presence.changeSmallImage('nom_de_votre_petite_image');
presence.start();