const packageJson = require("../package.json");
const { expect } = require("chai");
const build = require("../internal/build");

describe("build", () => {
  const tokenPairsList = build();

  it("doesn't throw", () => {
    let error;
    try {
      build();
    } catch (e) {
      error = e;
    }
    expect(error).to.be.undefined;
  });

  it("version matches package.json", () => {
    expect(packageJson.version).to.match(/^\d+\.\d+\.\d+$/);
    expect(packageJson.version).to.equal(
      `${tokenPairsList.version.major}.${tokenPairsList.version.minor}.${tokenPairsList.version.patch}`
    );
  });
});
