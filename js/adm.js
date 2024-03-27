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


function deletionButtonListner() {
  var deleteButtons = document.querySelectorAll(".questions-list_delete-button")

  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () { //isso vai alocar memória pra caralho, um dia arrumo, talvez
      var questionLI = this.parentElement
      console.log(questionLI)

      const f = quiz.deleteQuestion(questionLI.children[1].innerText)
      console.log(f)

      questionLI.style.display = 'none';
    });
  }
}

let confirmationButton = document.querySelector(".confirmation-button")

confirmationButton.addEventListener("click", () => {
  const body = document.querySelector(".question").value
  const answer1 = document.querySelector("#answer-1").value
  const answer2 = document.querySelector("#answer-2").value
  const answer3 = document.querySelector("#answer-3").value
  const img = document.querySelector("#input-image").files[0]
  const correctanswer = document.querySelector(".correct-answer").value

  if (body === '' || answer1 === '' || answer2 === '' || answer3 === '' || correctanswer <= 0 || correctanswer >= 4 || img == null) {
    alert("Um dos campos não foi preenchido");
    return null
  }

  const reader = new FileReader()
  let imgConverted = "";
  // let question = new Question('', [], 0)


  reader.addEventListener("load", () => {
    imgConverted = reader.result;
    // console.log(correctanswer)
    let question = new Question(body, [answer1, answer2, answer3], correctanswer - 1, imgConverted)
    quiz.addQuestion(question)
    // console.log(imgConverted)
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
  //eu to fazendo merda nessa porra e eu não sei aonde
  //o li não ta sendo criado nessa merda

  var questionLI = document.createElement("li")
  var deleteButton = document.createElement("button")
  var questionBody = document.createElement("span")
  // var newQuestionUL = document.createElement("ul")
  var questionUL = document.querySelector(".questions-list")
  // var newQuestionUL = questionUL

  deleteButton.classList.add("questions-list_delete-button")
  deleteButton.innerText = "X"

  questionBody.innerText = body

  questionLI.appendChild(deleteButton)
  questionLI.appendChild(questionBody)

  // newQuestionUL.classList.add("questions-list")
  // newQuestionUL.appendChild(questionLI)
  questionUL.appendChild(questionLI)

  console.log(questionUL)

  deletionButtonListner()

  // questionUL.replaceWith(newQuestionUL)

})



// deleteButtons.forEach((button) => {
//   // console.log("porra")
//   button.addEventListener("click", function () {
//     console.log("porra")
//     var questionLI = this.parentElement

//     const f = quiz.deleteQuestion(questionLI.childNodes[3])
//     console.log(f)

//     questionLI.style.display = 'none';
//   })
// })



let exportButton = document.querySelector(".export-button")

exportButton.addEventListener("click", () => {

  const fileName = document.querySelector(".file-name").value

  if (quiz.questions.length > 0) {//é um jeito retardado,mas é oque funciona
    const strQuiz = quizJson(quiz)

    stringToDownloadableTextFile(strQuiz, fileName)

    document.querySelector(".file-name").value = ''

    quiz.questions = []

    var questionLIs = document.querySelectorAll(".questions-list li") //pra limpar a listinha 

    for (var i = 0; i < questionLIs.length; i++) {
      questionLIs[i].style.display = 'none';
    }

  }
  else {
    alert("Não ha perguntas ou o 'Nome do arquivo' não existe");
    return null
  }

})