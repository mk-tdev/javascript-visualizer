// Main application logic for Algorithm Visualizer
import { algorithmCode, createAlgorithms } from './algorithms.js';

// Application state
let array = [];
let comparisons = 0;
let swaps = 0;
let isSorting = false;
let currentLine = null;

// DOM elements
const elements = {
  arrayContainer: document.getElementById('arrayContainer'),
  algorithm: document.getElementById('algorithm'),
  arraySize: document.getElementById('arraySize'),
  speed: document.getElementById('speed'),
  generateBtn: document.getElementById('generateBtn'),
  startBtn: document.getElementById('startBtn'),
  resetBtn: document.getElementById('resetBtn'),
  comparisons: document.getElementById('comparisons'),
  swaps: document.getElementById('swaps'),
  algorithmName: document.getElementById('algorithmName'),
  timeComplexity: document.getElementById('timeComplexity'),
  spaceComplexity: document.getElementById('spaceComplexity'),
  algorithmDesc: document.getElementById('algorithmDesc'),
  status: document.getElementById('status'),
  codeDisplay: document.getElementById('codeDisplay'),
  lineNumber: document.getElementById('lineNumber')
};

// Utility functions
function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function highlightLine(lineNum) {
  document.querySelectorAll('.code-line').forEach(el => {
    el.classList.remove('executing');
  });
  if (lineNum !== null) {
    const line = document.querySelector(`[data-line="${lineNum}"]`);
    if (line) {
      line.classList.add('executing');
      line.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  elements.lineNumber.textContent = lineNum || '—';
}

async function sleep() {
  return new Promise(resolve => setTimeout(resolve, parseInt(elements.speed.value)));
}

// Visualization functions
function renderArray(arr, activeIndices = [], sortedIndices = []) {
  elements.arrayContainer.innerHTML = '';
  const maxValue = Math.max(...arr);

  arr.forEach((value, idx) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = (value / maxValue) * 100 + '%';

    if (sortedIndices.includes(idx)) {
      bar.classList.add('sorted');
    } else if (activeIndices.includes(idx)) {
      bar.classList.add('comparing');
    }

    elements.arrayContainer.appendChild(bar);
  });
}

function displayCode() {
  const algoCode = algorithmCode[elements.algorithm.value];
  const lines = algoCode.split('\n');
  elements.codeDisplay.innerHTML = lines
    .map((line, idx) => `
            <div class="code-line" data-line="${idx + 1}">
                <span class="code-line-number">${idx + 1}</span>
                <span>${escapeHtml(line)}</span>
            </div>
        `)
    .join('');
}

// Stats functions
function resetStats() {
  comparisons = 0;
  swaps = 0;
  updateStats();
}

function updateStats() {
  elements.comparisons.textContent = comparisons;
  elements.swaps.textContent = swaps;
}

// Algorithm info
function updateAlgorithmInfo() {
  const algorithms = createAlgorithms(visualizer);
  const algo = algorithms[elements.algorithm.value];
  elements.algorithmName.textContent = algo.name;
  elements.timeComplexity.textContent = algo.complexity.time;
  elements.spaceComplexity.textContent = algo.complexity.space;
  elements.algorithmDesc.textContent = algo.description;
}

// Array generation
function generateArray() {
  const size = parseInt(elements.arraySize.value);
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  renderArray(array);
  resetStats();
}

// Sorting control
async function startSorting() {
  if (isSorting) return;
  isSorting = true;
  elements.startBtn.disabled = true;
  elements.generateBtn.disabled = true;
  elements.arraySize.disabled = true;
  elements.algorithm.disabled = true;
  resetStats();

  const algorithms = createAlgorithms(visualizer);
  const algo = algorithms[elements.algorithm.value];
  await algo.sort([...array]);

  elements.status.textContent = 'Sorting complete! ✓';
  isSorting = false;
  elements.startBtn.disabled = false;
  elements.generateBtn.disabled = false;
  elements.arraySize.disabled = false;
  elements.algorithm.disabled = false;
}

function reset() {
  location.reload();
}

// Visualizer object for algorithm callbacks
const visualizer = {
  comparisons: 0,
  swaps: 0,
  array,
  highlightLine,
  sleep,
  renderArray,
  updateStats,
  get comparisons() { return comparisons; },
  set comparisons(val) { comparisons = val; },
  get swaps() { return swaps; },
  set swaps(val) { swaps = val; }
};

// Event listeners
elements.algorithm.addEventListener('change', () => {
  updateAlgorithmInfo();
  displayCode();
});

elements.arraySize.addEventListener('input', (e) => {
  document.getElementById('arraySizeDisplay').textContent = e.target.value;
});

elements.speed.addEventListener('input', (e) => {
  document.getElementById('speedDisplay').textContent = e.target.value;
});

elements.generateBtn.addEventListener('click', generateArray);
elements.startBtn.addEventListener('click', startSorting);
elements.resetBtn.addEventListener('click', reset);

// Initialize
updateAlgorithmInfo();
displayCode();
generateArray();
