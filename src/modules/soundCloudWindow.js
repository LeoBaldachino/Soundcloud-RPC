const path = require('path');
const { app, BrowserWindow } = require('electron');
const { session } = require('electron');

class SoundCloudWindow {
    currentSong = "";
    currentAuthor = "";
    currentLargeImage = "";
    currentSmallImage = "";

    constructor() {
        app.on('ready', () => {
            this.window = new BrowserWindow({
            width: 800,
            height: 600,
            icon: "./images/soundcloud.png",
            webPreferences: {
                nodeIntegration: true,
            },
            title: "SoundCloud",
            });
            this.window.loadURL("https://soundcloud.com");
            this.window.setMenuBarVisibility(false);
            this.window.hide();
            session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
                details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
                callback({ cancel: false, requestHeaders: details.requestHeaders });
            });
            session.defaultSession.loadExtension(path.resolve(__dirname, './adblock')).catch(console.error);
        });
    }
    show() {
        app.on('ready', () => {
            this.window.show();
        });
    }

    refreshSongInfos() {
        this.window.webContents.executeJavaScript(`
            var song = document.querySelector(".playbackSoundBadge__titleLink").title;
            var author = document.querySelector(".playbackSoundBadge__lightLink").title;
            var style = document.querySelector(".sc-artwork").style.backgroundImage;
            var artworkEl = document.querySelector('.playbackSoundBadge__avatar .image__lightOutline span');
            var image = '';
            if (artworkEl) {
                image = artworkEl.style.backgroundImage.replace('url("', '').replace('")', '');
            }
            var infos = {
                song: song,
                author: author,
                image: image
            };
            infos;
        `).then((infos) => {
            if (infos.song != this.currentSong) {
                this.currentSong = infos.song;
                this.currentAuthor = infos.author;
                this.currentLargeImage = infos.image || "soundcloud";
                this.currentSmallImage = infos.image;
            }
        });
    }
}

module.exports = SoundCloudWindow;