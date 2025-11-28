# Simple Calculator

An attractive, responsive calculator built with plain HTML, CSS and JavaScript. This small project is great for learners who want to practice DOM manipulation, event handling, and basic expression evaluation.

Features
- Responsive, modern UI with soft shadows and gradients
- Click and keyboard input support (numbers, + - * /, Enter to evaluate, Backspace to delete, Esc to clear)
- Decimal support and rounding to avoid floating precision noise
- Small, self-contained code base easy to read and extend

How to run
1. Open `index.html` in your browser, or serve the folder with a simple server:

```bash
cd "d:/HTML CSS JAVASCRPT FULL COURSE - BUILD 15 PROJECT/Quiz-Game/SimpleCalculator"
python -m http.server 8001
# then open http://localhost:8001
```

How it works
- `index.html` contains the layout and buttons. Buttons have `data-value` or `data-action` attributes used by the script.
- `script.js` maintains a small `expression` string, appends characters as you press buttons or keys, and evaluates safely when `=` or Enter is pressed.

Ideas for learners
- Add parentheses buttons and improve parsing to support order of operations (already supported by JS eval but try building a parser!)
- Add a theme toggle (dark/light) and persist the setting in `localStorage`.
- Add history: save last N calculations and allow reusing them.
- Add keyboard key highlighting when pressed.

Want me to add any of these features? Tell me which one and I'll implement it.
