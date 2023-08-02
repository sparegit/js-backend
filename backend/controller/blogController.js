const Blog = require("../models/blogModel")
const User = require("../models/userModel")
const asyncHandler = require('express-async-handler')
const validateMongoDbID = require('../utils/validMongoDbId')
const cloudinaryUploadImg = require("../utils/cloudinary")
const fs = require('fs')
const createBlog = asyncHandler(async(req,res)=>{
try{
    const newBlog = await Blog.create(req.body)
    res.json(newBlog)
}catch(err){
    throw new Error(err)
}})

const getABlog = asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params
        const blog = await Blog.findById(id).populate("likes").populate("dislikes")
        const updateViews = await Blog.findByIdAndUpdate(id,{
            $inc:{numViews:1},
        })
        res.json(blog)
    }catch(err){
        throw new Error(err)
    }})

    const updateBlog = asyncHandler(async(req,res)=>{
        try{
            const {id} = req.params
            const updateBlog = await Blog.findByIdAndUpdate(id,req.body,{
                new:true
            })
            res.json(updateBlog)
        }catch(err){
            throw new Error(err)
        }})

        const getAllBlog = asyncHandler(async(req,res)=>{
            try{
                const blogs = await Blog.find()
                res.json(blogs)
            }catch(err){
                throw new Error(err)
            }
        })

        const deleteBlog = asyncHandler(async(req,res)=>{
            try{
                const {id} = req.params
                const delBlog = await Blog.findByIdAndDelete(id)
                if(delBlog==null) {
                    throw new Error('no blog to delete')
                }
               
                res.json(delBlog); 
            }catch(err){
                throw new Error('no blog to delete')
            }
        })

        const likeBlog = asyncHandler(async(req,res)=>{
            
                const {blogId} = req?.body
                
                const currentlyLoggedInUserId = req?.user?._id;
                console.log('curr'+currentlyLoggedInUserId);
                const blog = await Blog.findById(blogId)
                const isLiked = blog?.isLiked

                const alreadyDisliked = blog?.dislikes?.find((userId)=>userId.toString() === currentlyLoggedInUserId?.toString())

                if(alreadyDisliked){
                    const blog = await Blog.findByIdAndUpdate(blogId,{
                        $pull:{dislikes:currentlyLoggedInUserId},
                        isDisliked:false
                    },{new:true})
                    res.json(blog);
                }
                
                if(isLiked){
                    const blog = await Blog.findByIdAndUpdate(blogId,{
                        $pull:{likes:currentlyLoggedInUserId},
                        isLiked:false
                    },{new:true})
                    res.json(blog);
                }else{
                    const blog = await Blog.findByIdAndUpdate(blogId,{
                        $push:{likes:currentlyLoggedInUserId},
                        isLiked:true
                    },{new:true})
                    res.json(blog);
                }
            
        })

        // const dislikeBlog = asyncHandler(async(req,res)=>{
        //     const {blogId}=req?.body
        //     const currentlyLoggedInUserId = req?.user?._id
        //     const blog= Blog.findById(blogId)
        //     const isDisliked = blog?.isDisliked
        //     console.log('isdisliked= '+isDisliked);
        //     const alreadyLiked = blog?.likes?.find((userId)=> userId.toString() === currentlyLoggedInUserId.toString())
        //     if(alreadyLiked){
        //         const blog = await Blog.findByIdAndUpdate(blogId,{
        //             $pull:{likes:currentlyLoggedInUserId},
        //             isLiked:false
        //         },{new:true})
        //         res.json(blog)
        //     }
        //     if(isDisliked){
        //         console.log("isdisliked");
        //         const blog = await Blog.findByIdAndUpdate(blogId,{
        //             $pull:{dislikes:currentlyLoggedInUserId},
        //             isDisliked:false
        //         },{new:true})
        //         res.json(blog)
        //     }
        //     else{
        //         const blog = await Blog.findByIdAndUpdate(blogId,{
        //             $push:{dislikes:currentlyLoggedInUserId},
        //             isDisliked:true
        //         },{new:true})
        //         res.json(blog)
        //     }
            
        // })

        const dislikeBlog = asyncHandler(async(req,res)=>{
            
            const {blogId} = req?.body
            
            const currentlyLoggedInUserId = req?.user?._id;
            console.log('curr'+currentlyLoggedInUserId);
            const blog = await Blog.findById(blogId)
            const isDisliked = blog?.isDisliked

            const alreadyLiked = blog?.likes?.find((userId)=>userId.toString() === currentlyLoggedInUserId?.toString())

            if(alreadyLiked){
                const blog = await Blog.findByIdAndUpdate(blogId,{
                    $pull:{likes:currentlyLoggedInUserId},
                    isLiked:false
                },{new:true})
                res.json(blog);
            }
            
            if(isDisliked){
                const blog = await Blog.findByIdAndUpdate(blogId,{
                    $pull:{dislikes:currentlyLoggedInUserId},
                    isDisliked:false
                },{new:true})
                res.json(blog);
            }else{
                const blog = await Blog.findByIdAndUpdate(blogId,{
                    $push:{dislikes:currentlyLoggedInUserId},
                    isDisliked:true
                },{new:true})
                res.json(blog);
            }
        
    })
    const uploadBlogImages = asyncHandler(async(req,res)=>{
        const {id} = req.params
        try {
            const uploader =(path)=> cloudinaryUploadImg(path,"images");
            const urls = [];
            const files = req.files;
            for(const file of files){
                const {path}=file
                const newpath = await uploader(path)
                urls.push(newpath)
                fs.unlinkSync(path)
                
            }
            const finalBlog = await Blog.findByIdAndUpdate(id,{
                images: urls.map((file)=>{
                    return file;
                })
            },{new:true})
            res.json(finalBlog)
        } catch (error) {
            throw new Error(error)  
        }
    })

module.exports =  {createBlog,getABlog,updateBlog,getAllBlog,deleteBlog,likeBlog,dislikeBlog,uploadBlogImages} 