function sortTokens(tokens) {
  return tokens.sort((t1, t2) => {
    if (t1.chainId === t2.chainId) {
      return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
    }
    return t1.chainId < t2.chainId ? -1 : 1;
  });
}

module.exports = { sortTokens };
