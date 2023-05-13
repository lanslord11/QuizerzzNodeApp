const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Please Enter Question"],
        trim: true
    },
    options: [
        {
            type:String,
            trim:true
        }

    ],
    rightAnswer: {
        type: Number,
        required: [true, "Please Enter the index of correct option"],
        validate: {
          validator: function(value) {
            return value <= this.options.length; // Ensure user age is less than or equal to product userAge
          },
          message: 'Please enter valid answer index'
        },
        select:false
        
    },
    startDate: {
        type: Date,
        required:[true,"Please Enter Start Date"]
    },
    endDate: {
        type: Date,
        required:[true,"Please Enter end Date"]
    },
    status : {
      type:String,
      default:function() {
        const now = new Date();
        if (now < this.startDate) {
          return 'inactive';
        } else if (now > this.endDate) {
          return 'finished';
        } else {
          return 'active';
        }
      }
    }
})

// quizSchema.virtual('status').get(function() {
//     const now = new Date();
//     if (now < this.startDate) {
//       return 'inactive';
//     } else if (now > this.endDate) {
//       return 'finished';
//     } else {
//       return 'active';
//     }
//   });

//   quizSchema.pre('save', function(next) {
//     this.status = this.status; // Trigger the virtual property to calculate the status
//     next();
//   });


module.exports = mongoose.model("Quiz", quizSchema);