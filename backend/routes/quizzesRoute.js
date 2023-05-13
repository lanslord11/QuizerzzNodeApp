const express = require("express");
const { createNewQuiz,getAllActiveQuizzes,getAllQuizzes,getQuizResult } = require("../controllers/quizController");
const router = express.Router();

router.route("/quizzes").post(createNewQuiz);
router.route("/quizzes/active").get(getAllActiveQuizzes);
router.route("/quizzes/all").get(getAllQuizzes);
router.route("/quizzes/:id/result").get(getQuizResult);

module.exports = router