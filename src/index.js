import './styles/main.scss';

function init () {

  // Animate the cheese and mouse
  document.addEventListener('DOMContentLoaded', () => {
      const cheese = document.querySelector('.cheese');
      const mouse = document.querySelector('.mouse');

      cheese.addEventListener('click', () => {
      cheese.classList.add('cheese--shrink');
      mouse.classList.add('mouse--animated');

      setTimeout(() => {
          cheese.style.visibility = 'hidden';
      }, 800); // Hide the cheese faster (changed from 1900ms to 1500ms)

      setTimeout(() => {
          mouse.classList.remove('mouse--animated');
      }, 2500); // Remove the animation class from the mouse later (new timeout)

      setTimeout(() => {
          cheese.classList.remove('cheese--shrink');
          cheese.style.visibility = 'visible';
      }, 5000); // Reset the cheese later (changed from 4000ms to 4500ms)
      });
  });
}

init();

