export default (client, message) => {
  let queue = [];
  let channel = message.channel;

  if(queue.length === 0){
    queue[0] = message.author.username;
    channel.send(`@${queue[0]}님이 상대를 구합니다! !queue로 상대가 되어주세요.`);
    console.log(queue);
  }

  else if(queue.length === 1 && (queue[0] != message.author.username)){
    queue[1] = message.author.username;
    channel.send(`@${queue[0]} vs. @${queue[1]}을 진행해주세요.`) // 시작 전 mmr 보여주기 + 결과 기록 방법 설명이 필요함.
    console.log(queue);
  }

  
}