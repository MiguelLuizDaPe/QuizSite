export class Question {
  body = ""
  attachment = ""
  answers = []
  correctAnswer = 0

  constructor(body, answers, correctAnswer, attachment = "") {
    this.body = body
    this.answers = answers
    this.correctAnswer = correctAnswer
    this.attachment = attachment
    // console.log(correctAnswer)
    console.assert((answers.length > correctAnswer) && (correctAnswer >= 0), "Invalid CorrectAnswer index")
  }

};

export class Quiz {
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

  static fromJSON(str){//PRO ADM
    let obj = JSON.parse(str)
    let quiz = new Quiz([])
    quiz.currentQuestion = obj.currentQuestion
    for (let i = 0; i < obj.questions.length; i++) {
      const e = obj.questions[i];
      const question = new Question(e.body, e.answers, e.correctAnswer, e.attachment)
      quiz.addQuestion(question)
    }
    return quiz
  }

};

export function stringToDownloadableTextFile(str, fileName) {
  const file = new File([str], `${fileName}.json`, {
    type: 'text/plain',
  })
  const link = document.createElement('a')
  const url = URL.createObjectURL(file)

  link.href = url
  link.download = file.name
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export function quizJson(quiz){//PRO ADM
  return JSON.stringify(quiz)
}