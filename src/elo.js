const weight = 20;

export default {
  getExpectedWinRate(myMMR, enemyMMR) {
    return 1 / ((10 ** ((enemyMMR - myMMR) / 400)) + 1);
  },
  getLastMMR(myMMR, enemyMMR, result, isPlacementTest = false) {
    // Result is available: 'W', 'D', 'L'
    let WR = 0.5; if (result === 'W') WR = 1; else if (result === 'L') WR = 0;
    return myMMR
      + ((isPlacementTest ? weight * 2 : weight) * (WR - this.getExpectedWinRate(myMMR, enemyMMR)));
  },
};
