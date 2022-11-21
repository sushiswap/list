const { version } = require("../package.json");

const { ChainId } = require("@sushiswap/core-sdk");

const fs = require("fs");

const { resolve } = require("path");

const DEFAULT_TOKEN_LIST = require("@sushiswap/default-token-list");

const SUPPORTED_CHAINS = {
  [ChainId.ETHEREUM]: "ethereum",
  [ChainId.MATIC]: "matic",
  [ChainId.AVALANCHE]: "avalanche",
  [ChainId.FANTOM]: "fantom",
};

function getPairs() {
  const allPairs = {};

  for (const [chainId, chainName] of Object.entries(SUPPORTED_CHAINS)) {
    const path = resolve(__dirname, `../pairs/${chainName}.json`);

    if (!fs.existsSync(path)) {
      throw new Error(`Couldn't find .json file for ${chainName}`);
    }

    const tokens = DEFAULT_TOKEN_LIST.tokens.filter(
      (token) => token.chainId === +chainId
    );

    const pairs = require(path);

    allPairs[chainId] = pairs.map((pair) =>
      pair.map((symbol) => {
        const token = tokens.find((token) => token.symbol === symbol);
        if (!token)
          throw new Error(
            `Couldn't find token info for ${symbol} ${JSON.stringify(tokens)}`
          );

        return token;
      })
    );
  }

  return allPairs;
}

module.exports = function () {
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
    pairs: getPairs(),
  };
};
