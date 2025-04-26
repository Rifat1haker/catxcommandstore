const fs = require("fs-extra");
const { utils } = global;

module.exports = {
  config: {
    name: "prefix",
    version: "1.5",
    author: "Mueid Mursalin Rifat", //dont change author credit 
    countDown: 5,
    role: 0,
    description: "Change the bot's command prefix for your chat or the entire system (bot admin only)",
    category: "config",
    guide: {
      en: "   {pn} <new prefix>: Change prefix for your chat\n"
        + "   Example:\n"
        + "    {pn} #\n\n"
        + "   {pn} <new prefix> -g: Change system-wide prefix (admin only)\n"
        + "   Example:\n"
        + "    {pn} # -g\n\n"
        + "   {pn} reset: Reset your chat prefix to default"
    }
  },

  langs: {
    en: {
      reset: "✅ Your prefix has been reset to default: %1",
      onlyAdmin: "⚠️ Only bot admins can change the system-wide prefix",
      confirmGlobal: "⚠️ Please react to this message to confirm changing the SYSTEM-WIDE prefix for all chats",
      confirmThisThread: "⚠️ Please react to this message to confirm changing prefix for THIS CHAT",
      successGlobal: "✅ Successfully changed SYSTEM-WIDE prefix to: %1",
      successThisThread: "✅ Successfully changed prefix for THIS CHAT to: %1",
      myPrefix: `✨ 𝗠𝗬 𝗖𝗨𝗥𝗥𝗘𝗡𝗧 𝗣𝗥𝗘𝗙𝗜𝗫 ✨

★ 𝙈𝙮 𝙥𝙧𝙚𝙛𝙞𝙭 𝙞𝙨: [ %1 ] (for this chat)
★ 𝙎𝙮𝙨𝙩𝙚𝙢 𝙬𝙞𝙙𝙚 𝙥𝙧𝙚𝙛𝙞𝙭: [ %2 ]

━━━━━━━━━━━━━━━
🛠️ 𝗛𝗘𝗘𝗟𝗣𝗙𝗨𝗟 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦:

▸ 𝗛𝗲𝗹𝗽 𝗠𝗲𝗻𝘂 » [ %2help ] - See all commands
▸ 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗜𝗻𝗳𝗼 » [ %2help <cmd> ] - Command details
▸ 𝗥𝗲𝗽𝗼𝗿𝘁 𝗜𝘀𝘀𝘂𝗲 » [ %2callad <message> ] - Report problems
▸ 𝗖𝗵𝗮𝗻𝗴𝗲 𝗣𝗿𝗲𝗳𝗶𝘅 » [ %2prefix <new> ] - Change prefix

💡 𝗧𝗜𝗣: Replace %2 with your chat's prefix (%1) when using commands!`
    }
  },

  onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
    if (!args[0])
      return message.SyntaxError();

    if (args[0] == 'reset') {
      await threadsData.set(event.threadID, null, "data.prefix");
      return message.reply(getLang("reset", global.GoatBot.config.prefix));
    }

    const newPrefix = args[0];
    const formSet = {
      commandName,
      author: event.senderID,
      newPrefix
    };

    if (args[1] === "-g") {
      if (role < 2)
        return message.reply(getLang("onlyAdmin"));
      else
        formSet.setGlobal = true;
    }
    else {
      formSet.setGlobal = false;
    }

    return message.reply(
      args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisThread"), 
      (err, info) => {
        formSet.messageID = info.messageID;
        global.GoatBot.onReaction.set(info.messageID, formSet);
      }
    );
  },

  onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
    const { author, newPrefix, setGlobal } = Reaction;
    if (event.userID !== author)
      return;
    if (setGlobal) {
      global.GoatBot.config.prefix = newPrefix;
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      return message.reply(getLang("successGlobal", newPrefix));
    }
    else {
      await threadsData.set(event.threadID, newPrefix, "data.prefix");
      return message.reply(getLang("successThisThread", newPrefix));
    }
  },

  onChat: async function ({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "prefix") {
      return message.reply(getLang(
        "myPrefix", 
        utils.getPrefix(event.threadID), 
        global.GoatBot.config.prefix
      ));
    }
  }
};