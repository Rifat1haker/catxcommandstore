const axios = require("axios");
const yts = require("yt-search");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "yt",
    aliases: ["yta", "ytb"],
    version: "3.0",
    author: "Mueid Mursalin Rifat 😺",
    countDown: 5,
    role: 0,
    shortDescription: "🎵 YouTube downloader",
    longDescription: "Search and download YouTube audio (-a) or video (-v) with quality selection.",
    category: "media",
    guide: {
      en: "{pn} <query/link> -a (audio)\n{pn} <query/link> -v (video) [quality]\n\nQuality options: 144, 360, 480, 720, 1080 (default: 480p)\n\nReply with 1-5 to download.\n\nExamples:\n{prefix}yt song name -a\n{prefix}yt https://youtube.com/watch?v=... -v 720\n{prefix}yt song name -v 1080"
    }
  },

  onStart: async function ({ message, event, args, api }) {
    const raw = args.join(" ");
    if (!raw) return message.reply("❗ Use: yt <query/link> -a or -v [quality]");

    const isAudio = raw.includes("-a");
    const isVideo = raw.includes("-v");

    if (!isAudio && !isVideo)
      return message.reply("❗ Please use `-a` for audio or `-v` for video.");

    // Extract quality from command (only for video)
    let quality = "480"; // Default quality
    if (isVideo) {
      const qualityMatch = raw.match(/\b(144|360|480|720|1080)\b/);
      if (qualityMatch) {
        quality = qualityMatch[1];
      }
    }

    const mode = isAudio ? "ytmp3" : "ytmp4";
    // Remove all flags and quality numbers
    const query = raw.replace(/-a|-v|\b(144|360|480|720|1080)\b/g, "").trim();

    if (!query) return message.reply("❗ Please provide a search query or YouTube URL.");

    // Handle direct URL download
    if (/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/.test(query)) {
      const wait = await message.reply(`⏳ Downloading ${isAudio ? "audio" : `video (${quality}p)`}, please wait...`);
      await handleDownload(query, mode, message, wait.messageID, isVideo ? quality : null);
      return;
    }

    try {
      const res = await yts(query);
      const videos = res.videos.slice(0, 5);
      if (videos.length === 0) return message.reply("❌ No results found.");

      let body = `🎬 Results for: "${query}"\nReply with 1-5 to download ${isAudio ? "MP3" : `MP4 (${quality}p)`}\n\n`;
      for (let i = 0; i < videos.length; i++) {
        body += `${i + 1}. ${videos[i].title} (${videos[i].timestamp})\nBy: ${videos[i].author.name}\n\n`;
      }

      const attachments = [];
      for (let i = 0; i < videos.length; i++) {
        const img = await axios.get(videos[i].thumbnail, { responseType: "stream" });
        const tempPath = path.join(__dirname, "cache", `yt-thumb-${i}-${Date.now()}.jpg`);
        const writer = fs.createWriteStream(tempPath);
        img.data.pipe(writer);
        await new Promise(res => writer.on("finish", res));
        attachments.push(fs.createReadStream(tempPath));
      }

      api.sendMessage({
        body: body + `🔰 Api: ALI KOJA | Dev: Mueid Mursalin Rifat 😺`,
        attachment: attachments
      }, event.threadID, (err, info) => {
        if (err) {
          console.error("Send message error:", err);
          attachments.forEach(file => {
            try { fs.unlinkSync(file.path); } catch (e) {}
          });
          return;
        }

        attachments.forEach(file => {
          try { fs.unlinkSync(file.path); } catch (e) {}
        });

        const sentMsgID = info.messageID || info.messageID || info?.messageID || info?.message_id;
        console.log("Sent message ID:", sentMsgID);

        setTimeout(() => {
          try {
            console.log("Trying to unsend message:", sentMsgID);
            api.unsendMessage(sentMsgID);
          } catch (e) {
            console.error("Failed to unsend message:", e);
          }
        }, 20000);

        global.GoatBot.onReply.set(sentMsgID, {
          commandName: "yt",
          messageID: sentMsgID,
          author: event.senderID,
          type: "yt-reply",
          data: videos,
          mode,
          quality: isVideo ? quality : null
        });
      });

    } catch (e) {
      console.error("Search error:", e);
      message.reply("⚠️ Failed to search YouTube.");
    }
  },

  onReply: async function ({ event, message, Reply, api }) {
    const { type, author, data, mode, quality, messageID } = Reply;
    if (event.senderID !== author) return;

    const index = parseInt(event.body);
    if (isNaN(index) || index < 1 || index > data.length)
      return message.reply("❗ Reply with a number from 1–5.");

    const selected = data[index - 1];

    try {
      api.unsendMessage(messageID);
    } catch (e) {}

    const wait = await message.reply(`⏳ Downloading ${mode === "ytmp3" ? "audio" : `video (${quality}p)`}, please wait...`);
    await handleDownload(selected.url, mode, message, wait.messageID, quality);
  }
};

// 📥 Download Handler with Quality Support
async function handleDownload(url, type, message, waitMsgID, quality = null) {
  try {
    let apiURL;
    
    if (type === "ytmp4" && quality) {
      // For video with specific quality
      apiURL = `https://koja-api.web-server.xyz/${type}?url=${encodeURIComponent(url)}&quality=${quality}`;
    } else {
      // For audio or default video
      apiURL = `https://koja-api.web-server.xyz/${type}?url=${encodeURIComponent(url)}`;
    }

    console.log("Requesting API:", apiURL);
    const { data } = await axios.get(apiURL);
    
    // Check if requested quality is available
    if (type === "ytmp4" && quality && data.download?.availableQuality) {
      const availableQualities = data.download.availableQuality;
      const requestedQuality = parseInt(quality);
      
      if (!availableQualities.includes(requestedQuality)) {
        // Find the closest lower quality
        const lowerQualities = availableQualities.filter(q => q <= requestedQuality);
        const bestQuality = lowerQualities.length > 0 ? 
          Math.max(...lowerQualities) : Math.min(...availableQualities);
        
        // Retry with best available quality
        apiURL = `https://koja-api.web-server.xyz/${type}?url=${encodeURIComponent(url)}&quality=${bestQuality}`;
        const { data: newData } = await axios.get(apiURL);
        return await processDownload(newData, type, message, waitMsgID, bestQuality.toString());
      }
    }

    await processDownload(data, type, message, waitMsgID, quality);

  } catch (err) {
    console.error("Download failed:", err);
    message.reply("⚠️ Error downloading file.");
  }
}

// 📦 Process Download
async function processDownload(apiData, type, message, waitMsgID, quality) {
  try {
    const dlURL = apiData.download?.url;
    
    if (!apiData.success || !dlURL) {
      return message.reply("❌ Failed to fetch file from API.");
    }

    const ext = type === "ytmp3" ? "mp3" : "mp4";
    const fileName = `${Date.now()}.${ext}`;
    const filePath = path.join(__dirname, "cache", fileName);

    console.log("Downloading from:", dlURL);
    const res = await axios.get(dlURL, { 
      responseType: "stream",
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const writer = fs.createWriteStream(filePath);
    res.data.pipe(writer);
    
    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    try {
      await message.unsend(waitMsgID);
    } catch (e) {}

    const fileSize = (fs.statSync(filePath).size / (1024 * 1024)).toFixed(2);
    
    let body = 
      `🎵 ${apiData.metadata.title}\n` +
      `📺 Channel: ${apiData.metadata.author.name}\n` +
      `⏱ Duration: ${apiData.metadata.duration.timestamp}\n`;
    
    if (type === "ytmp4") {
      body += `📥 Quality: ${quality}p\n`;
    }
    
    body += `📦 Size: ${fileSize}MB\n\n` +
      `🔰 Api: ALI KOJA | Made by Mueid Mursalin Rifat 😺`;

    await message.reply({
      body: body,
      attachment: fs.createReadStream(filePath)
    });

    fs.unlinkSync(filePath);

  } catch (err) {
    console.error("Process download error:", err);
    message.reply("⚠️ Error processing download.");
  }
		}
