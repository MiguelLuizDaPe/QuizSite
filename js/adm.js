import { Quiz, Question, quizJson, stringToDownloadableTextFile } from "./quiz.js";

const buttonBack = document.querySelector(".button-back")
buttonBack.addEventListener("click", () => {
  window.location = "/html/start.html"
})

let quiz = new Quiz([])

let confirmationButton = document.querySelector(".confirmation-button")
confirmationButton.addEventListener("click", () => {
  const body = document.querySelector(".question").value
  const awnser1 = document.querySelector("#answer-1").value
  const awnser2 = document.querySelector("#answer-2").value
  const awnser3 = document.querySelector("#answer-3").value
  const correctAwnser = document.querySelector(".correct-answer").value

  //tem que fazer correção de input aqui depois, NÃO ESQUECER QUE AWNSER É -1

  const question = new Question(body, [awnser1, awnser2, awnser3], correctAwnser - 1)//não vou pedir pra nego que não programa contar do zero

  quiz.addQuestion(question)
  // console.log(quiz.questions[0])

  document.querySelector(".question").value = '' //isso é só pra limpar os inputs no html
  document.querySelector("#answer-1").value = ''
  document.querySelector("#answer-2").value = ''
  document.querySelector("#answer-3").value = ''
  document.querySelector(".correct-answer").value = ''

})

let exportButton = document.querySelector(".export-button")
exportButton.addEventListener("click", () => {
  const fileName = document.querySelector(".file-name").value

  const strQuiz = quizJson(quiz)

  stringToDownloadableTextFile(strQuiz, fileName)

  document.querySelector(".file-name").value = ''

})