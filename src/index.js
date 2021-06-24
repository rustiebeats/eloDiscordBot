import dotenv from 'dotenv';
import Discord from 'discord.js';
import router from './commands/router/router.js';
import memory from './commands/memory/memory.js';
import elo from './commands/elo/elo.js';
import player from './commands/player/player.js';

dotenv.config();
memory.boot();

const prefix = '!';
const client = new Discord.Client();

let queue = [];
let playingFlag = false;

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

client.on('message', (message) => {
  // Discard if not a command
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  // Lexical analysis
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(/\s+/);
  const command = args.shift().toLowerCase();
  const channel = message.channel;
  //router(client, message, command, args);

  if(command == "ping"){
    message.reply("pong!");
  }

  if(command == "queue"){
    if(queue.length === 0){
      queue[0] = message.author.username;
      channel.send(`@${queue[0]}님이 상대를 구합니다! !queue로 상대가 되어주세요.`);
    }

    else if(queue.length === 1 && (queue[0] != message.author.username)){
      queue[1] = message.author.username;
      channel.send(`@${queue[0]} vs. @${queue[1]}을(를) 진행해주세요.`) // 시작 전 mmr 보여주기 + 결과 기록 방법 설명이 필요함.
      playingFlag = true;
    }
    else if(queue.includes(message.author.username)){
      channel.send("그럴 수 없어요.");
    }
    else if(queue.length === 2){
      channel.send("이미 두 명이 경기 중이에요.");
    }
  }

  if(command == "win"){
    if(args.length != 1) return;
    if(!playingFlag) return;
    if(!queue.includes(message.author.username)) return;
    
    let firstPlayer = queue[0];
    let secondPlayer = queue[1];

    if (memory.get(firstPlayer, null) === null) {
      memory.set(firstPlayer, { mmr: 1200, play: 0 });
    }
    if (memory.get(secondPlayer, null) === null) {
      memory.set(secondPlayer, { mmr: 1200, play: 0 });
    }
    if(args[0] == 1){
      battle(firstPlayer, secondPlayer, firstPlayer);
      channel.send(`${firstPlayer} wins!`);
    }
    else if(args[0] == 2){
      battle(firstPlayer, secondPlayer, secondPlayer);
      channel.send(`${secondPlayer} wins!`);
    }
    // 결과창에 mmr 변동까지 보여주는 기능 추가해야 함. 내가 할 예정
    queue = [];
    return;
  }

  if(command == "cancel"){
    if(queue.includes(message.author.username)){
      queue = [];
      channel.send("경기가 취소되었습니다.");
      playingFlag = false;
    }
    else{
      channel.send("경기 중이거나 경기 대기중인 사람만 취소할 수 있어요.");
    }
  }

  if(command == "rating"){
    let rating = memory.get(message.author.username, null);
    channel.send(`${message.author.username}의 점수는 현재 ${rating.mmr.toFixed(1)}점입니다.`)
  }

  if(command == "ranking"){
    //랭킹 구현하기
  }
});

client.login(process.env.BOT_TOKEN);
