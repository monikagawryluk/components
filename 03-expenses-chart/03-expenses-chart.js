'use strict';

//// Variables

const state = {
  chartData: [],
  barsHeight: [],
  activeBarNr: 0,
};

const chartContainer = document.querySelector('.chart-container');

//// Functions

const createDataArray = function (data) {
  data.forEach(el => {
    const barData = {
      day: el.day,
      value: el.amount,
    };
    state.chartData.push(barData);
  });

  console.log(state.chartData);
};

const createBarsHeightArray = function (data) {
  const valuesArray = data.map(el => el.value);
  const maxValue = Math.max(...valuesArray);

  data.forEach(el => {
    const barHeight = (el.value * 100) / maxValue; // in % of highest bar
    state.barsHeight.push(barHeight);
  });
};

const createChartMarkup = function (data) {
  data.forEach((el, i) => {
    const markup = `
      <div class="day-box">
        <div class="bar-box">
          <button class="bar" data-bar-nr="${i + 1}" >
          </button>
          <p class="bar-value hidden" data-value-nr="${i + 1}">$${el.value}</p>
        </div>
        <p class="day-name">${el.day}</p>
      </div>
    `;

    chartContainer.insertAdjacentHTML('beforeend', markup);
  });
};

const changeBarsHeightProperty = function () {
  const bars = document.querySelectorAll('.bar');

  bars.forEach((bar, i) => {
    bar.style.height = `${state.barsHeight[i]}%`;
  });
};

const changeValueTagsLocation = function () {
  const values = document.querySelectorAll('.bar-value');
  const barContainerEl = document.querySelector('.bar-box');
  const barContainerHeight = barContainerEl.clientHeight / 10; // in rem

  values.forEach((value, i) => {
    value.style.transform = `translate(-50%, ${
      (-state.barsHeight[i] * barContainerHeight) / 100 - 0.5
    }rem)`;
  });
};

const createErrorMessage = function () {
  chartContainer.style.flexDirection = 'column';
  chartContainer.innerHTML = '';

  const markup = `
      <p class="error">Sorry, something went wrong. Chart data couldn't be loaded.</p>
      <p class="error">Please try again.</p>
    `;
  chartContainer.insertAdjacentHTML('beforeend', markup);
};

const init = async function () {
  try {
    // Get chart data from file data.json
    const res = await fetch('data.json');
    const data = await res.json();

    // Add chart data to state
    createDataArray(data);

    // Create chart markup
    createChartMarkup(state.chartData);

    // Create array with bars' heights
    createBarsHeightArray(state.chartData);

    // Create bars' height animation
    window.setTimeout(changeBarsHeightProperty, 200);

    // Move bars' value tags to the top of bars
    window.setTimeout(changeValueTagsLocation, 200);
  } catch (err) {
    console.log(err);
    createErrorMessage();
  }
};
init();

//// Event Listeners

// Clik on bar -> Change bar color
chartContainer.addEventListener('click', function (e) {
  if (!e.target.classList.contains('bar')) return;

  const selectedBarNr = e.target.dataset.barNr;
  state.activeBarNr = selectedBarNr;
  const bars = document.querySelectorAll('.bar');
  const values = document.querySelectorAll('.bar-value');

  bars.forEach((bar, i) => {
    bar.classList.remove('bar--selected');
    values[i].classList.add('hidden');
  });

  bars[selectedBarNr - 1].classList.add('bar--selected');
  values[selectedBarNr - 1].classList.remove('hidden');
});

// Move mouse over bar or out of bar -> Show or hide value tag
['mouseover', 'mouseout'].forEach(ev =>
  chartContainer.addEventListener(ev, function (e) {
    if (!e.target.classList.contains('bar')) return;

    const selectedBarNr = e.target.dataset.barNr;
    if (selectedBarNr === state.activeBarNr) return;

    const values = document.querySelectorAll('.bar-value');
    values[selectedBarNr - 1].classList.toggle('hidden');
  })
);
