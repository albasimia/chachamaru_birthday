// JS
import './js/'

// SCSS
import './assets/scss/main.scss'

const card_data = ['watari', 'watari', 'taguchi', 'taguchi', 'ericia', 'ericia', 'rancia', 'rancia', 'chana', 'chana', 'makoto', 'makoto', 'taki', 'taki', 'makiko', 'makiko'];

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

let game_card_data = [];
let isSelect = false;
const cards = document.querySelectorAll('.card');
const init = () => {
  game_card_data = shuffleArray(card_data);
  // game_card_data = card_data;
  cards.forEach((card, key) => {
    const open_img = card.childNodes.item(1);
    open_img.setAttribute('src', `./assets/img/open.png`);
  })
}
let select_cards = null;
const result = document.querySelector('.result');
const openCard = (card) => {
  if (!isSelect) {
    if (!card.classList.contains('open'))
      card.classList.add('open');
    if (!select_cards) {
      select_cards = card;
    } else {
      isSelect = true;
      setTimeout(() => {
        if (game_card_data[select_cards.dataset.cardnum] == game_card_data[card.dataset.cardnum]) {
          result.innerText = '正解';
          card.childNodes.item(1).setAttribute('src', `./assets/img/correct.png`);
          select_cards.childNodes.item(1).setAttribute('src', `./assets/img/correct.png`);
        } else {
          result.innerText = 'ちがうよ';
          card.classList.remove('open');
          select_cards.classList.remove('open');
        }
        select_cards = null;
        isSelect = false;
      }, 1000)
    }
  }
}


cards.forEach(function (card) {
  card.addEventListener('click', function () {
    openCard(this)
  });
})
init();