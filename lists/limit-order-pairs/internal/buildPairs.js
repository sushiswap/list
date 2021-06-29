const { version } = require("../package.json");

const { ChainId } = require("@sushiswap/sdk");

const fs = require("fs");

const { resolve } = require("path");

const list = require("../../default/build/sushiswap-default.tokenlist.json");

const SUPPORTED_CHAINS = {
  [ChainId.MATIC]: "matic"
};

function getPairs() {

  const allPairs = {};

  for (const [chainId, chainName] of Object.entries(SUPPORTED_CHAINS)) {

    const path = resolve(__dirname, `../pairs/${chainName}.json`);

    if (!fs.existsSync(path)) {
      throw new Error(`Couldn't find .json file for ${chainName}`);
    };

    const tokens = list.tokens.filter(token => token.chainId === +chainId);

    const pairs = require(path);

    allPairs[chainId] = pairs.map(pair => pair.map(tokenSymbol => {

      const token = tokens.find(token => token.symbol === tokenSymbol);

      if (!token) throw new Error(`Couldn't find token info for ${tokenSymbol}`);

      return token;

    }));

    return allPairs;

  }

}

module.exports = function buildPairs() {
  const parsed = version.split(".");
  return {
    name: "SushiSwap Pair Menu",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI:
      "https://raw.githubusercontent.com/sushiswap/art/master/sushi/logo-256x256.png",
    keywords: ["sushiswap", "limit-order", "pairs"],
    pairs: getPairs()
  };
}
