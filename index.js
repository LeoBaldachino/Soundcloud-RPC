const DiscordPresence = require("./src/modules/discordRPC.js")
const SoundCloudWindow = require("./src/modules/soundCloudWindow.js")

const soundCloudWindow = new SoundCloudWindow();
soundCloudWindow.show();
const presence = new DiscordPresence('1187340825991069706');
presence.changeSong('Idle');
presence.changeAuthor('Idle');
presence.changeLargeImage('soundcloud');
presence.changeSmallImage('waves');
presence.start();

setInterval(() => {
    soundCloudWindow.refreshSongInfos();
    if (soundCloudWindow.currentSong == "") {
        presence.changeSong('Idle');
        presence.changeAuthor('Idle');
        presence.changeLargeImage('soundcloud');
        presence.changeSmallImage('waves');
        presence.refresh();
        return;
    }
    presence.changeSong(soundCloudWindow.currentSong);
    presence.changeAuthor(soundCloudWindow.currentAuthor);
    presence.changeLargeImage(soundCloudWindow.currentLargeImage);
    presence.changeSmallImage('soundcloud');
    presence.refresh();
}, 1000);