const packageJson = require("../package.json");
const schema = require("@uniswap/token-lists/src/tokenlist.schema.json");
const { expect } = require("chai");
const { getAddress } = require("@ethersproject/address");
const Ajv = require("ajv");
const buildList = require("../internal/build");

const ajv = new Ajv({ allErrors: true, format: "full" });
const validator = ajv.compile(schema);

describe("build", () => {
  const defaultTokenList = buildList();

  it("validates", () => {
    if (defaultTokenList.tokens.length) {
      const result = validator(defaultTokenList);
      console.log(validator.errors);
      expect(result).to.equal(true);
    }
  });

  it("contains no duplicate addresses", () => {
    const map = {};
    for (let token of defaultTokenList.tokens) {
      const key = `${token.chainId}-${token.address}`;
      if (map[key]) {
        console.log("duplicate address for key:", key);
      }
      expect(typeof map[key]).to.equal("undefined");

      map[key] = true;
    }
  });

  it("contains no duplicate chainId-address-symbol", () => {
    const map = {};
    for (let token of defaultTokenList.tokens) {
      const key = `${
        token.chainId
      }-${token.address.toLowerCase()}-${token.symbol.toLowerCase()}`;
      if (map[key]) {
        console.log("duplicate symbol for key:", key);
      }
      expect(typeof map[key]).to.equal("undefined");
      map[key] = true;
    }
  });

  it("contains no duplicate chainId-address-name", () => {
    const map = {};
    for (let token of defaultTokenList.tokens) {
      const key = `${
        token.chainId
      }-${token.address.toLowerCase()}-${token.name.toLowerCase()}`;
      if (map[key]) {
        console.log("duplicate name for key:", key);
      }
      expect(typeof map[key]).to.equal("undefined");
      map[key] = true;
    }
  });

  it("all addresses are valid and checksummed", () => {
    for (let token of defaultTokenList.tokens) {
      expect(getAddress(token.address)).to.eq(token.address);
    }
  });

  it("version matches package.json", () => {
    expect(packageJson.version).to.match(/^\d+\.\d+\.\d+$/);
    expect(packageJson.version).to.equal(
      `${defaultTokenList.version.major}.${defaultTokenList.version.minor}.${defaultTokenList.version.patch}`
    );
  });
});
