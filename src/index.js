// JS
import './js/'
import {
  Howl,
  Howler
} from 'howler'

// SCSS
import './assets/scss/main.scss'

const card_data = ['watari', 'watari', 'taguchi', 'taguchi', 'ericia', 'ericia', 'rancia', 'rancia', 'chana', 'chana', 'makoto', 'makoto', 'taki', 'taki', 'makiko', 'makiko'];

const voices = [];
voices.watari = new Howl({
  src: ['./assets/sound/watari.mp3'],
  volume: 0.3,
});
voices.taguchi = new Howl({
  src: ['./assets/sound/taguchi.mp3'],
  volume: 1.6,
});
voices.rancia = new Howl({
  src: ['./assets/sound/rancia.mp3'],
  volume: 1.2,
});
const correct_sound = new Howl({
  src: ['./assets/sound/correct.mp3'],
  volume: 1,
});
const incorrect_sound = new Howl({
  src: ['./assets/sound/incorrect.mp3'],
  volume: 1,
});

const shuffleArray = (array) => {
  const cloneArray = [...array]

  for (let i = cloneArray.length - 1; i >= 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1))
    // 配列の要素の順番を入れ替える
    let tmpStorage = cloneArray[i]
    cloneArray[i] = cloneArray[rand]
    cloneArray[rand] = tmpStorage
  }
  return cloneArray
}

let game_card_data = []
let isSelect = false
const cards = document.querySelectorAll('.card');
const correct = document.querySelector('.correct');
const incorrect = document.querySelector('.incorrect');
const init = () => {
  game_card_data = shuffleArray(card_data);
  // game_card_data = card_data;
  cards.forEach((card, key) => {
    const open_img = card.childNodes.item(1);
    open_img.setAttribute('src', `./assets/img/open.png`);
  });
  console.log(game_card_data);
}
let select_cards = null;
const result = document.querySelector('.result');
const openCard = (card) => {
  card.addEventListener('transitionend', () => {
    // watari_voice.play();
    voices[game_card_data[card.dataset.cardnum]].play();
  }, {
    once: true,
  })
  if (!isSelect) {
    if (!card.classList.contains('open'))
      card.classList.add('open');
    if (!select_cards) {
      select_cards = card;
    } else {
      isSelect = true;
      setTimeout(() => {
        if (game_card_data[select_cards.dataset.cardnum] == game_card_data[card.dataset.cardnum]) {
          card.childNodes.item(1).setAttribute('src', `./assets/img/correct.png`);
          select_cards.childNodes.item(1).setAttribute('src', `./assets/img/correct.png`);
          correct.classList.add('active', 'animate__animated');
          correct_sound.play();
        } else {
          card.classList.remove('open');
          select_cards.classList.remove('open');
          incorrect.classList.add('active', 'animate__animated');
          incorrect_sound.play();
        }
        select_cards = null;
        setTimeout(()=>{
          correct.classList.remove('active', 'animate__animated');
          incorrect.classList.remove('active', 'animate__animated');
          isSelect = false;
        },3000)
      }, 3000)
    }
  }
}


cards.forEach(function (card) {
  card.addEventListener('click', function () {
    openCard(this)
  });
})
init();