const mongoose = require('mongoose');
// const {v1:uuid}=require('uuid')
// const Joi = require('joi')
const {ObjectId} = mongoose.Schema;
const Schema = mongoose.Schema;   
const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      username: {
        type: String,
        required: true,
        trim: true,
        // unique:true,
        lowercase: true,
        default:'wwwsshhhhxssdxwswvw'
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
        type: String, // You can store image URLs or file path
        trim:true,
        default: 'data:image/png;base64,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',

      },
      cover: {
        type: String,
        trim:true,
        default: 'empty.png'

      },
      gender: {
        type: String,
        default: 'male'

      },
      bdate: {
        type: String,
        trim:true

      },
    role: {
            type: String,
            enum: ['user','admin'],
            default: 'user',
           },
    active: {
    type: Boolean,
    default: false,
    },
    friends: {
      type: Array,
      default: [],
      },
    followers: {
      type: Array,
      default: [],
      },
    following: {
      type: Array,
      default: [],
      },  
    requests: {
      type: Array,
      default: [],
      },  
    search: [
        {
            user: {
              type: ObjectId,
              ref: 'User'
            }, 
        },
    ],
    address: {
      type: String,
    },
    // savedPosts: [
    //   {
    //     post: {
    //       type: ObjectId,
    //       ref: 'Post'
    //     },
    //     savedAt: {
    //       type: Date,
    //       default: new Date()
    //     },
    //   },
    // ],
     
      
      
   
},{timestamps: true});



module.exports=mongoose.model('User',userSchema)

