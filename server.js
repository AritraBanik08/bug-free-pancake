const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Use environment variable for port or default to 3000

app.use(bodyParser.json()); // Parse JSON data in request body
app.set('view engine', 'ejs');

// Load quiz data from JSON file
const quizData = require('./quiz-data.json');

// Route to serve quiz questions
app.get('/quiz', (req, res) => {
  res.json(quizData);
});

app.get('/', (req, res) => {
    // res.render('index', { quizData:quizData });
    res.render('quiz')
})

// app.post('/', (req, res) => {
//     for (let i = 0; i < quizData.length; i++) {
//         console.log(req.body[i])
//     }
// })

// Route to handle submitted answers
app.post('/submit', (req, res) => {
  const { answers } = req.body; // Get submitted answers from request body
  console.log(answers)

  let score = 0;
  const feedback = [];

  quizData.forEach((question, index) => {
    console.log(answers[index])
    const userAnswer = answers[index];
    const correctAnswer = question.options[question.answer];

    if (userAnswer === correctAnswer) {
      score++;
      feedback.push({ correct: true });
    } else {
      feedback.push({ correct: false, correctAnswer: correctAnswer });
    }
  });

  res.json({ score, feedback });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
