// (actualword/totaltimetaken)*60
const typing_ground = document.querySelector("#textarea");
const btn = document.querySelector("#btn");
const score = document.querySelector("#score");
const show_sentence = document.querySelector("#showSentence");
const show_time = document.querySelector('#show-timer');

let startTime, endTime, totalTimeTaken,sentence_to_write,num;
const sentence = ['The quick brown fox jumps over lazy dog 1', 'The quick brown fox jumps over the lazy dog 2', 'The quick brown fox jumps over the lazy dog 3']
let intervalId, elapsedTime = 0;
const showTimer = () => {
    if (btn.innerText === 'Done') {
        intervalId = setInterval(() => {
            elapsedTime++;
            show_time.innerHTML = elapsedTime;
        },1000)
    }
    else if (btn.innerText === 'Start') {
        
        elapsedTime = 0;
        clearInterval(intervalId);
        show_time.innerHTML="";
        
    }
}

const startTyping = () => {
    console.log(btn);
    let randomNumber = Math.floor(Math.random() * sentence.length);
    show_sentence.innerHTML = sentence[randomNumber];
    let date = new Date();
    startTime = date.getTime();
    btn.innerHTML = "Done";
    console.log(btn.innerHTML);
    showTimer();

}
const endTyping = () => {
    btn.innerHTML = "Start";
    showTimer();
    let date = new Date();
    endTime = date.getTime();
    totalTimeTaken = (endTime - startTime) / 1000;
    calculateTypingSpeed(totalTimeTaken);
    show_sentence.innerHTML = "";
    typing_ground.value = "";
   
}
const errorChecking = (words) => {
 num = 0;
     sentence_to_write = show_sentence.innerHTML;
    sentence_to_write = sentence_to_write.trim().split(" ");
    words= words.trim().split(" ");
    console.log(sentence_to_write);
    console.log(words);
    for (let i = 0; i < words.length; i++) { 
        if (words[i] == sentence_to_write[i]) {
            num++;
            console.log(num);
        }

    }
    return num;
}
const calculateTypingSpeed=(Time_Taken) => {
    let totalWords = typing_ground.value;
    let actualWords = totalWords === '' ? 0 : totalWords.split(" ").length;
    
    actualWords = errorChecking(totalWords);
    if (actualWords !== 0) {
        let typing_speed = (actualWords / Time_Taken) * 60;
      
        typing_speed = Math.round(typing_speed);
        score.innerHTML=`Your typing speed is ${typing_speed} words per minute & you wrote ${actualWords} correct words out of ${sentence_to_write.length} & time taken ${Time_Taken}.`

    }
    else {
        score.innerHTML=`Your typing speed is 0 words per minute & Time Taken  ${Time_Taken} sec.`
    }
}
btn.addEventListener("click", () => {
  switch (btn.innerText.toLowerCase()) {
    case "start":
      typing_ground.removeAttribute("disabled");
      startTyping();
      break;
    case "done":
      typing_ground.setAttribute("disabled", true);
      endTyping();
      break;
  }
});
