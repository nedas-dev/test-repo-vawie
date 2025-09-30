import './styles/main.scss';
import jacque from './js/jacque';
import christy from './js/christy';
import vawie from './js/vawie';
import gobble from './js/gobble';
import initEvilUniversity from './js/evil-university';

function init() {
  document.addEventListener('DOMContentLoaded', () => {
    jacque();
    christy();
    vawie();
    gobble();
    initEvilUniversity();
  });
}

init();
