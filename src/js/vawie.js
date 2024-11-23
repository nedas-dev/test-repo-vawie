export default function vawie() {
  // Add new event listener for vawie
  const vawie = document.querySelector('.vawie');
  const dropSound = new Audio('assets/drop-sound.mp3');
  dropSound.playbackRate = 2.5;

  vawie.addEventListener('click', () => {
    // Create candy element
    const candy = document.createElement('img');
    candy.src = 'assets/candy.png';
    candy.classList.add('falling-candy');

    // Position the candy at the bottom of vawie
    const vawieRect = vawie.getBoundingClientRect();
    candy.style.position = 'absolute';
    if (window.innerWidth <= 768) {
      candy.style.left = `${vawieRect.left + vawieRect.width / 2 - 10}px`;
      candy.style.top = `${vawieRect.bottom - 90}px`;
    } else {
      candy.style.left = `${vawieRect.left + vawieRect.width / 2 - 25}px`;
      candy.style.top = `${vawieRect.bottom - 110}px`;
    }

    // Add candy to the document
    document.body.appendChild(candy);

    // Animate the candy falling and play sound
    setTimeout(() => {
      candy.style.transition = 'top 1s ease-in';
      candy.style.top = `${window.innerHeight}px`;
      dropSound.play();
    }, 50);

    // Remove candy after animation
    setTimeout(() => {
      document.body.removeChild(candy);
    }, 1100);
  });
}
