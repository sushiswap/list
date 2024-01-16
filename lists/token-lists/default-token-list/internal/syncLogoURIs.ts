import "dotenv/config";
import { isAddress } from "@ethersproject/address";
import * as fs from "fs";
import path from "path";
import { TokenList } from "./types";

syncLogoURIs();

async function syncLogoURIs() {
  const dir = path.join(__dirname, "../tokens/");
  const files = await fs.promises.readdir(dir);
  await syncTokenLists(dir, files);
}

async function syncTokenLists(dir: string, files: string[]) {
  for (const file of files) {
    console.log("Syncing file", file);
    await syncTokenList(path.join(dir, file));
  }
}

async function syncTokenList(path: string) {
  let list: TokenList;
  try {
    list = TokenList.parse(JSON.parse(fs.readFileSync(path, "utf-8")));
  } catch (e) {
    console.log("Failed to read", path, e);
    return;
  }

  const tokensWithLogos: string[] = []
  const tokensWithoutLogos: string[] = []
  
  for (let listItem of list) {
    if (!isAddress(listItem.address)) {
      console.error('Token', listItem, 'contains invalid address');
      return
    }

    if (listItem.logoURI !== `https://cdn.sushi.com/image/upload/tokens/${listItem.chainId}/${listItem.address}.jpg`) {
      let cdnFileResponse: Response;
      try {
        cdnFileResponse = await fetch(`https://cdn.sushi.com/image/upload/tokens/${listItem.chainId}/${listItem.address}.jpg`);
      } catch (e) {
        console.log(
            `Error fetching logo ${listItem.chainId}:${listItem.address}`,
            e
        );
        return;
      }

      if (cdnFileResponse.status !== 200) {
        tokensWithoutLogos.push(`${listItem.address}`)
      } else {
        listItem.logoURI = `https://cdn.sushi.com/image/upload/tokens/${listItem.chainId}/${listItem.address}.jpg`
        tokensWithLogos.push(`${listItem.address}`)
      }
    }
  }

  if (tokensWithLogos.length) {
    console.log('logoURIs were updated for:', tokensWithLogos)
    console.log('Writing changes to', path)
    fs.writeFileSync(path, JSON.stringify(list, null, '  '))
  }

  if (tokensWithoutLogos.length) {
    console.log('Cloudinary logos were missing for:', tokensWithoutLogos)
  }
}