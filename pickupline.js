const axios = require("axios");

module.exports = {
  config: {
    name: "pickupline",
    aliases: ["pline"],
    version: "1.0",
    author: "Mueid Mursalin Rifat",
    countDown: 5,
    role: 0,
    shortDescription: "pickuplines",
    longDescription: {
      en: "random pickuplines.",
    },
    category: "fun",
    guide: {
      en: "{prefix}pickuplines",
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get("https://api.popcat.xyz/pickuplines");
      const { pickupline } = response.data;
      const message = `💘 ${pickupline}`;
      return api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
    }
  },
};
