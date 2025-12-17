// Basic Quiz Game logic
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const answersContainer = document.getElementById('answers-container');
const questionText = document.getElementById('question-text');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');
const scoreEl = document.getElementById('score');
const progressEl = document.getElementById('progress');
const finalScoreEl = document.getElementById('final-score');
const maxScoreEl = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');

let currentIndex = 0;
let score = 0;
let acceptingAnswers = true;

const questions = [
    {
        text: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Rome', correct: false }
        ]
    },
    {
        text: 'Which language runs in a web browser?',
        answers: [
            { text: 'Java', correct: false },
            { text: 'C', correct: false },
            { text: 'JavaScript', correct: true },
            { text: 'Python', correct: false }
        ]
    },
    {
        text: 'What does CSS stand for?',
        answers: [
            { text: 'Central Style Sheets', correct: false },
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Cascading Simple Sheets', correct: false },
            { text: 'Cars SUVs Sailboats', correct: false }
        ]
    },
    {
        text: 'Which company developed the React library?',
        answers: [
            { text: 'Google', correct: false },
            { text: 'Facebook', correct: true },
            { text: 'Twitter', correct: false },
            { text: 'Microsoft', correct: false }
        ]
    },
    {
        text: 'What year was ES6 (ECMAScript 2015) released?',
        answers: [
            { text: '2014', correct: false },
            { text: '2015', correct: true },
            { text: '2016', correct: false },
            { text: '2017', correct: false }
        ]
    }
];

totalQuestionsEl.textContent = questions.length;
maxScoreEl.textContent = questions.length;
scoreEl.textContent = score;

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    currentIndex = 0;
    score = 0;
    scoreEl.textContent = score;
    showQuestion();
}

function showQuestion() {
    acceptingAnswers = true;
    const q = questions[currentIndex];
    questionText.textContent = q.text;
    currentQuestionEl.textContent = currentIndex + 1;
    // clear old answers
    answersContainer.innerHTML = '';
    q.answers.forEach((ans, idx) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = ans.text;
        btn.dataset.correct = ans.correct;
        btn.addEventListener('click', selectAnswer);
        answersContainer.appendChild(btn);
    });
    updateProgress();
}

function selectAnswer(e) {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const btn = e.currentTarget;
    const isCorrect = btn.dataset.correct === 'true' || btn.dataset.correct === true;
    if (isCorrect) {
        btn.classList.add('correct');
        score++;
        scoreEl.textContent = score;
    }
    else {
        btn.classList.add('incorrect');
        // highlight the correct answer
        const buttons = answersContainer.querySelectorAll('button');
        buttons.forEach(b => {
            if (b.dataset.correct === 'true') b.classList.add('correct');
        });
    }
    // move to next question after short delay
    setTimeout(() => {
        currentIndex++;
        if (currentIndex >= questions.length) {
            showResults();
        } else {
            showQuestion();
        }
    }, 900);
}

function updateProgress() {
    const pct = ((currentIndex) / questions.length) * 100;
    progressEl.style.width = `${pct}%`;
}

function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    finalScoreEl.textContent = score;
    // simple message based on score
    const percent = (score / questions.length) * 100;
    if (percent === 100) resultMessage.textContent = 'Perfect! Excellent work!';
    else if (percent >= 70) resultMessage.textContent = 'Great job!';
    else if (percent >= 40) resultMessage.textContent = 'Not bad — keep practicing!';
    else resultMessage.textContent = 'Keep learning — you can do it!';
    progressEl.style.width = `100%`;
}

function restartQuiz() {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    currentIndex = 0;
    score = 0;
    scoreEl.textContent = score;
    progressEl.style.width = '0%';
}

// Initialize small safety if someone opens quiz screen directly
if (!startScreen || !quizScreen || !resultScreen) {
    console.warn('Quiz elements missing from DOM');
}

// Theme toggle: persist theme in localStorage and initialize
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme) {
    if (theme === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    if (themeToggle) themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

function initTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) applyTheme(stored);
    else applyTheme(prefersDark ? 'dark' : 'light');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        const theme = isDark ? 'dark' : 'light';
        applyTheme(theme);
        localStorage.setItem('theme', theme);
    });
}

initTheme();
