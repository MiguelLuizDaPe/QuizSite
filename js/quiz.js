class Question {
  body = ""
  attachment = ""
  answers = []
  correctAnswer = 0

  constructor(body, answers, correctAnswer, attachment = "") {
    this.body = body
    this.answers = answers
    this.correctAnswer = correctAnswer
    this.attachment = attachment
    console.assert((answers.length > correctAnswer) && (correctAnswer >= 0), "Invalid CorrectAnswer index")
  }

};

class Quiz {
  constructor(questions, currentQuestion = 0) {
    this.questions = questions
    this.currentQuestion = currentQuestion
  }

  addQuestion(question) {
    this.questions.push(question)
  }

  reset() {
    this.currentQuestion = 0
  }

  getCurrent(){
    return this.questions[this.currentQuestion]
  }

};

let quizResult = new Quiz([
  new Question("Qual fruta é essa?", ["Banana", "Maça", "Kiwi"], 0, "../images/banana.webp"),
  new Question("Qual famoso é esse?", ["Ivete Sangalo", "Luciano Hulk", "Orochimaro"], 2, "../images/skeleton-duck.png"),
  new Question("Quem você mais ama?", ["Sua filha", "Sua irmã", "Eu"], 1, "../images/banana.webp")
])

function displayQuestion(query, question) {
  let node = document.querySelector(query)
  let html = document.createElement("div")
  html.classList.add("quiz")
  html.id = "question"

  let img = document.createElement("img")
  img.classList.add("question-img")
  img.src = question.attachment
  html.appendChild(img)

  let questionTitle = document.createElement("span")
  questionTitle.innerText = question.body
  questionTitle.classList.add("question-body")
  html.appendChild(questionTitle)

  let answerGrid = document.createElement("div")
  answerGrid.classList.add("answer-grid")

  const chooseAnswer = (index) => {
    for (let i = 0; i < answerGrid.children.length; i++) {
      let child = answerGrid.children[i];
      if (i === index) {
        child.classList.add("answer-button-correct")
      }
      else {
        child.classList.add("answer-button-wrong")
      }
    }
  }

  for (let i = 0; i < question.answers.length; i++) {
    const answer = question.answers[i];

    let button = document.createElement("button")
    button.classList.add("answer-button")
    button.innerText = answer
    button.addEventListener("click", () => chooseAnswer(question.correctAnswer))

    answerGrid.appendChild(button)
  }

  html.appendChild(answerGrid)

  node.replaceWith(html)
}

let nextButton = document.querySelector(".button-next")

nextButton.addEventListener("click", ()=>{
  quizResult.currentQuestion = Math.min(quizResult.questions.length - 1, quizResult.currentQuestion + 1)
  displayQuestion("#question", quizResult.getCurrent())
})

let prevButton = document.querySelector(".button-prev")

prevButton.addEventListener("click", ()=>{
  quizResult.currentQuestion = Math.max(0, quizResult.currentQuestion - 1)
  displayQuestion("#question", quizResult.getCurrent())
})


const buttonBack = document.querySelector(".button-back")
buttonBack.addEventListener("click", () => {
  window.location = "/html/start.html"
})

displayQuestion("#question", quizResult.getCurrent())