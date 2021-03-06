import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';


export const getPosts = async (req,res)=>{
    try{
        const postMessages = await PostMessage.find();
        console.log(postMessages);
        res.status(200).json(postMessages);
    }catch(error){
        res.status(404).json({message:error.message});
    }
}

export const createPost = async (req,res)=>{
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
       const message = await newPost.save();
       res.status(200).send(newPost);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const updatePost = async (req, res) => {
    const { id} = req.params;
    const post = req.body

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with that id');
    } 
    const updatePost = await PostMessage.findByIdAndUpdate(id, post, {new:true});
    res.json(updatePost);

}

// get post  
export const getPost = async(req, res)=>{
    const {id} = req.params;
    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


// delete post 
export const deletePost = async (req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No post with id: ${id}`);
    }
    await PostMessage.findByIdAndDelete(id);
    res.json({message:"Post deleted successfully"});
}


// like post 
export const likePost = async (req, res) => {
    const {id} = req.params; 
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No post with id ${id}`);
    }
    const post = await PostMessage.findById(id);
    const updatePost = await PostMessage.findByIdAndUpdate(id,{likeCount: post.likeCount +1}, {new:true});
    res.json(updatePost);
}


// delete all in server 
export const deleteAll = async (req, res) => {
    const posts = await PostMessage.find();
    posts.forEach(async (post)=>{
       await PostMessage.findByIdAndDelete(post._id);
    });
    res.status(200).json({message: "deleted all"});
}
