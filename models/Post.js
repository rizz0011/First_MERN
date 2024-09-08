const mongoose = require("mongoose");
const {v4} = require('uuid')

const postSchema = new mongoose.Schema({
        userID: {
            type: String,
            required: true,
        },
        postID: {
            type: String,
            required: true,
            unique: true,
            default: () => v4()
        },
        heading: {
            type: String,
            required: true
        },
        content: String,
        likes:{
            type: Number,
            default : 0
        }
},{timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
}})

module.exports = mongoose.model("post",postSchema)
