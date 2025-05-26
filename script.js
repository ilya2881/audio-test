

const used = new Set();
const player = document.getElementById('player');
const form = document.getElementById('test-form');
const result = document.getElementById('result');
const nextBtn = document.getElementById('next');
const englishInput = document.getElementById('english');
const russianInput = document.getElementById('russian');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');

let current;
let timer = 0;
let interval;
let score = 0;
let submitted = false;

function startTimer() {
  interval = setInterval(() => {
    timer++;
    timerDisplay.textContent = `Время: ${timer} сек`;
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function getRandomItem() {
  const remaining = data.filter((_, i) => !used.has(i));
  if (remaining.length === 0) {
    alert('Все примеры пройдены!');
    return;
  }
  const index = Math.floor(Math.random() * remaining.length);
  const item = remaining[index];
  const realIndex = data.indexOf(item);
  used.add(realIndex);
  current = item;
  player.src = item.file;
  player.play();
  submitted = false;
  form.querySelector('button[type="submit"]').disabled = false;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (submitted) return;

  const eng = englishInput.value.trim().toLowerCase();
  const rus = russianInput.value.trim().toLowerCase();

  const correctEng = current.english.toLowerCase().split(',').map(w => w.trim());
  const correctRus = current.russian.toLowerCase().split(',').map(w => w.trim());

  const isCorrectEng = correctEng.includes(eng);
  const isCorrectRus = correctRus.includes(rus);

  if (isCorrectEng && isCorrectRus) {
    result.textContent = 'Верно!';
    result.className = 'correct';
    score++;
    scoreDisplay.textContent = `Правильных ответов: ${score}`;
  } else {
    result.textContent = `Неверно. Правильно: ${current.english} — ${current.russian}`;
    result.className = 'wrong';
  }

  submitted = true;
  form.querySelector('button[type="submit"]').disabled = true;
});

nextBtn.addEventListener('click', () => {
  englishInput.value = '';
  russianInput.value = '';
  result.textContent = '';
  getRandomItem();
});

// Запуск
startTimer();
getRandomItem();
