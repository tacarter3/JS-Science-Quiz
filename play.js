// objects containing questions and question choices

let questions = [
    {question: 'What is the hardest substance in the human body?',
    choice1: 'alpha-keratin',
    choice2: 'bone',
    choice3: 'cartilage',
    choice4: 'muscle tissue',
    choice5: 'tooth enamel',
    choice6: 'erythrocytes',
    answer: 5
    },
    {question: 'How many different organ systems make up the human body?',
    choice1: 'eleven',
    choice2: 'twenty',
    choice3: 'three',
    choice4: 'seven',
    choice5: 'fifteen',
    choice6: 'one',
    answer: 1
    },
    {question: 'What is the most common element in the known universe?',
    choice1: 'carbon',
    choice2: 'plutonium',
    choice3: 'lithium',
    choice4: 'hydrogen',
    choice5: 'helium',
    choice6: 'nitrogen',
    answer: 4
    },
    {question: 'What is the largest (thickest) layer of Earth\'s atmosphere?',
    choice1: 'troposphere',
    choice2: 'asthenosphere',
    choice3: 'exosphere',
    choice4: 'stratosphere',
    choice5: 'mesosphere',
    choice6: 'ionosphere',
    answer: 3
    },
    ]
// add function that initiates quiz

getStarted = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

// add function that posts each question 

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > maxQuestions){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('score.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`
    progressBarFull.style.width = `${(questionCounter/maxQuestions)*100}%`


    const questionsRandNumber = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionsRandNumber]
    question.innerText = currentQuestion.question
    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
        })

    availableQuestions.splice(questionsRandNumber, 1)
    trueAnswers = true
}

// valiate answer choices and move to next question

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!trueAnswers) 
        return trueAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if(classToApply === 'correct') {
            incrementScore(scorePoints)
        }
        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })
})