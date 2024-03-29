const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const PostSchema = new mongoose.Schema({
         
        userId:{
            type:ObjectId,
            ref: 'User'
              },
          title:{
                    type:String,
          },
          image:{
                    type:String,
          },
          video:{
                    type:String,
          },
          like:{
                    type:Array,
          },
          dislike:{
                    type:Array,
          },
          comments:[
                    {
                              userId:{
                                        type:ObjectId,
                                        ref: 'User'
                              },
                              username:{
                                        type:String,
                                        required:true
                              },
                              profileImage:{
                                        type:String
                              },
                              comment:{
                                        type:String,
                                        required:true
                              }
                    }
          ]
})

module.exports = mongoose.model("Post" , PostSchema);