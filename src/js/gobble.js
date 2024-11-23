export default function gobble() {
  const gobbleElement = document.querySelector('.gobble');
  
  // Set initial position off-screen to the left
  gobbleElement.style.transform = 'translateX(-100%)';
  
  // Trigger the animation after a small delay
  setTimeout(() => {
    gobbleElement.classList.add('gobble--walking');
  }, 100);
}
