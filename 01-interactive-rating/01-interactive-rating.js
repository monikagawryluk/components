'use strict';

//// Variables

const btnSubmit = document.querySelector('.rating-btn-submit');
const containerBtnsRating = document.querySelector('.rating-numbers');
const btnsRating = document.querySelectorAll('.rating-number');
const cartStateRate = document.querySelector('.rating-state');
const cartStateThankYou = document.querySelector('.thank-you-state');
const error = document.querySelector('.rating-error');

let currentRating;

//// Event Listeners

// Submitting selected rating
btnSubmit.addEventListener('click', function () {
  if (!currentRating) {
    error.classList.remove('hidden');
    return;
  }

  // Changing card from rating state to thank-you state
  document.querySelector('.selected-rating').textContent = currentRating;
  cartStateRate.classList.toggle('hidden');
  cartStateThankYou.classList.toggle('hidden');
});

// Selecting rating
containerBtnsRating.addEventListener('click', function (e) {
  if (!e.target.classList.contains('rating-number')) return;

  btnsRating.forEach(btn => {
    btn.classList.add('not-selected-number');
    btn.classList.remove('selected-number');
  });

  const selectedBtnRating = e.target;
  currentRating = selectedBtnRating.dataset.number;
  selectedBtnRating.classList.remove('not-selected-number');
  selectedBtnRating.classList.add('selected-number');
});
