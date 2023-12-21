const RPC = require('discord-rpc');

class DiscordPresence {
  constructor(clientId) {
    this.clientId = clientId;
    RPC.register(this.clientId);
    this.client = new RPC.Client({ transport: 'ipc' });
    this.activity = {
      details: '',
      state: '',
      startTimestamp: new Date(),
      largeImageKey: '',
      smallImageKey: '',
      instance: false,
    };
  }

  changeSong(song) {
    this.activity.details = song;
  }

  changeAuthor(author) {
    this.activity.state = author;
  }

  changeLargeImage(imageKey) {
    this.activity.largeImageKey = imageKey;
  }

  changeSmallImage(imageKey) {
    this.activity.smallImageKey = imageKey;
  }

  start() {
    this.client.on('ready', () => {
      this.client.setActivity(this.activity);
      console.log('Up !');
    });

    this.client.login({ clientId: this.clientId }).catch(console.error);
  }

    stop() {
        this.client.destroy();
    }

    refresh() {
        this.client.setActivity(this.activity);
    }
}

module.exports = DiscordPresence;