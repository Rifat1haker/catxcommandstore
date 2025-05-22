class Command {
    constructor(config) {
        this.config = config;
    }

    async onStart({ event, args, api }) {
        const { messageReply } = event;

        // Must be a reply with new text
        if (!messageReply || !args[0]) return;

        // Only edit bot's own messages
        if (messageReply.senderID != api.getCurrentUserID()) return;

        const newText = args.join(" ");

        try {
            await api.editMessage(newText, messageReply.messageID);
        } catch (err) {
            console.error('Failed to edit message:', err);
        }
    }
}

module.exports = new Command({
    name: 'edit',
    aliases: ['ed'],
    version: '1.0.1',
    role: 0,
    author: 'Mueid Mursalin Rifat',
    shortDescription: 'Edit your own message silently',
    longDescription: 'Reply to a message sent by the bot and provide new content to update it.',
    category: 'utility',
    guide: '{pn} <new message>',
    countDown: 3
});
