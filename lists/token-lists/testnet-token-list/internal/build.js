const { version } = require("../package.json");
const { sortTokens } = require("builder");

module.exports = function () {
  const parsed = version.split(".");
  return {
    name: "SushiSwap Testnet",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI:
      "https://raw.githubusercontent.com/sushiswap/art/master/sushi/logo-256x256.png",
    keywords: ["sushiswap", "default"],
    tokens: sortTokens([
      ...require("../tokens/kovan.json"),
      ...require("../tokens/rinkeby.json"),
      ...require("../tokens/ropsten.json"),
    ]),
  };
};
