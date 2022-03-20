const fs = require("fs");
const { getAddress } = require("@ethersproject/address");
const sizeOf = require("image-size");

const NETWORK_PATH = "./network";

test("filename is checksummed address and extension is jpg", () => {
  fs.readdir(NETWORK_PATH, (error, networks) => {
    if (error) {
      throw error;
    }
    for (const network of networks) {
      fs.readdir(NETWORK_PATH + "/" + network, (error, files) => {
        if (error) {
          throw error;
        }
        for (const file of files) {
          const [filename, extention] = file.split(".");
          const { width, height } = sizeOf(
            NETWORK_PATH + "/" + network + "/" + file
          );

          try {
            expect(filename).toBe(getAddress(filename));
          } catch {
            throw Error(`${filename} should be checksummed`);
          }

          try {
            expect(extention).toBe("jpg");
          } catch {
            throw Error(`${filename} should have a jpg extension`);
          }

          try {
            expect(width).toBe(128);
          } catch {
            throw Error(`${filename} should have a width of 128`);
          }

          try {
            expect(height).toBe(128);
          } catch {
            throw Error(`${filename} should have a height of 128`);
          }
        }
      });
    }
  });
});
