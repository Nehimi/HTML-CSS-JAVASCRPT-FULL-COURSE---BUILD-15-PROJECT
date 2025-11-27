# Quiz Game

Simple quiz web app built with HTML, CSS and vanilla JavaScript. This is a lightweight project intended for learning DOM manipulation, styling, and small app state management.

**Features**
- **Start / Restart**: Begin the quiz and restart when finished.
- **Multiple questions**: Questions and answers are rendered dynamically from `script.js`.
- **Scoring**: Score updates as you answer questions.
- **Progress bar**: Visual progress indicator for questions completed.
- **Dark mode**: Toggle and persistent theme stored to `localStorage`.

**Files**
- `index.html` — main HTML file
- `style.css` — styles, uses CSS variables and dark-mode overrides
- `script.js` — quiz logic, question data, and theme toggle

**Run locally**
1. Open `index.html` directly in your browser (double-click), or run a simple static server from the project folder:

```bash
cd "d:/HTML CSS JAVASCRPT FULL COURSE - BUILD 15 PROJECT/Quiz-Game"
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

**How to use**
- Click the `Start Quiz` button to begin.
- Click an answer to select it; correct/incorrect answers are highlighted briefly, then the next question appears.
- After the last question the results screen shows your score; click `Restart Quiz` to play again.
- Use the theme toggle (top-right) to switch between light and dark themes — your choice is saved.

**Add or edit questions**
- Open `script.js` and find the `questions` array near the top of the file.
- Each question object looks like:

```js
{
  text: 'Question text here',
  answers: [
    { text: 'Option 1', correct: false },
    { text: 'Option 2', correct: true },
    ...
  ]
}
```

Add, remove or update entries in that array to change the quiz content.

**Accessibility & Improvements (ideas)**
- Add keyboard navigation for answer selection (arrow keys + Enter).
- Add animations for transitions between questions.
- Persist high scores to `localStorage`.
- Load questions from a JSON file or API.

If you'd like, I can commit this README and the recent changes to Git, or add any of the improvements above. Which would you like next?
