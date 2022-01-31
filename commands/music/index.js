const { Client, LimitedCollection } = require('discord.js');
const { Cheshire } = require('cheshire');
const { Collection } = require('@discordjs/collection');
const { token } = require('./config.json');
const MusicLogger = require('./modules/MusicLogger.js');
const MusicHandler = require('./modules/MusicHandler.js');
const Queue = require('./modules/Queue.js');
const InteractionHandler = require('./modules/InteractionHandler.js');
const EventHandler = require('./modules/EventHandler.js');

class Music extends Client {
    constructor(options) {
        // create cache
        options.makeCache = manager => {
            switch(manager.name) {
                // Disable Cache
                case 'GuildEmojiManager': 
                case 'GuildBanManager': 
                case 'GuildInviteManager':
                case 'GuildStickerManager':
                case 'StageInstanceManager':
                case 'PresenceManager':
                case 'ThreadManager': return new LimitedCollection({ maxSize: 0 });
                // TLRU cache, Lifetime 30 minutes
                case 'MessageManager': return new Cheshire({ lifetime: 1e+6, lru: false });
                // Default cache
                default: return new Collection();
            }
        };
        // pass options
        super(options);
        this.color = 0x7E686C;
        this.quitting = false;
        this.location = process.cwd();
        
        this.logger = new MusicLogger();
        this.shoukaku = new MusicHandler(this);
        this.queue = new Queue(this);
        
        this.interactions = new InteractionHandler(this).build();
        this.events = new EventHandler(this).build();
        
        ['beforeExit', 'SIGUSR1', 'SIGUSR2', 'SIGINT', 'SIGTERM'].map(event => process.once(event, this.exit.bind(this)));
    }
        
    async login() {
        await super.login(token);
        return this.constructor.name;
    }

    exit() {
        if (this.quitting) return;
        this.quitting = true;
        this.destroy();
    }
}

module.exports = Music;
