import { Quiz, Question, quizJson, stringToDownloadableTextFile } from "./quiz.js";

const buttonBack = document.querySelector(".button-back")
buttonBack.addEventListener("click", () => {
  window.location = "/html/start.html"
})


// function imgToBase64(file){
//   const reader = new FileReader()

//   reader.addEventListener("load", () => {
//     return ret
//   })

//   const ret = reader.readAsDataURL(file)

// }

let quiz = new Quiz([])

let confirmationButton = document.querySelector(".confirmation-button")

confirmationButton.addEventListener("click", () => {
  const body = document.querySelector(".question").value
  const answer1 = document.querySelector("#answer-1").value
  const answer2 = document.querySelector("#answer-2").value
  const answer3 = document.querySelector("#answer-3").value
  const img = document.querySelector("#input-image").files[0]
  const correctanswer = document.querySelector(".correct-answer").value

  if (body === '' || answer1 === '' || answer2 === '' || answer3 === '' || correctanswer <= 0 || correctanswer >= 4) {
    alert("Um dos campos não foi preenchido");
    return null
  }

  const reader = new FileReader()
  let imgConverted = "";
  let question = new Question('', [], 0)


  reader.addEventListener("load", () =>{
    imgConverted = reader.result;
    question = new Question(body, [answer1, answer2, answer3], correctanswer - 1, imgConverted)
    quiz.addQuestion(question)
    console.log(imgConverted)
  })

  reader.readAsDataURL(img);

  // console.log(quiz.questions[0])

  document.querySelector(".question").value = '' //isso é só pra limpar os inputs no html
  document.querySelector("#answer-1").value = ''
  document.querySelector("#answer-2").value = ''
  document.querySelector("#answer-3").value = ''
  document.querySelector("#input-image").value = ''
  document.querySelector(".correct-answer").value = ''

  //cria li(que é uma question) na ul
  

})

let exportButton = document.querySelector(".export-button")

exportButton.addEventListener("click", () => {

  const fileName = document.querySelector(".file-name").value

  if (fileName === '' || quiz.questions[0].body === '') {//é um jeito retardado,mas é oque funciona
    alert("Não ha perguntas ou o 'Nome do arquivo' não existe");
    return null
  }

  const strQuiz = quizJson(quiz)

  stringToDownloadableTextFile(strQuiz, fileName)

  document.querySelector(".file-name").value = ''

})