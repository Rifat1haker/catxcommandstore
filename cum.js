
module.exports = {
  config: {
    name: "cum",
    version: "1.0",
    author: "Mueid Mursalin Rifat",
    countDown: 10,
    role: 1,
    shortDescription: {
      vi: "",
      en: "Show random cum images"
    },
    longDescription: {
      vi: "",
      en: "Show  cum images"
    },
    category: "18+",
    guide: {
      vi: "/cum",
      en: "/cum - Show cum images"
    }
  },

  langs: {
    vi: {
      noImages: "",
      imagesSent: ""
    },
    en: {
      noImages: "No images to display.",
      imagesSent: "Images sent!"
    }
  },

  onStart: async function ({ api, event, getLang }) {
    const images = [
  {
    "link": "https://konachan.com/sample/9d5617434aa4e45a665ab4d41f37e186/Konachan.com%20-%20354936%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/b78418b9ffbf1e587dc4b31ebc3811bc/Konachan.com%20-%20354942%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/f961dfa9e4c14e8aaf0823f7ee3183af/Konachan.com%20-%20354762%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/0357b616dfa30eca67c7372d0cc7b422/Konachan.com%20-%20354594%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/a8b81d166dfeae30b32871769797c9d6/Konachan.com%20-%20354490%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/9f07c42cb80a3f9fed96dadca029cc67/Konachan.com%20-%20352005%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/dfc7a6e107c9422d4b9b83fb0da75afd/Konachan.com%20-%20353449%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/6eaf6b79fe9e96d8e46e92c4eea082fc/Konachan.com%20-%20353713%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/64ea3b1a4ba51e97cef4b09f1666fd83/Konachan.com%20-%20353772%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/76110d6791bdf8c0e211d87876e97c5c/Konachan.com%20-%20354644%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/6d60572ed7965f2b5cd95095a8b10426/Konachan.com%20-%20354543%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/ddcdd77bc41ab5ce2b60ee11f6fedbbb/Konachan.com%20-%20352483%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/ee58200833e1b1f943b56d06ffaf64c2/Konachan.com%20-%20352404%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/8346d8c8bd26e62d184cf2a1cd7eba88/Konachan.com%20-%20352403%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/5f1063564d20f6a68435169fbb8afb0a/Konachan.com%20-%20353307%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/5046430e985b95905cec86318d684307/Konachan.com%20-%20351890%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/70d969c38c6e40457ab822d70b9fe954/Konachan.com%20-%20351438%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/55370f0523b804cb7832ed310eb1cc55/Konachan.com%20-%20351278%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/0382a52d146b89d146ebb66ebdd67a5d/Konachan.com%20-%20351140%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/1e47106db4635b6fd26515f3242cf222/Konachan.com%20-%20351171%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/d55bae6f3f648efada4bb1cc9b4244cb/Konachan.com%20-%20352147%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/c02237b973204dd108740630fab86104/Konachan.com%20-%20352115%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/0a3932e72303d12f3e57f3c3409f8768/Konachan.com%20-%20351955%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/50599395c66d2246e54782c63b965a93/Konachan.com%20-%20351843%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/cc28b94df53b9ac4b96e6e5fccc9112b/Konachan.com%20-%20352394%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/d89b70deb18e43ff36fe987d156971dd/Konachan.com%20-%20352402%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/05ef384dcc56ca4d70e2825ed5bf956b/Konachan.com%20-%20352173%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/2d05ccc022ba1caf1d64c588a8fad4e1/Konachan.com%20-%20352082%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/5bdb9a79ac6ad11a7fe9aed6afc32df8/Konachan.com%20-%20351035%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/0cb3db68fca05179aa0427b7a2e8e15a/Konachan.com%20-%20350761%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/0c24ee15cc9a0b954e78f908f96ccd8f/Konachan.com%20-%20350634%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/3287dfebe380ff141e9973b8b6f05df3/Konachan.com%20-%20350576%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/2502ca4541784378687f24ea5906a5a5/Konachan.com%20-%20350354%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/68b4b60ee9b8bc7d40264660848ecc30/Konachan.com%20-%20348384%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/dceb77a9f4bcc980e5e21125a98f9426/Konachan.com%20-%20347996%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/fef03a83af66d91c5fe0ff73bbbb2ad4/Konachan.com%20-%20348135%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/51929ebc66f36a8b6ee8a68518c546bd/Konachan.com%20-%20347994%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/1065b9ea1de1f40b30e240c37e332a6d/Konachan.com%20-%20347659%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/e6d53d1211a2bce4129ca6fed75c759e/Konachan.com%20-%20349034%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/235d4829f7bbbb3a44bde0f1a8c21d1d/Konachan.com%20-%20348636%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/aae9016670f754fd791a69634a6e1679/Konachan.com%20-%20348563%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/c8d4c16089f1a41b9196f6dc34502caa/Konachan.com%20-%20348452%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/8c03248f5ff233b88801723313026d9e/Konachan.com%20-%20348472%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/444e20095b220ac86fd51eb99fc34dde/Konachan.com%20-%20349028%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/8192afcc673b6f11347f71d84fb38a04/Konachan.com%20-%20349109%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/d70bed1ea62b927504704c931b451630/Konachan.com%20-%20349249%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/3bc893ddcef86451a9de23b764b15ed7/Konachan.com%20-%20349114%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/10506affb0ee58696e8a7a1f684f607f/Konachan.com%20-%20349041%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/3a350119f5fdddec500a23f28ec2efe2/Konachan.com%20-%20349504%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/00de84e21e210c227bbdcccf1e8715c8/Konachan.com%20-%20349336%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/4f2c7569d9ad58b87e944c5ed7a74dbc/Konachan.com%20-%20349310%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/cbde4751792cc71e6f7632f0f78d77d1/Konachan.com%20-%20349259%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/8922d284ec62e3876b37b68e4220cb7b/Konachan.com%20-%20349307%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/bc3fe9b09a98ea100c230734ecb83639/Konachan.com%20-%20349396%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/e20607aa6f2c0a3ac622e987dcd17c2d/Konachan.com%20-%20349465%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/907c18be11a3060b64da50cb0d8613ca/Konachan.com%20-%20349517%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/aa86b852e0f1d3ff2949340cb08eae3e/Konachan.com%20-%20349541%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/55eb286b2d17a6a63d76d1187c3a8a55/Konachan.com%20-%20349525%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/73cf7a5f358bb7809aa560585af3fbaf/Konachan.com%20-%20349598%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/27a336e8580c638cf5d2be5792982aad/Konachan.com%20-%20349680%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/9db8ea5625c75accb87185d4594e10a4/Konachan.com%20-%20349903%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/03a2702a0a30e7c238b04116ee877085/Konachan.com%20-%20349977%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/9a3d02aeff667686264a075fccb93b04/Konachan.com%20-%20349950%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/00755fbd19d72665daf01b35b9c49442/Konachan.com%20-%20350285%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/807a9e2f06d1b5494bd16c077dbdc145/Konachan.com%20-%20350235%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/538d16600d058bab764d1184120ef167/Konachan.com%20-%20350050%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/370fda2730bcc340fc037b5293811888/Konachan.com%20-%20350043%20sample.jpg"
  },
  {
    "link": "https://konachan.com/sample/9a3d02aeff667686264a075fccb93b04/Konachan.com%20-%20349950%20sample.jpg"
  }
];


    // Send the images
    if (images.length > 0) {
      let message = images.map(img => img.link).join("\n");
      api.sendMessage(message, event.threadID, () => {
        api.sendMessage(getLang("imagesSent"), event.threadID);
      });
    } else {
      api.sendMessage(getLang("noImages"), event.threadID);
    }
  }
};


