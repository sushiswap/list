const { version } = require("../package.json");
const { sortTokens } = require("builder");
const ethereum = require("../tokens/ethereum.json");
const ropsten = require("../tokens/ropsten.json");
const rinkeby = require("../tokens/rinkeby.json");
const goerli = require("../tokens/goerli.json");
const kovan = require("../tokens/kovan.json");
const fantom = require("../tokens/fantom.json");
const fantomTestnet = require("../tokens/fantom-testnet.json");
const polygon = require("../tokens/polygon.json");
const polygonTestnet = require("../tokens/polygon-testnet.json");
const xdai = require("../tokens/xdai.json");
const bsc = require("../tokens/bsc.json");
const bscTestnet = require("../tokens/bsc-testnet.json");
const moonbase = require("../tokens/moonbase.json");
const avalanche = require("../tokens/avalanche.json");
const fuji = require("../tokens/fuji.json");
const heco = require("../tokens/heco.json");
const hecoTestnet = require("../tokens/heco-testnet.json");
const harmony = require("../tokens/harmony.json");
const harmonyTestnet = require("../tokens/harmony-testnet.json");
const okex = require("../tokens/okex.json");
const okexTestnet = require("../tokens/okex-testnet.json");
const arbitrum = require("../tokens/arbitrum.json");
const celo = require("../tokens/celo.json");
const palm = require("../tokens/palm.json");
const moonriver = require("../tokens/moonriver.json");
const fuse = require("../tokens/fuse.json");
const telos = require("../tokens/telos.json");
const moonbeam = require("../tokens/moonbeam.json");
const optimism = require("../tokens/optimism.json");
module.exports = function buildList() {
  const parsed = version.split(".");
  return {
    name: "SushiSwap Menu",
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
      ...ethereum,
      ...ropsten,
      ...goerli,
      ...kovan,
      ...rinkeby,
      ...fantom,
      ...fantomTestnet,
      ...polygon,
      ...polygonTestnet,
      ...xdai,
      ...bsc,
      ...bscTestnet,
      ...moonbase,
      ...avalanche,
      ...fuji,
      ...heco,
      ...hecoTestnet,
      ...harmony,
      ...harmonyTestnet,
      ...okex,
      ...okexTestnet,
      ...arbitrum,
      ...celo,
      ...palm,
      ...moonriver,
      ...fuse,
      ...telos,
      ...moonbeam,
      ...optimism,
    ]),
  };
};
