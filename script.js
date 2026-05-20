const welcomePage = document.getElementById("welcomePage");
const homePage = document.getElementById("homePage");

const enterBtn = document.getElementById("enterBtn");

const createSection = document.getElementById("createSection");
const quizSection = document.getElementById("quizSection");
const placeholderSection = document.getElementById("placeholderSection");

const createTab = document.getElementById("createTab");
const quizTab = document.getElementById("quizTab");

const generateQuestionsBtn = document.getElementById("generateQuestions");

const questionContainer = document.getElementById("questionsContainer");

const quizList = document.getElementById("quizList");

let quizzes = [];


/* ENTER APPLICATION */

if (enterBtn) {
  enterBtn.addEventListener("click", () => {
    window.location.href = "home.html";
  });
}


/* NAVIGATION */

if (createTab && quizTab && createSection && quizSection) {
  createTab.addEventListener("click", () => {
    createSection.classList.remove("hidden");
    quizSection.classList.add("hidden");
    if (placeholderSection) {
      placeholderSection.classList.add("hidden");
    }
  });

  quizTab.addEventListener("click", () => {
    createSection.classList.add("hidden");
    quizSection.classList.remove("hidden");
    if (placeholderSection) {
      placeholderSection.classList.add("hidden");
    }

    showQuizzes();
  });
}


/* GENERATE QUESTIONS */

if (generateQuestionsBtn && questionContainer) {
  generateQuestionsBtn.addEventListener("click", () => {

  questionContainer.innerHTML = "";

  const count = document.getElementById("questionCount").value;

  for(let i=1;i<=count;i++){

    const box = document.createElement("div");

    box.classList.add("question-box");

    box.innerHTML = `
      <h3>Question ${i}</h3>

      <input type="text" class="questionText" placeholder="Enter Question">

      <select class="questionType">
        <option value="single">Single Choice</option>
      </select>

      <div class="option">
        <input type="text" class="option1" placeholder="Option 1">
      </div>

      <div class="option">
        <input type="text" class="option2" placeholder="Option 2">
      </div>

      <div class="option">
        <input type="text" class="option3" placeholder="Option 3">
      </div>

      <div class="option">
        <input type="text" class="option4" placeholder="Option 4">
      </div>

      <input type="number" class="correctAnswer" min="1" max="4"
      placeholder="Correct Option Number (1-4)">
    `;

    questionContainer.appendChild(box);
  }

  const saveBtn = document.createElement("button");

  saveBtn.innerText = "Save Quiz";

  saveBtn.classList.add("primary-btn");

  saveBtn.onclick = saveQuiz;

  questionContainer.appendChild(saveBtn);

  });
}


/* SAVE QUIZ */

function saveQuiz(){

  if (!document.getElementById("quizTitle")) {
    return;
  }

  const title = document.getElementById("quizTitle").value;

  const questionBoxes = document.querySelectorAll(".question-box");

  const quiz = {
    title,
    questions: []
  };

  questionBoxes.forEach(box => {

    const question = {
      text: box.querySelector(".questionText").value,
      options: [
        box.querySelector(".option1").value,
        box.querySelector(".option2").value,
        box.querySelector(".option3").value,
        box.querySelector(".option4").value
      ],
      correct:
      parseInt(box.querySelector(".correctAnswer").value)
    };

    quiz.questions.push(question);

  });

  quizzes.push(quiz);

  alert("Quiz Saved Successfully!");

  document.getElementById("quizTitle").value = "";
  document.getElementById("questionCount").value = "";

  questionContainer.innerHTML = "";

}


/* SHOW QUIZZES */

function showQuizzes(){

  if (!quizList) {
    return;
  }

  quizList.innerHTML = "";

  quizzes.forEach((quiz,index) => {

    const div = document.createElement("div");

    div.classList.add("quiz-item");

    div.innerHTML = `
      <h3>${quiz.title}</h3>
      <p>${quiz.questions.length} Questions</p>

      <button onclick="playQuiz(${index})">
        Start Quiz
      </button>
    `;

    quizList.appendChild(div);

  });

}


/* PLAY QUIZ */

function playQuiz(index){

  const quiz = quizzes[index];

  quizList.innerHTML = "";

  let score = 0;

  const wrapper = document.createElement("div");

  wrapper.classList.add("quiz-play");

  wrapper.innerHTML = `<h2>${quiz.title}</h2>`;

  quiz.questions.forEach((q,qIndex) => {

    const qDiv = document.createElement("div");

    qDiv.classList.add("question-box");

    qDiv.innerHTML = `
      <h3>${qIndex+1}. ${q.text}</h3>
    `;

    q.options.forEach((opt,optIndex) => {

      const btn = document.createElement("button");

      btn.classList.add("answer-btn");

      btn.innerText = opt;

      btn.onclick = () => {

        const allBtns = qDiv.querySelectorAll(".answer-btn");

        allBtns.forEach(b => b.disabled = true);

        if(optIndex + 1 === q.correct){

          btn.classList.add("correct");

          score++;

        }else{

          btn.classList.add("wrong");

          allBtns[q.correct - 1].classList.add("correct");

        }

      };

      qDiv.appendChild(btn);

    });

    wrapper.appendChild(qDiv);

  });

  const submitBtn = document.createElement("button");

  submitBtn.innerText = "Submit Quiz";

  submitBtn.classList.add("primary-btn");

  submitBtn.onclick = () => {

    const total = quiz.questions.length;

    const percent = (score/total)*100;

    const scoreBox = document.createElement("div");

    scoreBox.classList.add("score-box");

    if(percent >= 50){

      scoreBox.classList.add("good-score");

    }else{

      scoreBox.classList.add("bad-score");

    }

    scoreBox.innerHTML = `
      Your Score: ${score}/${total} <br>
      ${percent}%
    `;

    wrapper.appendChild(scoreBox);

    submitBtn.disabled = true;

  };

  wrapper.appendChild(submitBtn);

  quizList.appendChild(wrapper);

}
