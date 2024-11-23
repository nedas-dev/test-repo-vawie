import './styles/main.scss';
import jacque from './js/jacque';
import christy from './js/christy';
import vawie from './js/vawie';
import gobble from './js/gobble';
function init () {

  // Animate the cheese and mouse
  document.addEventListener('DOMContentLoaded', () => {
    jacque();
    christy();
    vawie();
    gobble();
  });
}

init();
