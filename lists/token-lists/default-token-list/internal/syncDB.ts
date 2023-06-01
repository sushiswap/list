import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { isAddress } from "@ethersproject/address";
import * as fs from "fs";
import path from "path";
import { TokenList, TokenListItem } from "./types";

enum TokenStatus {
  APPROVED = "APPROVED",
  UNKNOWN = "UNKNOWN",
  DISAPPROVED = "DISAPPROVED",
}

syncDB();

async function syncDB() {
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
  const client = new PrismaClient();

  let list: TokenList;
  try {
    list = TokenList.parse(JSON.parse(fs.readFileSync(path, "utf-8")));
  } catch (e) {
    console.log("Failed to read", path, e);
    return;
  }

  for (const listItem of list) {
    await syncListItem(client, listItem).catch((e) =>
      console.log("Error while syncing list item", listItem, e)
    );
  }
}

async function syncListItem(client: PrismaClient, listItem: TokenListItem) {
  if (!isAddress(listItem.address)) {
    throw new Error(`Invalid address: ${listItem.address}`);
  }

  const tokenId = `${listItem.chainId}:${listItem.address.toLowerCase()}`;

  // check if address exists in db
  const token = await client.token.findFirst({
    where: {
      id: tokenId,
    },
  });

  if (!token) {
    // if token does not exist, add it to db
    const newToken = await client.token.create({
      data: {
        id: tokenId,
        chainId: listItem.chainId,
        address: listItem.address,
        name: listItem.name,
        symbol: listItem.symbol,
        decimals: listItem.decimals,
        status: TokenStatus.APPROVED,
      },
    });
    console.log(`Token created:
        ID: ${newToken.id}
        CHAINID: ${newToken.chainId}
        ADDRESS: ${newToken.address}
        NAME: ${newToken.name}
        SYMBOL: ${newToken.symbol}
        DECIMALS: ${newToken.decimals}
        STATUS: ${newToken.status}
        FOT: ${newToken.isFeeOnTransfer}
        COMMON: ${newToken.isCommon}
    `);
  } else if (token.status !== TokenStatus.APPROVED) {
    // if token not approved, grant approval

    const updatedToken = await client.token.update({
      where: {
        id: token.id,
      },
      data: {
        status: TokenStatus.APPROVED,
      },
    });

    console.log(`Token updated, new data:
        ID: ${updatedToken.id}
        CHAINID: ${updatedToken.chainId}
        ADDRESS: ${updatedToken.address}
        NAME: ${updatedToken.name}
        SYMBOL: ${updatedToken.symbol}
        DECIMALS: ${updatedToken.decimals}
        STATUS: ${updatedToken.status}
        FOT: ${updatedToken.isFeeOnTransfer}
        COMMON: ${updatedToken.isCommon}
    `);
  }
}
