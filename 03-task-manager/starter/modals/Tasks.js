const mongoose = require('mongoose')

//Schema definition to avoid unnecessary column addition and deletion
const TaskSchema = new mongoose.Schema({
    name: {
        //validators to validate each input values 
        type: String,
        trim: true,
        required: [true, 'Task name cannot be empty'],
        maxLength: [20, 'Task name should not exceed 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
})


//name of collection and schema definition for it in mongoDB
module.exports = mongoose.model("Tasks", TaskSchema)
