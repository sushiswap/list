# SushiSwap Logo

## Requirements

- Logo extension should be jpg
- It should be 128x128 exactly, no larger, no smaller
- It should be named by the checksummed address of the token

## Checksummed address

Using weth as an example, the checksummed token address is 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2, often when looking these address up they may or may not already be checksummed. It's important that they're verified. You can do this with a tool like https://ethsum.netlify.app/

If you were to put a non-checksummed for wrapped ether 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2 into the checksum tool it will turn into the checksummed 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2.

## Adding a token logo

1. If adding a token logo for a network which does not yet exist, add a new folder named afer the network in the network folder of this repository. e.g. ethereum

2. Using wrapped ether as an example, you would add this to the etheruem folder, and it should be named by the token address, and extension should be jpg. e.g. 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2.jpg

## Invalidate cache of a single token

node . invalidate:token xdai 0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb

## Invalidate cache of all tokens on one network by network name

node . invalidate:network arbitrum

## Invalidate cache of all tokens for one network by chainId

node . invalidate:network 250

## Invalidate cache of all tokens of all networks

node . invalidate:all

## Clone token to network

node . clone gno xdai 0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb