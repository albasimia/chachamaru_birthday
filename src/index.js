// JS
import './js/'
import {
  Howl,
  Howler
} from 'howler'

// SCSS
import './assets/scss/main.scss'

const card_data = ['watari', 'watari', 'taguchi', 'taguchi', 'tanikou', 'tanikou', 'rancia', 'rancia', 'chana', 'chana', 'makoto', 'makoto', 'taki', 'taki', 'makiko', 'makiko'];

// voice
const voices = [];
voices.watari = new Howl({
  src: ['./assets/sound/watari.mp3'],
  volume: 0.4,
});
voices.taguchi = new Howl({
  src: ['./assets/sound/taguchi.mp3'],
  volume: 1.6,
});
voices.rancia = new Howl({
  src: ['./assets/sound/rancia.mp3'],
  volume: 1.0,
});
voices.taki = new Howl({
  src: ['./assets/sound/taki.mp3'],
  volume: 1.0,
});
voices.makoto = new Howl({
  src: ['./assets/sound/makoto.mp3'],
  volume: 0.7,
});
voices.makiko = new Howl({
  src: ['./assets/sound/makiko.mp3'],
  volume: 1.0,
});
voices.tanikou = new Howl({
  src: ['./assets/sound/tanikou.mp3'],
  volume: 1.0,
});
voices.chana = new Howl({
  src: ['./assets/sound/chana.mp3'],
  volume: 0.7,
});

// SE
const correct_sound = new Howl({
  src: ['./assets/sound/correct.mp3'],
  volume: 1,
});
const incorrect_sound = new Howl({
  src: ['./assets/sound/incorrect.mp3'],
  volume: 1,
});

let correct_count = 0;
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
let is_select = false
const cards = document.querySelectorAll('.card');
const correct = document.querySelector('.correct');
const incorrect = document.querySelector('.incorrect');
const init = () => {
  // game_card_data = shuffleArray(card_data);
  game_card_data = card_data;
  cards.forEach((card, key) => {
    const open_img = card.childNodes.item(1);
    open_img.setAttribute('src', `./assets/img/open.png`);
  });
  correct_count = 0;
  console.log(game_card_data); // あとで消す。
}
let select_cards = null;
let is_correct = false;
const result = document.querySelector('.result');
const openCard = (card) => {
  if (!is_select) {
    card.addEventListener('transitionend', () => {
      // watari_voice.play();
      voices[game_card_data[card.dataset.cardnum]].play();
    }, {
      once: true,
    })
    if (!card.classList.contains('open'))
      card.classList.add('open');
    if (!select_cards) {
      select_cards = card;
    } else {
      is_select = true;
      setTimeout(() => {
        if (game_card_data[select_cards.dataset.cardnum] == game_card_data[card.dataset.cardnum]) {
          card.childNodes.item(1).setAttribute('src', `./assets/img/correct.png`);
          select_cards.childNodes.item(1).setAttribute('src', `./assets/img/correct.png`);
          correct.classList.add('active', 'animate__animated');
          correct_sound.play();
          is_correct = true;
        } else {
          card.classList.remove('open');
          select_cards.classList.remove('open');
          incorrect.classList.add('active', 'animate__animated');
          incorrect_sound.play();
        }
        select_cards = null;
        setTimeout(() => {
          correct.classList.remove('active', 'animate__animated');
          incorrect.classList.remove('active', 'animate__animated');
          if (is_correct) {
            correct_count++;
            console.log(correct_count)
            if (correct_count == 8) {
              console.log('all clear');
            }
          }
          is_select = false;
          is_correct = false;
        }, 3000)
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