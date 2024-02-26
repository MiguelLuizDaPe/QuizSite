import { Quiz, Question } from "./quiz.js";

let quiz = new Quiz([])//esse é pra ser o novo começo

function displayQuestion(query, question) {
  console.log("PINTOOOO")
  let node = document.querySelector(query)
  let html = document.createElement("div")
  html.classList.add("quiz")
  html.id = "question"

  let img = document.createElement("img")
  img.classList.add("question-img")
  img.src = question.attachment
  html.appendChild(img)

  console.log("PINTOOOO")


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

nextButton.addEventListener("click", () => {
  quiz.currentQuestion = Math.min(quiz.questions.length - 1, quiz.currentQuestion + 1)
  displayQuestion("#question", quiz.getCurrent())
})

let prevButton = document.querySelector(".button-prev")

prevButton.addEventListener("click", () => {
  quiz.currentQuestion = Math.max(0, quiz.currentQuestion - 1)
  displayQuestion("#question", quiz.getCurrent())
})


const buttonBack = document.querySelector(".button-back")
buttonBack.addEventListener("click", () => {
  window.location = "/html/start.html"
})

let startButton = document.querySelector(".button-file")

startButton.addEventListener("click", () => {

  getFileContents("#input-file").then((fileJSON) => {
    quiz = Quiz.fromJSON(fileJSON)
    // console.table(quiz)

    // document.querySelector(".quiz").style.display = "flex";
    document.querySelector(".container_button-navegation").style.display = "flex";
    document.querySelector(".import-container").style.display = "none";

    displayQuestion('.quiz', quiz.getCurrent())
  })

})

async function getFileContents(selector) {
  const fileJSON = document.querySelector(selector)

  const data = await fileJSON.files[0].text()

  return data

  // console.log(fileJSON.files[0])
  // console.log(data)

}


// let quiz = new Quiz([
//   new Question("Qual fruta é essa?", ["Banana", "Maça", "Kiwi"], 0, "../images/banana.webp"),
//   new Question("Qual famoso é esse?", ["Ivete Sangalo", "Luciano Hulk", "Orochimaro"], 2, "../images/skeleton-duck.png"),
//   new Question("Quem você mais ama?", ["Sua filha", "Sua irmã", "Eu"], 1, "../images/banana.webp")
// ])

// displayQuestion("#question", quiz.getCurrent()) // o que começa começa aqui


// console.log(quizJson(quiz))

// stringToDownloadableTextFile(quizJson(quiz))
