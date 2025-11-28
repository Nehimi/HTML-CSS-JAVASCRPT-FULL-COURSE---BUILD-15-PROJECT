(() => {
  const display = document.getElementById('display');
  const buttons = Array.from(document.querySelectorAll('.btn'));

  let expression = '';

  function render(){
    display.textContent = expression === '' ? '0' : expression;
  }

  function append(value){
    // prevent multiple leading zeros
    if(expression === '0' && value === '0') return;
    // avoid two dots in the same number
    const lastToken = expression.split(/\+|\-|\*|\//).pop();
    if(value === '.' && lastToken && lastToken.includes('.')) return;
    expression += value;
    render();
  }

  function clearAll(){ expression = ''; render(); }
  function backspace(){ expression = expression.slice(0,-1); render(); }

  function safeEvaluate(expr){
    // allow only digits, operators, parentheses, decimal points and spaces
    if(!/^[0-9+\-*/().\s]+$/.test(expr)) throw new Error('Invalid characters');
    // replace accidental leading zeros and multiple operators handled by JS engine
    // eslint-disable-next-line no-new-func
    const result = Function('return (' + expr + ')')();
    if(!isFinite(result)) throw new Error('Math error');
    // round to avoid floating precision issues
    return Math.round((result + Number.EPSILON) * 100000000) / 100000000;
  }

  function evaluate(){
    try{
      if(expression.trim() === '') return;
      const sanitized = expression.replace(/×/g,'*').replace(/÷/g,'/');
      const value = safeEvaluate(sanitized);
      expression = String(value);
      render();
    }catch(e){
      expression = 'Error';
      render();
      setTimeout(()=>{ expression=''; render(); }, 1000);
    }
  }

  buttons.forEach(btn => {
    const val = btn.dataset.value;
    const action = btn.dataset.action;
    btn.addEventListener('click', ()=>{
      if(action === 'clear') clearAll();
      else if(action === 'back') backspace();
      else if(action === 'equals') evaluate();
      else if(val) append(val);
    });
  });

  // keyboard support
  window.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter') { e.preventDefault(); evaluate(); return; }
    if(e.key === 'Backspace') { backspace(); return; }
    if(e.key === 'Escape') { clearAll(); return; }
    const key = e.key;
    if(/^[0-9]$/.test(key) || key === '.') { append(key); return; }
    if(/^[+\-*/]$/.test(key)) { append(key); return; }
  });

  // initialize
  render();
})();
