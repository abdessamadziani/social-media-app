const mongoose = require('mongoose');
// const {v1:uuid}=require('uuid')
// const Joi = require('joi')

const Schema = mongoose.Schema;   
const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 6, // Adjust as needed
      },
    
      bio: {
        type: String,
        trim: true,
      },
      avatar: {
        type: String, // You can store image URLs or file paths
        default: 'empty.png',

      },
      gender: {
        type: String,
        default: 'male',

      },
    role: {
            type: String,
            enum: ['user','admin'],
            default: 'user',
           },
    active: {
    type: Boolean,
    default: false,
    }

},{timestamps: true});




 












// function validateUser(user) {
//     const schema = Joi.object({
//         name: Joi.string().min(3).max(100).required(),
//         email: Joi.string().min(5).max(255).required().email(),
//         password: Joi.string().min(8).max(100).required()
//     })
//     return schema.validate(user)
// }



// module.exports.validate = validateUser
module.exports=mongoose.model('User',userSchema)

