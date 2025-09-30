const CHAOS_INTERVAL_MS = 650;

export default function initEvilUniversity() {
  const registerButton = document.getElementById('registerButton');
  const verificationOverlay = document.getElementById('plushieVerification');
  const registrationOverlay = document.getElementById('registrationOverlay');
  const yesButton = document.getElementById('plushieYes');
  const noButton = document.getElementById('plushieNo');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const specialtyInput = document.getElementById('evilSpecialty');
  const villainyInput = document.getElementById('villainyMethod');
  const verificationWarning = document.getElementById('humanWarning');
  const registrationFootnote = document.getElementById('registrationFootnote');
  const registrationModal = registrationOverlay?.querySelector('.registration-modal');
  const form = document.getElementById('evilForm');
  const formErrors = document.getElementById('formErrors');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  const overlays = document.querySelectorAll('[data-overlay]');

  let chaosIntervalId = null;
  let errorCascadeTimeoutId = null;
  let errorCascadeStarted = false;
  let nextErrorIndex = 0;
  let modalAlreadyExploded = false;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ERROR_MESSAGES = [
    'Error 013: Plush compliance certificate missing.',
    'Error 047: Fluff-to-villainy ratio wildly imbalanced.',
    'Error 092: Unauthorized sparkle energy detected in input.',
    'Error 204: Evil specialty selection stuck in adorable mode.',
    'Error 302: Redirect loop to pillow fight dimension triggered.',
    'Error 509: Containment pressure critical — imminent modal rupture.',
  ];

  const openOverlay = (overlay) => {
    if (!overlay) return;
    overlay.classList.add('is-active');
    document.body.classList.add('modal-open');
  };

  const closeOverlay = (overlay) => {
    if (!overlay) return;
    overlay.classList.remove('is-active');
    if (![...overlays].some((node) => node.classList.contains('is-active'))) {
      document.body.classList.remove('modal-open');
    }
  };

  const resetRegistrationChaos = () => {
    registrationModal?.classList.remove('stage-two', 'stage-three', 'stage-four');
    registrationModal?.classList.remove('modal-exploding', 'modal-exploded');
    form?.classList.remove('form-flight', 'form-collapse');
    document.body.classList.remove('full-chaos');
    registrationFootnote?.classList.remove('is-panicking');
    registrationFootnote.textContent =
      'Enrollment closes at the stroke of midnight. Bring your fluffiest self.';
    modalAlreadyExploded = false;

    [firstNameInput, lastNameInput, specialtyInput, villainyInput].forEach((input) => {
      if (!input) return;
      input.classList.remove('field-is-tilting', 'field-is-glitching');
      input.style.transform = '';
      input.style.filter = '';
    });

    if (chaosIntervalId) {
      clearInterval(chaosIntervalId);
      chaosIntervalId = null;
    }
    document.querySelectorAll('.chaos-emoji').forEach((node) => node.remove());

    if (errorCascadeTimeoutId) {
      clearTimeout(errorCascadeTimeoutId);
      errorCascadeTimeoutId = null;
    }
    errorCascadeStarted = false;
    nextErrorIndex = 0;
    formErrors?.classList.remove('is-active');
    if (formErrors) {
      formErrors.replaceChildren();
    }
  };

  const spawnChaosEmoji = () => {
    const emojiOptions = ['🧸', '🔥', '💥', '😈', '🌀', '🎭'];
    const emoji = document.createElement('span');
    emoji.className = 'chaos-emoji';
    emoji.textContent = emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
    emoji.style.left = `${10 + Math.random() * 80}vw`;
    emoji.style.bottom = '-10vh';
    document.body.appendChild(emoji);
    setTimeout(() => {
      emoji.remove();
    }, 3200);
  };

  const activateFullChaos = () => {
    if (document.body.classList.contains('full-chaos')) {
      return;
    }
    document.body.classList.add('full-chaos');
    registrationModal?.classList.add('stage-four');
    registrationFootnote.textContent = 'SYSTEM FAILURE: Enrollment portal consumed by cuddly entropy.';
    registrationFootnote.classList.add('is-panicking');

    if (!prefersReducedMotion && !chaosIntervalId) {
      spawnChaosEmoji();
      chaosIntervalId = window.setInterval(spawnChaosEmoji, CHAOS_INTERVAL_MS);
    }
  };

  const triggerModalExplosion = () => {
    if (modalAlreadyExploded) {
      return;
    }

    modalAlreadyExploded = true;
    registrationModal?.classList.remove('stage-two', 'stage-three', 'stage-four');
    registrationModal?.classList.add('modal-exploding');
    registrationFootnote.textContent = 'CRITICAL ERROR: Modal containment field compromised.';
    registrationFootnote.classList.add('is-panicking');

    registrationModal?.addEventListener(
      'animationend',
      () => {
        registrationModal?.classList.remove('modal-exploding');
        registrationModal?.classList.add('modal-exploded');
      },
      { once: true }
    );
  };

  const scheduleNextError = () => {
    if (!formErrors) return;

    if (nextErrorIndex >= ERROR_MESSAGES.length) {
      errorCascadeTimeoutId = window.setTimeout(() => {
        errorCascadeTimeoutId = null;
        triggerModalExplosion();
      }, 650);
      return;
    }

    const message = ERROR_MESSAGES[nextErrorIndex];
    nextErrorIndex += 1;

    const errorRow = document.createElement('div');
    errorRow.className = 'form-errors__item';

    const icon = document.createElement('span');
    icon.className = 'form-errors__icon';
    icon.textContent = '⚠️';

    const text = document.createElement('span');
    text.textContent = message;

    errorRow.append(icon, text);
    formErrors.appendChild(errorRow);
    formErrors.classList.add('is-active');

    if (registrationFootnote && nextErrorIndex >= Math.ceil(ERROR_MESSAGES.length / 2)) {
      registrationFootnote.textContent = 'ALERT: Validation cascade accelerating out of control.';
      registrationFootnote.classList.add('is-panicking');
    }

    errorCascadeTimeoutId = window.setTimeout(() => {
      errorCascadeTimeoutId = null;
      scheduleNextError();
    }, 820);
  };

  const startErrorCascade = () => {
    if (errorCascadeStarted) {
      return;
    }

    errorCascadeStarted = true;
    nextErrorIndex = 0;
    if (formErrors) {
      formErrors.replaceChildren();
      formErrors.classList.add('is-active');
    }
    registrationFootnote.textContent = 'Warning: Validation anomalies detected across all fields.';
    registrationFootnote.classList.add('is-panicking');
    scheduleNextError();
  };

  registerButton?.addEventListener('click', () => {
    verificationWarning.textContent = 'Humans may apply once they achieve plush status.';
    verificationWarning.classList.remove('is-panicking');
    openOverlay(verificationOverlay);
  });

  yesButton?.addEventListener('click', () => {
    closeOverlay(verificationOverlay);
    setTimeout(() => openOverlay(registrationOverlay), 180);
  });

  noButton?.addEventListener('click', () => {
    const modalPanel = verificationOverlay?.querySelector('.modal');
    modalPanel?.classList.add('modal--shake');
    verificationWarning.textContent = 'Denied. Please hug three plushies and try again.';
    verificationWarning.classList.add('is-panicking');
    setTimeout(() => {
      modalPanel?.classList.remove('modal--shake');
      verificationWarning.classList.remove('is-panicking');
    }, 700);
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const overlay = button.closest('[data-overlay]');
      closeOverlay(overlay);
      if (overlay === registrationOverlay) {
        resetRegistrationChaos();
      }
    });
  });

  overlays.forEach((overlay) => {
    overlay.addEventListener('click', (event) => {
      if (event.target !== overlay) return;
      if (overlay.dataset.dismissible === 'false') return;
      closeOverlay(overlay);
    });
  });

  firstNameInput?.addEventListener('input', () => {
    firstNameInput.classList.add('field-is-tilting');
    const valueLength = firstNameInput.value.length || 1;
    const rotateDeg = Math.min(valueLength * 1.6, 14);
    const skewDeg = Math.sin(valueLength) * 4;
    firstNameInput.style.transform = `rotate(${rotateDeg}deg) skewX(${skewDeg}deg)`;
  });

  lastNameInput?.addEventListener('input', () => {
    lastNameInput.classList.add('field-is-glitching');
    const hue = (lastNameInput.value.length * 47) % 360;
    lastNameInput.style.filter = `hue-rotate(${hue}deg)`;
    registrationModal?.classList.add('stage-two');
  });

  const escalateSpecialtyChaos = () => {
    registrationModal?.classList.add('stage-three');
    form?.classList.add('form-flight');
  };

  specialtyInput?.addEventListener('input', escalateSpecialtyChaos);
  specialtyInput?.addEventListener('change', escalateSpecialtyChaos);

  villainyInput?.addEventListener('focus', startErrorCascade);
  villainyInput?.addEventListener('input', () => {
    startErrorCascade();
    villainyInput.style.transform = `rotate(${(villainyInput.value.length * 45) % 360}deg) scale(1.08)`;
    activateFullChaos();
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    form.classList.add('form-collapse');
    registrationFootnote.textContent = 'Submission rejected: portal flipped upside down. Please embrace the chaos.';
    registrationFootnote.classList.add('is-panicking');
  });

  registrationOverlay?.addEventListener('transitionend', (event) => {
    if (event.propertyName === 'opacity' && !registrationOverlay.classList.contains('is-active')) {
      resetRegistrationChaos();
    }
  });
}
