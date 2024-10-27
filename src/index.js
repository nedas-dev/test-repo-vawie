import './styles/main.scss';
import confetti from 'canvas-confetti';

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

      // Add confetti effect for Christy
      const christy = document.querySelector('.christy');
      christy.addEventListener('click', () => {
        // Create a confetti cannon effect
        const count = 200;
        const defaults = {
          origin: { y: 0.7 },
          zIndex: 9999,
        };

        function fire(particleRatio, opts) {
          confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
          }));
        }

        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        });

        fire(0.2, {
          spread: 60,
        });

        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8
        });

        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2
        });

        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        });

        // Add a fun animation to Christy
        christy.classList.add('christy--celebrate');
        setTimeout(() => {
          christy.classList.remove('christy--celebrate');
        }, 1000);
      });

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
          candy.style.left = `${(vawieRect.left + vawieRect.width / 2) - 10}px`;
          candy.style.top = `${vawieRect.bottom - 90}px`;
        } else {
          candy.style.left = `${(vawieRect.left + vawieRect.width / 2) - 25}px`;
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
  });
}

init();
