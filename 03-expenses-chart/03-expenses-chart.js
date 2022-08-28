'use strict';

const chartContainer = document.querySelector('.chart-container');

// Fetch JSON from file data.json

const data = fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const amountsArray = data.map(i => i.amount);
    console.log(amountsArray);
    const maxAmount = Math.max(...amountsArray);
    console.log(maxAmount);

    console.log(data);
    data.forEach((item, i) => {
      const barHeight = (item.amount * 100) / maxAmount;
      const markup = `
        <div class="day-box">
          <div class="bar-box">
            <button class="bar" data-bar-nr="${
              i + 1
            }" style="height: ${barHeight}%">
              <div class="bar-value hidden" data-value-nr="${i + 1}" >$${
        item.amount
      }</div>
            </button>
          </div>
          <p class="day-name">${item.day}</p>
        </div>
      `;

      chartContainer.insertAdjacentHTML('beforeend', markup);
    });
  })
  .catch(err => console.log(err));

chartContainer.addEventListener('click', function (e) {
  const bar = e.target;

  if (!bar.classList.contains('bar')) return;

  const selectedBarNr = bar.dataset.barNr;

  const bars = document.querySelectorAll('.bar');
  const values = document.querySelectorAll('.bar-value');
  console.log(bars);
  console.log(values);

  bars.forEach(bar => {
    bar.classList.remove('bar--selected');

    if (bar.dataset.barNr !== selectedBarNr) return;
    bar.classList.add('bar--selected');

    values.forEach(value => {
      value.classList.add('hidden');

      if (value.dataset.valueNr !== selectedBarNr) return;
      value.classList.remove('hidden');
    });
  });
});
