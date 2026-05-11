// =====================
// STATE
// =====================
let deck = [];
let currentIndex = 0;


// =====================
// ADD CARD
// =====================
function addCard() {
  const term = document.getElementById("termInput").value.trim();
  const definition = document.getElementById("definitionInput").value.trim();

  if (!term || !definition) return;

  deck.push({
    term,
    definition,
    learned: false
  });

  document.getElementById("termInput").value = "";
  document.getElementById("definitionInput").value = "";

  document.getElementById("cardCount").innerText = deck.length;
}


// =====================
// START STUDY MODE
// =====================
function startStudyMode() {
  if (deck.length === 0) return;

  document.getElementById("buildMode").classList.add("hidden");
  document.getElementById("studyMode").classList.remove("hidden");

  shuffleDeck();
  currentIndex = 0;
  renderCard();
  updateStats();
}


// =====================
// BACK TO BUILD MODE
// =====================
function backToBuild() {
  document.getElementById("buildMode").classList.remove("hidden");
  document.getElementById("studyMode").classList.add("hidden");
}


// =====================
// RESET ALL
// =====================
function resetDeck() {
  deck = [];
  currentIndex = 0;

  document.getElementById("cardCount").innerText = 0;
  backToBuild();
  updateStats();
}


// =====================
// RENDER CARD
// =====================
function renderCard() {
  const card = deck[currentIndex];

  document.getElementById("cardTerm").innerText = card.term;
  document.getElementById("cardDefinition").innerText = card.definition;

  // reset flip every new card
  document.querySelector(".card").classList.remove("flipped");
}


// =====================
// FLIP (FIXED)
// =====================
function flipCard() {
  document.querySelector(".card").classList.toggle("flipped");
}


// =====================
// SHUFFLE
// =====================
function shuffleDeck() {
  if (deck.length === 0) return;

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  currentIndex = 0;
  renderCard();
}


// =====================
// NEXT CARD
// =====================
function nextCard() {
  currentIndex = (currentIndex + 1) % deck.length;
  renderCard();
}


// =====================
// LEARNED
// =====================
function markLearned() {
  deck[currentIndex].learned = true;
  nextCard();
  updateStats();
}


// =====================
// STILL LEARNING
// =====================
function markUnknown() {
  nextCard();
}


// =====================
// STATS
// =====================
function updateStats() {
  const total = deck.length;
  const mastered = deck.filter(c => c.learned).length;
  const remaining = total - mastered;
  const percent = total === 0 ? 0 : Math.round((mastered / total) * 100);

  document.getElementById("totalCards").innerText = total;
  document.getElementById("masteredCards").innerText = mastered;
  document.getElementById("remainingCards").innerText = remaining;
  document.getElementById("progressText").innerText = percent + "%";
}
