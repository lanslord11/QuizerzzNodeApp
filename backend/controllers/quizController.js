const Quiz = require("../models/quizModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const NodeCache = require("node-cache");
const cache = new NodeCache();

exports.createNewQuiz = catchAsyncErrors(async (req, res, next) => {

    
    const quiz = await Quiz.create(req.body);
    res.status(201).json({
        success: true,
        quiz
    });
});

exports.getAllActiveQuizzes = catchAsyncErrors(async (req, res, next) => {

    const activeQuizzes = cache.get("activeQuizzes");
  if (activeQuizzes) {
    // if the data is cached, return it
    res.status(201).json({
        success: true,
        cached:true,
        activeQuizzes
    });
  } else {
    // if the data is not cached, retrieve it and cache it
    const localTime=new Date();
    
    const activeQuizzes = await Quiz.find({
    startDate: { $lte: localTime },
    endDate: { $gt: localTime }
    }).exec();
    
      cache.set("activeQuizzes", activeQuizzes, 60); // cache for 1 minute
      res.status(201).json({
        success: true,
        activeQuizzes
    });
   
  }

    
});

exports.getAllQuizzes = catchAsyncErrors(async (req, res, next) => {
    const quizzes = cache.get("quizzes");
  if (quizzes) {
    // if the data is cached, return it
    res.status(201).json({
        success: true,
        cached:true,
        quizzes
    });
  } else {
    // if the data is not cached, retrieve it and cache it
    const quizzes = await Quiz.find();
    
      cache.set("quizzes", quizzes, 60); // cache for 1 minute
      res.status(201).json({
        success: true,
        quizzes
    });
   
  }
    
    
    // const quizzes = await Quiz.find();

    
});

exports.getQuizResult =catchAsyncErrors(async (req, res, next) => {

    const quizz = cache.get("quizz");
  if (quizz) {
    // if the data is cached, return it
    res.status(201).json({
        success: true,
        cached:true,
        quizz
    });
  } else {
    // if the data is not cached, retrieve it and cache it
    
    
    const quizz = await Quiz.findById(req.params.id).select("rightAnswer options question");
    
      cache.set("quizz", quizz, 60); // cache for 1 minute
      res.status(201).json({
        success: true,
        quizz
    });
   
  }
    
    
    // const quizz = await Quiz.findById(req.params.id).select("rightAnswer options question");

   
});