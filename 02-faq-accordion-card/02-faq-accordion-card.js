// const question = document.querySelector('.question');

const questionsContainer = document.querySelector('.text-box');
const questions = document.querySelectorAll('.question');
const answers = document.querySelectorAll('.answer');
// const btnsArrow = document.querySelector('.btn-arrow');

questionsContainer.addEventListener('click', function (e) {
  const question = e.target;
  if (!question.classList.contains('question')) return;

  const questionNr = question.dataset.question;
  console.log(questionNr);
  question.classList.toggle('question-selected');

  answers.forEach(answer => {
    if (answer.dataset.answer !== questionNr) return;

    answer.classList.toggle('hidden');
  });
});

questionsContainer.addEventListener('click', function (e) {
  const arrow = e.target.closest('.btn-arrow');
  if (!arrow) return;

  const arrowNr = arrow.dataset.question;

  arrow.classList.toggle('rotated');

  questions.forEach(question => {
    if (question.dataset.question !== arrowNr) return;

    question.classList.toggle('question-selected');
  });

  answers.forEach(answer => {
    if (answer.dataset.answer !== arrowNr) return;

    answer.classList.toggle('hidden');
  });
});
