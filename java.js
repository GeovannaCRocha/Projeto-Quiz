const questionText = document.getElementById('question-text');
const options = document.querySelectorAll('.option');
const submitAnswerButton = document.getElementById('submit-answer');
const message = document.getElementById('message');
const scoreElement = document.getElementById('score');

const questions = [
    {
        question: 'Que artista é famoso por suas representações coloridas da vida noturna de Paris?',
        options: ['A- Dubuffet', 'B- Manet', 'C- Mucha', 'D- Toulouse-Lautrec'],
        correctAnswer: 1,
        points: 10
    },
    {
        question: 'Em que ano se acredita que Da Vinci pintou a Mona Lisa?',
        options: ['A- 1403', 'B- 1603 ', 'C- 1703 ', 'D- 1503 '],
        correctAnswer: 3,
        points: 10
    },
    {
        question: 'Quem pintou a obra "A Última Ceia"?',
        options: ['A- Botticelli', 'B- Raphael', 'C- Leonardo da Vinci', 'D- Miguel Ângelo'],
        correctAnswer: 2,
        points: 10
    },
    {
        question: 'Qual artista pintou "O Nascimento de Vênus"?',
        options: ['A- Lippi', 'B - Botticelli', 'C - Titiano', 'D - masaccio'],
        correctAnswer: 1,
            points: 10
    },
    {
        question: 'Qual desses pintores não é italiano?',
        options: ['A- Pablo Picasso', 'B- Leonardo da Vinci', 'C- Titiano ', 'D- Caravaggio '],
        correctAnswer: 0,
        points: 10
    }, // Adicione as outras perguntas aqui...// Adicione as outras perguntas aqui...
];

let currentQuestionIndex = 0;
let chances = 2;
let score = 0;

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = `Pergunta ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    options.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctAnswer) {
        score += currentQuestion.points;
        scoreElement.textContent = `Pontuação: ${score}`;
        message.textContent = 'Resposta correta!';
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            questionText.textContent = 'Parabéns, você completou o quiz!';
            options.forEach(option => option.style.display = 'none');
            submitAnswerButton.style.display = 'none';
        }
    } else {
        chances--;

        if (chances === 0) {
            questionText.textContent = 'Você errou todas as chances. Recomece o quiz.';
            options.forEach(option => option.style.display = 'none');
            submitAnswerButton.style.display = 'none';
        } else {
            message.textContent = 'Resposta incorreta. Tente novamente.';
        }
    }
}

displayQuestion();

submitAnswerButton.addEventListener('click', () => {
    const selectedOptionIndex = Array.from(options).findIndex(option => option.classList.contains('selected'));
    if (selectedOptionIndex !== -1) {
        checkAnswer(selectedOptionIndex);
    } else {
        message.textContent = 'Selecione uma opção antes de responder.';
    }
});

options.forEach((option, index) => {
    option.addEventListener('click', () => {
        options.forEach(option => option.classList.remove('selected'));
        option.classList.add('selected');
    });
});