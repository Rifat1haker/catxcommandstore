"use strict";

const regExCheckURL = /^(http|https):\/\/[^ "]+$/;

module.exports = {
  config: {
    name: "profile",
    aliases: ["pfp", "pp"],
    version: "1.6",
    author: "Mueid Mursalin Rifat",
    countDown: 5,
    role: 0,
    shortDescription: "Get Facebook profile picture",
    longDescription: "Tag | UID | Reply | Profile URL",
    category: "image",
    guide: {
      en: "{pn} @tag | uid | profile_url | reply | none"
    }
  },

  onStart: async function ({ event, message, args }) {
    try {
      const { findUid } = global.utils;
      let uid;

      /* 1️⃣ Reply */
      if (event.messageReply) {
        uid = event.messageReply.senderID;
      }

      /* 2️⃣ Tag */
      else if (Object.keys(event.mentions).length > 0) {
        uid = Object.keys(event.mentions)[0];
      }

      /* 3️⃣ UID directly */
      else if (args[0] && /^\d+$/.test(args[0])) {
        uid = args[0];
      }

      /* 4️⃣ Facebook profile URL (username OR id) */
      else if (args[0] && regExCheckURL.test(args[0])) {
        try {
          uid = await findUid(args[0]); // 🔥 KEY PART
        } catch (e) {
          return message.reply("❌ Failed to resolve UID from profile link");
        }
      }

      /* 5️⃣ Self */
      else {
        uid = event.senderID;
      }

      // 🔥 Graph API avatar (UID always works)
      const avatarURL =
        `https://graph.facebook.com/${uid}/picture` +
        `?height=1500&width=1500&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`;

      return message.reply({
        body: "",
        attachment: await global.utils.getStreamFromURL(avatarURL)
      });

    } catch (err) {
      console.error(err);
      return message.reply("❌ Failed to fetch profile picture");
    }
  }
};
