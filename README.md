> elo.js 테스트 코드
```javascript
import elo from './elo.js';
import memory from './memory.js';

memory.boot();

if (memory.get('A', null) === null) {
  memory.set('A', { mmr: 1200, play: 0 });
  memory.set('B', { mmr: 1200, play: 0 });
  memory.set('C', { mmr: 1200, play: 0 });
}

function battle(A, B, winner) {
  const AObject = memory.get(A, null);
  const BObject = memory.get(B, null);
  let AMMR = 0;
  let BMMR = 0;
  if (winner === A) {
    AMMR = elo.getLastMMR(AObject.mmr, BObject.mmr, 'W', AObject.play < 10);
    BMMR = elo.getLastMMR(BObject.mmr, AObject.mmr, 'L', BObject.play < 10);
  } else if (winner === B) {
    AMMR = elo.getLastMMR(AObject.mmr, BObject.mmr, 'L', AObject.play < 10);
    BMMR = elo.getLastMMR(BObject.mmr, AObject.mmr, 'W', BObject.play < 10);
  } else {
    AMMR = elo.getLastMMR(AObject.mmr, BObject.mmr, 'D', AObject.play < 10);
    BMMR = elo.getLastMMR(BObject.mmr, AObject.mmr, 'D', BObject.play < 10);
  }
  AObject.mmr = AMMR;
  AObject.play += 1;
  BObject.mmr = BMMR;
  BObject.play += 1;
  memory.set(A, AObject);
  memory.set(B, BObject);
}

battle('A', 'B', 'A');
battle('A', 'B', 'B');
battle('C', 'B', 'C');
battle('A', 'C', 'C');
battle('A', 'B', 'A');
battle('C', 'B', 'B');
battle('A', 'B', 'A');
battle('A', 'C', 'C');
battle('A', 'B', 'D');
battle('C', 'B', 'C');
battle('A', 'C', 'A');
battle('A', 'B', 'A');
battle('A', 'C', 'C');
battle('C', 'B', 'B');
battle('A', 'C', 'C');
battle('A', 'B', 'A');
battle('A', 'B', 'D');
battle('C', 'B', 'C');

```
