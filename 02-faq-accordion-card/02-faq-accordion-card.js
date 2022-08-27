'use strict';

//// Variables

const questionsContainer = document.querySelector('.text-box');
const questions = document.querySelectorAll('.question');
const answers = document.querySelectorAll('.answer');
const btnsArrow = document.querySelectorAll('.btn-arrow');

//// Functions

const boldQuestion = function (question) {
  question.classList.toggle('question-selected');
};

const showOrHideAnswer = function (questionNr) {
  answers.forEach(answer => {
    if (answer.dataset.answerNr !== questionNr) return;

    answer.classList.toggle('hidden');
  });
};

const rotateArrow = function (arrow) {
  arrow.classList.toggle('rotated');
};

//// Event Listeners

// Show or hide answer after clicking on the question text
questionsContainer.addEventListener('click', function (e) {
  const question = e.target;
  if (!question.classList.contains('question')) return;

  const questionNr = question.dataset.questionNr;

  boldQuestion(question);
  showOrHideAnswer(questionNr);

  btnsArrow.forEach(arrow => {
    if (arrow.dataset.arrowNr !== questionNr) return;

    rotateArrow(arrow);
  });
});

// Show or hide answer after clicking on the arrow
questionsContainer.addEventListener('click', function (e) {
  const arrow = e.target.closest('.btn-arrow');
  if (!arrow) return;

  const arrowNr = arrow.dataset.arrowNr;

  questions.forEach(question => {
    if (question.dataset.questionNr !== arrowNr) return;

    boldQuestion(question);
  });

  showOrHideAnswer(arrowNr);
  rotateArrow(arrow);
});
