const Quiz = require("../models/quizModel");
// const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
// const cron = require('node-cron');



module.exports = catchAsyncErrors(async (req, res, next) => {


    // # ┌────────────── second (optional)
    // # │ ┌──────────── minute
    // # │ │ ┌────────── hour
    // # │ │ │ ┌──────── day of month
    // # │ │ │ │ ┌────── month
    // # │ │ │ │ │ ┌──── day of week
    // # │ │ │ │ │ │
    // # │ │ │ │ │ │
    // # * * * * * *
    // cron.schedule('* * * * *', async () => {
    //     try {
    //       // Update all documents where the count is less than 10
    //         const localTime=new Date();
    //         const result = await Quiz.updateMany({
    //             startDate: { $lte: localTime },
    //             endDate: { $gt: localTime },
    //             status: "inactive"
    //             }, { status:"active" });

    //         const result2 = await Quiz.updateMany({
    //             startDate: { $lte: localTime },
    //             endDate: { $gt: localTime },
    //             status: "active"
    //             }, { status:"finished" }); 
          
            

    //       console.log(`Updated ${result.nModified} documents`);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   });

    const localTime=new Date();
    const result = await Quiz.updateMany({
        startDate: { $lte: localTime },
        endDate: { $gt: localTime },
        status: "inactive"
        }, { status:"active" });
    const result2 = await Quiz.updateMany({
        endDate: { $lt: localTime }
        }, { status:"finished" });
 
    
        
        // console.log("executed cronjob");
        next();
});