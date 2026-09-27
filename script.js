// All story content lives here, so new scenarios and choices are easy to add.
const scenarios = [
  {
    title: "The First Night",
    location: "Your apartment",
    description: "You wake to screaming somewhere down the street. The power is out, your phone has no signal, and something is pounding against the front door.",
    question: "What do you do?",
    choices: [
      { text: "Barricade the doors and stay inside.", consequence: "You drag the sofa across the door and wait in the dark. The pounding stops. For now.", effects: { supplies: 1, score: 10 }, next: 1 },
      { text: "Grab your supplies and escape through the back door.", consequence: "The alley is clear. You slip away before the street notices you are gone.", effects: { supplies: -1, score: 15 }, next: 1 },
      { text: "Investigate the noise.", consequence: "The hallway is empty, but a bloody handprint leads upstairs. You run before whatever made it returns.", effects: { health: -15, score: 8 }, next: 1 },
      { text: "Try to help the people outside.", consequence: "The people outside are not people anymore. You barely make it back inside.", effects: { health: -25, score: 12 }, next: 1 }
    ]
  },
  {
    title: "The Empty Supermarket",
    location: "Westside market",
    description: "By morning, the supermarket has been stripped bare. A few cans glint behind the service counter, but a low growl rolls through the aisles.",
    question: "How far will you go for supplies?",
    choices: [
      { text: "Search the staff room quietly.", consequence: "You find bottled water and a first-aid kit in a locker. The quiet way works.", effects: { supplies: 3, health: 5, score: 12 }, next: 2 },
      { text: "Rush the shelves and take whatever you can carry.", consequence: "A jar hits the floor. You flee with food, but something bites through your jacket.", effects: { supplies: 4, health: -20, score: 18 }, next: 2 },
      { text: "Leave before the growling gets closer.", consequence: "You leave empty-handed and hear the glass doors shatter behind you.", effects: { supplies: -1, score: 5 }, next: 2 }
    ]
  },
  {
    title: "The Roadblock",
    location: "Highway 9",
    description: "A line of abandoned cars chokes the highway. A flare burns beside a military truck. Someone waves from behind a barricade, but you cannot see their face.",
    question: "Do you trust the roadblock?",
    choices: [
      { text: "Approach with your hands visible.", consequence: "The stranger is a frightened nurse, not a soldier. She gives you a map and points toward a safe route.", effects: { supplies: 1, score: 20 }, next: 3 },
      { text: "Circle around through the woods.", consequence: "The woods hide a drainage ditch. You lose time, but not your life.", effects: { health: -5, score: 14 }, next: 3 },
      { text: "Take the military truck by force.", consequence: "The truck is empty. The flare was a trap, and you escape only after a brutal sprint.", effects: { supplies: 2, health: -30, score: 25 }, next: 3 }
    ]
  },
  {
    title: "The Survivor",
    location: "A roadside motel",
    description: "A woman steps from a motel room with a kitchen knife and a little boy behind her. They have food, but the boy has a fever and she is out of medicine.",
    question: "What do you offer?",
    choices: [
      { text: "Share your medicine and food.", consequence: "The boy's fever breaks by sunset. The woman joins you, carrying a flashlight and a hard-won trust.", effects: { supplies: -2, health: 8, score: 30 }, next: 4 },
      { text: "Trade supplies for the motel room.", consequence: "The room is safe, but the woman leaves with only what she can carry. Her eyes stay with you.", effects: { supplies: -1, score: 16 }, next: 4 },
      { text: "Keep walking. You cannot save everyone.", consequence: "You walk until the motel disappears behind you. The silence feels heavier than your pack.", effects: { score: 4 }, next: 4 }
    ]
  },
  {
    title: "The Abandoned Police Station",
    location: "Central precinct",
    description: "The police station is dark except for a red emergency light. Maps cover the walls, and a radio repeats one message: safe community, north of the river.",
    question: "What do you search for?",
    choices: [
      { text: "Take the station's radio and maps.", consequence: "The radio crackles with a real voice. The safe community is still transmitting.", effects: { supplies: 1, score: 25 }, next: 5 },
      { text: "Search the armory.", consequence: "You find ammunition and a locked medical cabinet, but the noise wakes the cells below.", effects: { supplies: 3, health: -15, score: 22 }, next: 5 },
      { text: "Use the station as a shelter until dawn.", consequence: "You sleep in shifts. At 4:00 AM, the radio whispers a second message: do not trust the river.", effects: { health: 5, score: 18 }, next: 5 }
    ]
  },
  {
    title: "The Horde",
    location: "River crossing",
    description: "The river bridge is packed with the dead. They move like one dark tide, drawn by a distant alarm. Across the water, a lone boat rocks against its rope.",
    question: "How do you cross?",
    choices: [
      { text: "Wait for the horde to pass.", consequence: "Hours later, the bridge opens. You cross on shaking legs as the last infected vanishes into the fog.", effects: { supplies: -1, score: 28 }, next: 6 },
      { text: "Create a diversion with the car alarm.", consequence: "The horde turns. You reach the boat, but the alarm's echo follows you into the night.", effects: { health: -10, score: 35 }, next: 6 },
      { text: "Swim for the boat.", consequence: "The current pulls you under. You reach the far bank coughing blood, but you reach it.", effects: { health: -35, supplies: 1, score: 32 }, next: 6 }
    ]
  },
  {
    title: "The Safehouse",
    location: "North of the river",
    description: "Lanterns glow behind a reinforced gate. The people inside have clean water and beds, but they will only open the gate for someone who can prove the infection has not reached them.",
    question: "How do you earn their trust?",
    choices: [
      { text: "Show your wounds and tell the truth.", consequence: "They scan you, find no infection, and let you in. For the first time, a door opens from the other side.", effects: { health: 10, score: 40 }, next: 7 },
      { text: "Offer your remaining supplies.", consequence: "The gate opens for your food. It is a steep price, but the community has a doctor.", effects: { supplies: -3, health: 25, score: 38 }, next: 7 },
      { text: "Climb the wall after dark.", consequence: "A guard catches you and raises the alarm. You escape, but the safehouse marks your face.", effects: { health: -20, score: 12 }, next: 7 }
    ]
  },
  {
    title: "The Radio Signal",
    location: "The safehouse attic",
    description: "The radio comes alive with a voice from beyond the city. It says evacuation is possible at the old airport, but a second voice interrupts: the signal is bait.",
    question: "Which voice do you believe?",
    choices: [
      { text: "Follow the evacuation signal.", consequence: "You choose the open road. The airport may be a trap, but staying means waiting for the walls to fail.", effects: { supplies: -1, score: 35 }, next: 8 },
      { text: "Stay and help fortify the community.", consequence: "The gates hold through another night. The community names you one of its own.", effects: { health: 10, supplies: -1, score: 45 }, next: 8 },
      { text: "Trace the second voice.", consequence: "The second voice is a survivor broadcasting from the airport control tower. They know the truth.", effects: { supplies: 1, score: 50 }, next: 8 }
    ]
  },
  {
    title: "The Final Escape",
    location: "The old airport",
    description: "Smoke boils over the runway. A battered transport plane waits with one engine turning, while infected figures spill through the terminal doors.",
    question: "What is your last move?",
    choices: [
      { text: "Run for the plane.", consequence: "You sprint through the smoke as the plane lifts. The city shrinks below you, burning and silent.", effects: { health: -15, score: 60 }, next: 9 },
      { text: "Hold the terminal doors for the others.", consequence: "You buy the survivors enough time to board. When the doors finally break, the plane is already gone.", effects: { health: -45, score: 75 }, next: 9 },
      { text: "Search the control tower for answers.", consequence: "The tower log reveals the outbreak was reported weeks before the first bite. Someone knew.", effects: { health: -25, score: 70 }, next: 9 }
    ]
  },
  {
    title: "The Last Choice",
    location: "Above the clouds",
    description: "The plane clears the smoke. Below, the city is a constellation of fires. Ahead, a green light pulses from a coastline that should be empty.",
    question: "What will you carry into tomorrow?",
    choices: [
      { text: "Trust the light and land.", consequence: "A safe community welcomes the plane. The world is wounded, but you have found a place to begin again.", effects: { score: 30 }, ending: "community" },
      { text: "Keep flying beyond the signal.", consequence: "You leave the continent behind. On the horizon, another city glows with the same red emergency lights.", effects: { score: 45 }, ending: "mystery" },
      { text: "Turn back for the people below.", consequence: "The plane turns toward the smoke. There are still voices on the radio, and someone has to answer.", effects: { score: 55 }, ending: "sacrifice" }
    ]
  }
];

const state = { health: 100, supplies: 5, score: 0, scenarioIndex: 0 };
const elements = {
  intro: document.getElementById("intro-view"),
  scenario: document.getElementById("scenario-view"),
  ending: document.getElementById("ending-view"),
  status: document.getElementById("status-bar"),
  title: document.getElementById("scenario-title"),
  description: document.getElementById("scenario-description"),
  question: document.getElementById("scenario-question"),
  choices: document.getElementById("choices"),
  consequence: document.getElementById("consequence"),
  consequenceText: document.getElementById("consequence-text"),
  count: document.getElementById("scenario-count"),
  location: document.getElementById("scenario-location"),
  health: document.getElementById("health-value"),
  supplies: document.getElementById("supplies-value"),
  score: document.getElementById("score-value"),
  endingKicker: document.getElementById("ending-kicker"),
  endingTitle: document.getElementById("ending-title"),
  endingDescription: document.getElementById("ending-description"),
  finalStats: document.getElementById("final-stats")
};

// Begin a fresh run and show the first scenario.
function startGame() {
  state.health = 100;
  state.supplies = 5;
  state.score = 0;
  state.scenarioIndex = 0;
  elements.intro.hidden = true;
  elements.ending.hidden = true;
  elements.scenario.hidden = false;
  elements.status.hidden = false;
  displayScenario();
}

// Fill the game screen from the current scenario in the data above.
function displayScenario() {
  const currentScenario = scenarios[state.scenarioIndex];
  elements.count.textContent = `Scenario ${String(state.scenarioIndex + 1).padStart(2, "0")} / ${scenarios.length}`;
  elements.location.textContent = currentScenario.location;
  elements.title.textContent = currentScenario.title;
  elements.description.textContent = currentScenario.description;
  elements.question.textContent = currentScenario.question;
  elements.choices.innerHTML = "";
  elements.consequence.hidden = true;
  currentScenario.choices.forEach((choice, choiceIndex) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = choice.text;
    button.addEventListener("click", () => handleChoice(choice, choiceIndex));
    elements.choices.appendChild(button);
  });
  updateStats();
}

// Apply a choice, show its consequence, and wait for the player to continue.
function handleChoice(choice) {
  updateStats(choice.effects);
  [...elements.choices.children].forEach((button) => { button.disabled = true; });
  elements.consequenceText.textContent = choice.consequence;
  elements.consequence.hidden = false;
  elements.consequence.dataset.next = choice.next ?? "";
  elements.consequence.dataset.ending = choice.ending ?? "";
  if (state.health <= 0) {
    elements.consequenceText.textContent += " Your strength leaves you before you can go any further.";
    elements.consequence.dataset.next = "dead";
  }
}

// Change only the stats supplied by a choice and keep values readable.
function updateStats(effects = {}) {
  state.health += effects.health || 0;
  state.supplies += effects.supplies || 0;
  state.score += effects.score || 0;
  state.health = Math.max(0, state.health);
  state.supplies = Math.max(0, state.supplies);
  elements.health.textContent = state.health;
  elements.supplies.textContent = state.supplies;
  elements.score.textContent = state.score;
}

function continueStory() {
  const next = elements.consequence.dataset.next;
  const ending = elements.consequence.dataset.ending;
  if (next === "dead") {
    displayEnding("dead");
  } else if (ending) {
    displayEnding(ending);
  } else {
    state.scenarioIndex = Number(next);
    displayScenario();
  }
}

// Show an ending based on the player's final decision or health.
function displayEnding(type) {
  const endings = {
    dead: { kicker: "Survival failed", title: "The City Takes You", description: "Your story ends beneath the noise of the outbreak. Somewhere, another survivor hears the same pounding at the door." },
    community: { kicker: "Ending / A New Beginning", title: "The Safe Shore", description: "The green light belongs to a coastal settlement. You step onto solid ground with strangers who might become family." },
    mystery: { kicker: "Ending / Unknown Transmission", title: "Beyond The Signal", description: "The next city is not dark. It is waiting. As the plane descends, the radio begins to whisper your name." },
    sacrifice: { kicker: "Ending / The Last Stand", title: "The Voice That Answered", description: "You turn back into the storm. The others live because you chose to return, and your final transmission becomes a promise." }
  };
  const ending = endings[type];
  elements.scenario.hidden = true;
  elements.status.hidden = true;
  elements.ending.hidden = false;
  elements.endingKicker.textContent = ending.kicker;
  elements.endingTitle.textContent = ending.title;
  elements.endingDescription.textContent = ending.description;
  elements.finalStats.innerHTML = `<div class="stat"><span>Final health</span><strong>${state.health}</strong></div><div class="stat"><span>Supplies</span><strong>${state.supplies}</strong></div><div class="stat"><span>Score</span><strong>${state.score}</strong></div>`;
}

// Return to the opening screen without reloading the page.
function restartGame() {
  elements.ending.hidden = true;
  elements.status.hidden = true;
  elements.scenario.hidden = true;
  elements.intro.hidden = false;
}

document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("continue-button").addEventListener("click", continueStory);
document.getElementById("restart-button").addEventListener("click", restartGame);
