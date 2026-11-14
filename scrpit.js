const artifacts = [
  {
    name: "Perseverance Heat Shield",
    planet: "Mars",
    mission: "Mars 2020",
    year: "2021",
    image: "assets/perseverance-orbit.jpg",
    description:
      "Protected the rover from extreme heating during atmospheric entry.",
    status: "Identified in NASA orbital imagery",
    source:
      "https://science.nasa.gov/resource/perseverance-and-mars-2020-spacecraft-components-on-the-surface/"
  },
  {
    name: "Perseverance Parachute",
    planet: "Mars",
    mission: "Mars 2020",
    year: "2021",
    image: "assets/perseverance-debris.jpg",
    description:
      "Slowed the spacecraft during its descent through the Martian atmosphere.",
    status: "Photographed by Ingenuity",
    source:
      "https://science.nasa.gov/resource/debris-field-from-perseverance-landing-gear-seen-by-mars-helicopter/"
  },
  {
    name: "Perseverance Backshell",
    planet: "Mars",
    mission: "Mars 2020",
    year: "2021",
    image: "assets/perseverance-debris.jpg",
    description:
      "Protected the rover during its journey and atmospheric descent.",
    status: "Photographed by Ingenuity",
    source:
      "https://science.nasa.gov/resource/rovers-backshell-seen-from-the-air/"
  },
  {
    name: "Surveyor 3",
    planet: "Moon",
    mission: "Surveyor 3",
    year: "1967",
    image: "assets/surveyor-3.jpg",
    description:
      "A robotic lunar lander that studied the lunar surface. Apollo 12 astronauts later retrieved some of its parts.",
    status: "Lander remains on the Moon",
    source:
      "https://science.nasa.gov/mission/surveyor-3/"
  }
];

function displayObjects(items) {
  const grid = document.getElementById("artifact-grid");

  grid.innerHTML = items.map(item => `
    <article class="card">
      <img src="${item.image}" alt="${item.name}">
      <div class="card-content">
        <small>${item.planet} · ${item.year}</small>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><small>${item.status}</small></p>
        <a href="${item.source}" target="_blank"
           rel="noopener noreferrer">
          Read NASA evidence →
        </a>
      </div>
    </article>
  `).join("");
}

function filterObjects(planet) {
  const results = planet === "All"
    ? artifacts
    : artifacts.filter(item => item.planet === planet);

  displayObjects(results);
}

displayObjects(artifacts);

// Educational quiz
const questions = [
  {
    q: "Where did Perseverance land?",
    options: ["Moon", "Mars", "Venus"],
    answer: 1,
    explanation: "Perseverance landed in Jezero Crater on Mars."
  },
  {
    q: "What does a heat shield do?",
    options: [
      "Protects against extreme heating",
      "Produces oxygen",
      "Takes photographs"
    ],
    answer: 0,
    explanation: "A heat shield protects a spacecraft during atmospheric entry."
  },
  {
    q: "What slowed Perseverance during descent?",
    options: ["A parachute", "A balloon", "Wheels"],
    answer: 0,
    explanation: "A supersonic parachute slowed the descending spacecraft."
  },
  {
    q: "Which mission visited Surveyor 3?",
    options: ["Apollo 11", "Apollo 12", "Apollo 15"],
    answer: 1,
    explanation: "Apollo 12 astronauts visited Surveyor 3 in November 1969."
  },
  {
    q: "Were some Surveyor 3 parts returned to Earth?",
    options: ["Yes", "No"],
    answer: 0,
    explanation: "Apollo 12 astronauts retrieved its camera and other parts."
  }
];

let current = 0;
let score = 0;

function showQuestion() {
  const area = document.getElementById("quiz-area");

  if (current >= questions.length) {
    area.innerHTML = `
      <h3>Mission complete!</h3>
      <p>You scored ${score}/${questions.length}.</p>
      <button onclick="restartQuiz()">Play again</button>
    `;
    return;
  }

  const q = questions[current];

  area.innerHTML = `
    <p>Question ${current + 1} of ${questions.length}</p>
    <h3>${q.q}</h3>
    ${q.options.map((option, i) => `
      <button onclick="checkAnswer(${i})">${option}</button>
    `).join("")}
    <p id="feedback"></p>
  `;
}

function checkAnswer(index) {
  const q = questions[current];
  const feedback = document.getElementById("feedback");

  if (index === q.answer) {
    score++;
    feedback.innerHTML = "Correct! " + q.explanation;
  } else {
    feedback.innerHTML = "Not quite. " + q.explanation;
  }

  const buttons = document.querySelectorAll("#quiz-area button");
  buttons.forEach(button => button.disabled = true);

  const next = document.createElement("button");
  next.textContent = "Next question";
  next.onclick = () => {
    current++;
    showQuestion();
  };

  document.getElementById("quiz-area").appendChild(next);
}

function restartQuiz() {
  current = 0;
  score = 0;
  showQuestion();
}

showQuestion();