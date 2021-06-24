import memory from '../memory/memory.js';
import elo from '../elo/elo.js';

export default {
  getPlayerList() {
    return Object.keys(memory.getDictionary());
  },
  getPlayer(name) {
    let player = memory.get(name, null);
    if (!player) {
      player = {
        mmr: 1200,
        play: 0,
        w: 0,
        d: 0,
        l: 0,
      };
      memory.set(name, player);
    }
    return player;
  },
  getExpectedWinRate(myName, enemyName) {
    const me = this.getPlayer(myName);
    const enemy = this.getPlayer(enemyName);
    return Number(elo.getExpectedWinRate(me.mmr, enemy.mmr).toFixed(4));
  },
};
