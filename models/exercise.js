const mongoose = require("mongoose");
const { Schema } = mongoose; 

const workoutSchema = new Schema({ 
    day: { 
        type: Date, 
        default: Date.now()
    },

    exercises: [
    {
        name: { 
            type: String, 
            trim: true, 
            required: "Please enter exercise name"
        }, 
        exercise_type: { 
            type: String, 
            trim: true, 
            required: "Please enter exercise tyoe"
        }, 
        distance: { 
            type: Number,
        },
        duration: { 
            type: Number, 
            required: "Please enter exercise duration",
        },
        weight:{ 
            type: Number,
        },
        sets: { 
            type: Number,
        },
        reps: {
            type: Number,
        }
    }]

})

const Workout = mongoose.model('Workout', workoutSchema); 

module.exports = Workout;