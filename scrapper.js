const cheerio = require("cheerio");
const fs = require("fs");

function scrapWords($) {
  const items = $(".wlv-item");
  return items.toArray().map((domEl) => {
    const item = cheerio.load(domEl);
    const wordSwedish = item(
      ".wlv-item__word-box .wlv-item__word-container .wlv-item__word-line .wlv-item__word"
    ).text();
    const wordEnglish = item(
      ".wlv-item__word-box .wlv-item__english-container .wlv-item__english"
    ).text();
    const sentenceSwedish = item(
      ".wlv-item__samples-box .wlv-item__word-container .wlv-item__word"
    ).text();
    const sentenceEnglish = item(
      ".wlv-item__samples-box .wlv-item__english-container .wlv-item__english"
    ).text();
    const wordSound = item(
      ".wlv-item__word-box .wlv-item__word-container audio"
    ).attr("src");
    const sentenceSound = item(
      ".wlv-item__samples .wlv-item__word-container audio"
    ).attr("src");
    const image = item(".wlv-item__image-box img").attr("src");

    return {
      wordSwedish,
      wordEnglish,
      sentenceSwedish,
      sentenceEnglish,
      wordSound,
      sentenceSound,
      image,
      learnedTimes: 0,
    };
  });
}

// const data = {
//     verbs: [{
//         wordSwedish: "123",
//         wordEnglish: "123",
//         sentenceSwedish: "123 haha",
//         sentenceEnglish: "123 oi",
//         wordSound: "src",
//         sentenceSound: "src",
//         image: "src"
//     }]
// }

const data = {
  verbs: scrapWords(
    cheerio.load(fs.readFileSync("./scrapMaterial/verbs.html"))
  ),
  adjectives: scrapWords(
    cheerio.load(fs.readFileSync("./scrapMaterial/adjectives.html"))
  ),
  adverbs: scrapWords(
    cheerio.load(fs.readFileSync("./scrapMaterial/adverbs.html"))
  ),
  nouns: scrapWords(
    cheerio.load(fs.readFileSync("./scrapMaterial/nouns.html"))
  ),
  core: scrapWords(cheerio.load(fs.readFileSync("./scrapMaterial/core.html"))),
};

fs.writeFileSync("./src/scrappedData.json", JSON.stringify(data, null, 2));
console.log("done");
