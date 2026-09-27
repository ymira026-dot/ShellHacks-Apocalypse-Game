const story = [
  { title: "The First Night", place: "Your apartment", text: "You wake to screaming down the street. The power is out and something is pounding against your front door.", question: "What do you do?", choices: [
    { text: "Barricade the doors and wait.", result: "The pounding stops. In the kitchen, you find a flashlight and a can of beans.", gain: { food: 1, item: "Flashlight", score: 10 } },
    { text: "Escape through the back door.", result: "The alley is clear. You slip away with a bottle of water from your emergency kit.", gain: { water: 1, item: "Pocket knife", score: 15 } },
    { text: "Investigate the noise.", result: "A bloody handprint leads upstairs. You run, but something catches your arm.", effect: { health: -20, score: 8 } }
  ] },
  { title: "The Empty Supermarket", place: "Westside market", text: "The supermarket has been stripped bare. A low growl rolls through the dark aisles, but cans glint behind the counter.", question: "How far will you go for supplies?", choices: [
    { text: "Search the staff room quietly.", result: "You find a first-aid kit, food, and bottled water in a locker.", gain: { food: 3, water: 2, item: "First-aid kit", score: 18 } },
    { text: "Rush the shelves.", result: "A jar hits the floor. You escape with food, but a bite tears through your jacket.", gain: { food: 4, score: 20 }, effect: { health: -20 } },
    { text: "Leave immediately.", result: "You leave empty-handed as the glass doors shatter behind you.", effect: { score: 5 } }
  ] },
  { title: "The Roadblock", place: "Highway 9", text: "Abandoned cars choke the highway. A flare burns beside a military truck. Someone waves from behind a barricade.", question: "Do you trust the stranger?", choices: [
    { text: "Approach with your hands visible.", result: "She is a nurse, not a soldier. She gives you a map and two bottles of water.", gain: { water: 2, item: "Map", score: 22 } },
    { text: "Circle around through the woods.", result: "The woods hide a drainage ditch. You lose time, but not your life.", effect: { health: -5, score: 14 } },
    { text: "Take the truck by force.", result: "The truck is empty. The flare was a trap.", gain: { food: 1, score: 25 }, effect: { health: -25 } }
  ] },
  { title: "The Survivor", place: "A roadside motel", text: "A woman stands in a motel doorway with a child behind her. They have a safe room, but the child has a fever.", question: "What do you offer?", choices: [
    { text: "Share food and medicine.", result: "The fever breaks. The woman joins you with a flashlight and a hard-won trust.", gain: { item: "Antibiotics", score: 30 }, effect: { health: 8 } },
    { text: "Trade supplies for the room.", result: "The room is safe, but the woman leaves with only what she can carry.", gain: { food: 1, score: 16 } },
    { text: "Keep walking.", result: "You walk until the motel disappears. The silence feels heavier than your pack.", effect: { score: 4 } }
  ] },
  { title: "The Police Station", place: "Central precinct", text: "A red emergency light flickers over maps and empty desks. A radio repeats one message: safe community north of the river.", question: "What do you search for?", choices: [
    { text: "Take the radio and maps.", result: "The radio crackles with a real voice. The safe community is still transmitting.", gain: { item: "Radio", score: 25 } },
    { text: "Search the armory.", result: "You find supplies, but the noise wakes the cells below.", gain: { food: 2, score: 22 }, effect: { health: -15 } },
    { text: "Sleep until dawn.", result: "At 4 AM, the radio whispers: do not trust the river.", effect: { health: 5, score: 18 } }
  ] },
  { title: "The Horde", place: "River crossing", text: "The bridge is packed with the dead. Across the water, a lone boat rocks against its rope.", question: "How do you cross?", choices: [
    { text: "Wait for the horde to pass.", result: "Hours later, the bridge opens. You cross in the fog.", effect: { score: 28 } },
    { text: "Create a diversion.", result: "The horde turns toward the alarm. You reach the boat.", effect: { health: -10, score: 35 } },
    { text: "Swim for the boat.", result: "The current pulls you under. You reach the far bank coughing blood.", gain: { water: 1, score: 32 }, effect: { health: -30 } }
  ] },
  { title: "The Safehouse", place: "North of the river", text: "Lanterns glow behind a reinforced gate. The people inside demand proof that you are not infected.", question: "How do you earn their trust?", choices: [
    { text: "Tell the truth about your wounds.", result: "They scan you and open the gate. A door opens from the other side.", effect: { health: 10, score: 40 } },
    { text: "Offer your remaining food.", result: "The gate opens. A community doctor treats your injuries.", effect: { health: 25, score: 38 } },
    { text: "Climb the wall at night.", result: "A guard catches you. You escape, but the safehouse marks your face.", effect: { health: -20, score: 12 } }
  ] },
  { title: "The Last Choice", place: "Above the clouds", text: "The plane clears the smoke. Ahead, a green light pulses from a coastline that should be empty.", question: "What will you carry into tomorrow?", choices: [
    { text: "Trust the light and land.", result: "A safe community welcomes you. The world is wounded, but you have a place to begin again.", ending: ["A New Beginning", "You found the safe shore. Strangers become family, and the first new morning arrives."], effect: { score: 40 } },
    { text: "Fly beyond the signal.", result: "Another city glows with the same red emergency lights. The radio whispers your name.", ending: ["Beyond The Signal", "The outbreak was never contained. Your journey continues into the unknown."], effect: { score: 50 } },
    { text: "Turn back for the people below.", result: "You turn into the storm. The others live because someone chose to return.", ending: ["The Last Stand", "Your final transmission becomes a promise that someone will answer."], effect: { score: 60 } }
  ] }
];

const player = { health: 100, hunger: 100, thirst: 100, score: 0, index: 0, food: 2, water: 2, items: [] };
const $ = (id) => document.getElementById(id);

function startGame() {
  player.health = 100; player.hunger = 100; player.thirst = 100; player.score = 0; player.index = 0; player.food = 2; player.water = 2; player.items = [];
  $("intro").hidden = true; $("ending").hidden = true; $("story").hidden = false; $("stats").hidden = false;
  showScenario();
}

function showScenario() {
  const scene = story[player.index];
  $("progress").textContent = `Scenario ${player.index + 1} / ${story.length} - ${scene.place}`;
  $("title").textContent = scene.title; $("description").textContent = scene.text; $("question").textContent = scene.question;
  $("result").hidden = true; $("choices").innerHTML = "";
  scene.choices.forEach((choice, index) => {
    $("choices").insertAdjacentHTML("beforeend", `<button class="choice" type="button" onclick="choose(${index})">${choice.text}</button>`);
  });
  updateDisplay();
}

function choose(choiceIndex) {
  const choice = story[player.index].choices[choiceIndex];
  if (!choice) return;
  const outcome = adaptiveOutcome(choice);
  applyEffect(outcome.effect); collect(outcome.gain);
  player.hunger = Math.max(0, player.hunger - 12); player.thirst = Math.max(0, player.thirst - 16);
  $("choices").innerHTML = ""; $("result-text").textContent = `${outcome.result} ${describeChanges(outcome)}`; $("result").hidden = false; updateDisplay();
  $("result").dataset.next = outcome.ending ? "ending" : "next"; $("result").dataset.endingTitle = outcome.ending ? outcome.ending[0] : ""; $("result").dataset.endingCopy = outcome.ending ? outcome.ending[1] : "";
  if (player.health <= 0 || player.hunger <= 0 || player.thirst <= 0) { $("result-text").textContent += " You cannot continue."; $("result").dataset.next = "dead"; }
}

function nextScenario() {
  if ($("result").dataset.next === "dead") return showEnding("You Did Not Survive", "The outbreak takes another survivor. Your story ends here.");
  if ($("result").dataset.next === "ending") return showEnding($("result").dataset.endingTitle, $("result").dataset.endingCopy);
  player.index += 1; showScenario();
}

function applyEffect(effect) { player.health = Math.max(0, Math.min(100, player.health + (effect.health || 0))); player.score += effect.score || 0; }
function collect(gain) { player.food += gain.food || 0; player.water += gain.water || 0; player.score += gain.score || 0; if (gain.item && !player.items.includes(gain.item)) player.items.push(gain.item); }
function adaptiveOutcome(choice) {
  const healthLoss = choice.effect && choice.effect.health < 0;
  const outcome = { ...choice, effect: { ...(choice.effect || {}) }, gain: { ...(choice.gain || {}) } };
  const branches = healthLoss ? [
    { text: "The plan works, but the cost is worse than expected.", effect: { health: -10 } },
    { text: "You get away by seconds. A stranger's warning prevents the worst of it.", effect: { health: 5 }, gain: { water: 1 } },
    { text: "The danger breaks your momentum, and something follows you into the next street.", effect: { health: -5 }, gain: { food: 1 } },
    { text: "A small detail changes everything. You survive, and find something useful in the confusion.", effect: { score: 10 }, gain: { item: "Lucky charm" } }
  ] : [
    { text: "For one night, preparation beats panic.", effect: { score: 5 } },
    { text: "Luck opens a narrow door, and you are quick enough to use it.", effect: { health: 5 }, gain: { food: 1 } },
    { text: "The survivors you pass leave you a little more than they took.", effect: { score: 10 }, gain: { water: 1 } },
    { text: "The choice changes the shape of the night in your favor.", effect: { health: -5 }, gain: { item: "Unmarked key" } }
  ];
  const branch = branches[Math.floor(Math.random() * branches.length)];
  outcome.result = `${choice.result} ${branch.text}`;
  outcome.effect.health = (outcome.effect.health || 0) + (branch.effect.health || 0);
  outcome.effect.score = (outcome.effect.score || 0) + (branch.effect.score || 0);
  outcome.gain.food = (outcome.gain.food || 0) + (branch.gain?.food || 0);
  outcome.gain.water = (outcome.gain.water || 0) + (branch.gain?.water || 0);
  if (branch.gain?.item && !outcome.gain.item) outcome.gain.item = branch.gain.item;
  return outcome;
}

function describeChanges(choice) {
  const changes = [];
  const effect = choice.effect || {};
  const gain = choice.gain || {};
  if (effect.health) changes.push(`Health ${effect.health > 0 ? "+" : ""}${effect.health}`);
  if (gain.food) changes.push(`Food +${gain.food}`);
  if (gain.water) changes.push(`Water +${gain.water}`);
  if (gain.item) changes.push(`Found: ${gain.item}`);
  if (effect.score) changes.push(`Score +${effect.score}`);
  changes.push("Hunger -12", "Thirst -16");
  return changes.length ? `(${changes.join(" | ")})` : "";
}
function eatFood() { if (player.food < 1 || player.hunger >= 100) return; player.food--; player.hunger = Math.min(100, player.hunger + 35); updateDisplay(); }
function drinkWater() { if (player.water < 1 || player.thirst >= 100) return; player.water--; player.thirst = Math.min(100, player.thirst + 40); updateDisplay(); }
function updateDisplay() { $("health").textContent = player.health; $("hunger").textContent = player.hunger; $("thirst").textContent = player.thirst; $("score").textContent = player.score; $("food").textContent = player.food; $("water").textContent = player.water; $("inventory-count").textContent = `Food ${player.food} / Water ${player.water}`; $("items").innerHTML = player.items.length ? player.items.map((item) => `<span>${item}</span>`).join("") : "<span>No special items</span>"; $("eat").disabled = player.food < 1 || player.hunger >= 100; $("drink").disabled = player.water < 1 || player.thirst >= 100; }
function showEnding(title, copy) { $("story").hidden = true; $("stats").hidden = true; $("ending").hidden = false; $("ending-label").textContent = title === "You Did Not Survive" ? "Survival failed" : "Transmission complete"; $("ending-title").textContent = title; $("ending-copy").textContent = copy; $("final-stats").innerHTML = `<div><small>Health</small><b>${player.health}</b></div><div><small>Hunger</small><b>${player.hunger}</b></div><div><small>Thirst</small><b>${player.thirst}</b></div><div><small>Score</small><b>${player.score}</b></div>`; }
function restartGame() { $("ending").hidden = true; $("story").hidden = true; $("stats").hidden = true; $("intro").hidden = false; }

// Explicit window exports keep inline buttons working in every static hosting environment.
window.startGame = startGame;
window.choose = choose;
window.nextScenario = nextScenario;
window.eatFood = eatFood;
window.drinkWater = drinkWater;
window.restartGame = restartGame;
