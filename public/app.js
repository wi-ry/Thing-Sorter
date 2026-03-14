// Example custom items. Replace with your own!
const items = [
  "Item A",
  "Item B",
  "Item C",
  "Item D"
];

let battles = [];
let progress = 0;
let results = Array(items.length).fill(0);

// Generate all unique pairs for battles
function generateBattles(items) {
  const pairs = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      pairs.push([i, j]);
    }
  }
  // Shuffle pairs
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}

function startSorter() {
  battles = generateBattles(items);
  progress = 0;
  results = Array(items.length).fill(0);
  showNextBattle();
}

function showNextBattle() {
  const battleDiv = document.getElementById('battle');
  const progressDiv = document.getElementById('progress');
  battleDiv.innerHTML = '';
  if (progress >= battles.length) {
    // Sorting done
    const sorted = items.map((item, idx) => ({ item, score: results[idx] }))
      .sort((a, b) => b.score - a.score);
    battleDiv.innerHTML = '<h2>Results</h2>' +
      '<ol>' + sorted.map(r => `<li>${r.item} (${r.score} pts)</li>`).join('') + '</ol>';
    progressDiv.textContent = '100% sorted.';
    return;
  }
  const [i, j] = battles[progress];
  const row = document.createElement('div');
  row.className = 'battle-row';
  const btnA = document.createElement('button');
  btnA.className = 'battle-btn';
  btnA.textContent = items[i];
  btnA.onclick = () => { results[i]++; progress++; showNextBattle(); };
  const bothBtn = document.createElement('button');
  bothBtn.className = 'battle-btn';
  bothBtn.textContent = 'I Like Both';
  bothBtn.onclick = () => { results[i]++; results[j]++; progress++; showNextBattle(); };
  const btnB = document.createElement('button');
  btnB.className = 'battle-btn';
  btnB.textContent = items[j];
  btnB.onclick = () => { results[j]++; progress++; showNextBattle(); };
  const noOpinionBtn = document.createElement('button');
  noOpinionBtn.className = 'battle-btn';
  noOpinionBtn.textContent = 'No Opinion';
  noOpinionBtn.onclick = () => { progress++; showNextBattle(); };
  row.appendChild(btnA);
  row.appendChild(bothBtn);
  row.appendChild(btnB);
  row.appendChild(noOpinionBtn);
  battleDiv.appendChild(row);
  progressDiv.textContent = `Battle #${progress + 1} | ${Math.round(100 * progress / battles.length)}% sorted.`;
}

document.addEventListener('DOMContentLoaded', startSorter);
