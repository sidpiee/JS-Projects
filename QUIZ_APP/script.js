document.addEventListener("DOMContentLoaded", function () {
  let startbtn = document.getElementById("start-btn");
  let questionbox = document.getElementById("question-box");
  let question_display = document.getElementById("question-display");
  let options = document.getElementById("options");
  let nextbtn = document.getElementById("next-btn");
  let finalscore = document.getElementById("finalscore");
  let resultbox = document.getElementById("result-box");
  let restartbtn = document.getElementById("restart-btn");
  let questions = [
    {
      question: "Who is the president of india?",
      choices: [
        "tom cruse",
        "dropati murmur",
        "rahul gandhi",
        "all of the above",
      ],
      answer: "dropati murmur",
    },
    {
      question: "Largest animal on earth?",
      choices: ["elephant", "blue whale", "giraffe", "great white shark"],
      answer: "blue whale",
    },
    {
      question: "First planet from the sun?",
      choices: ["mercury", "venus", "earth", "mars"],
      answer: "mercury",
    },
  ];
  let score = 0;
  let currentquestionindex = 0;
  startbtn.addEventListener("click", startquiz);
  function startquiz() {
    startbtn.classList.add("hidden");
    questionbox.classList.remove("hidden");
    showquestion();
  }
  function showquestion() {
    question_display.textContent = `${questions[currentquestionindex].question}`;
    options.innerHTML = "";
    questions[currentquestionindex].choices.forEach((element) => {
      let li = document.createElement("li");
      li.className =
        "option-list cursor-pointer m-6 w-80 bg-linear-to-r flex pl-4 from-blue-800 to-violet-800 rounded-md text-white border-white/80 border shadow-lg  hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-shadow duration-300 p-3 text-xl";
      li.textContent = `${element}`;
      options.appendChild(li);
      li.addEventListener("click", () => selectanswer(element));
    });
  }
  function selectanswer(choice) {
    nextbtn.classList.remove("hidden");
    let option_list = document.querySelectorAll(".option-list");
    option_list.forEach((element) => {
      element.style.pointerEvents = "none";
      if (element.textContent === questions[currentquestionindex].answer) {
        element.classList.remove(
          "bg-linear-to-r",
          "from-blue-800",
          "to-violet-800"
        );
        element.classList.add(
          "bg-linear-to-r",
          "from-green-400",
          "to-green-900"
        );
      } else {
        element.classList.remove(
          "bg-linear-to-r",
          "from-blue-800",
          "to-violet-800"
        );
        element.classList.add("bg-linear-to-r", "from-red-400", "to-red-900");
      }
    });
    if (choice === questions[currentquestionindex].answer) {
      score++;
    }
  }
  nextbtn.addEventListener("click", function () {
    nextbtn.classList.add("hidden");
    currentquestionindex++;
    if (currentquestionindex === questions.length) {
      resultbox.classList.remove("hidden");
      questionbox.classList.add("hidden");
      finalscore.innerHTML = `Your score : ${score}/${questions.length}`;
    } else {
      showquestion();
    }
  });
  restartbtn.addEventListener("click", function () {
    currentquestionindex = 0;
    score = 0;
    resultbox.classList.add("hidden");
    startquiz();
  });
});
