window.addEventListener('keydown', function(e) {
    // Select audio element where data-key matches the key pressed
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if (!audio) return; // stop the function if no audio found

    audio.currentTime = 0; // rewind to start so we can hit it fast
    audio.play();

    key.classList.add('playing');
});

// Remove the animation class after it plays
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));