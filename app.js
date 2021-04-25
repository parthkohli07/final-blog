const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose=require("mongoose");





let posts=[]

const homeStartingContent = "Welcome to our Blog website.Enjoy reading the fun content and feel free to post your  thoughts on any topic.";
const aboutContent = "VIIT College Pune";
const contactContent = `233033-Sanket Kulkari
                        233045-Parth Kohli 
                        233046-Piyush Patil   
                        233030-Srushti Khandade`;

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser: true})

const postSchema={
  title:String,
  content:String
}

const Post=mongoose.model("Post",postSchema);

app.get("/",function(req,res){
  Post.find({},function(err,posts){
    res.render("home",{
      startingContent:homeStartingContent,
      posts:posts
    })
  })

})

app.get("/about",function(req,res){
  res.render('about',{aboutCon:aboutContent})
})

app.get("/contact",function(req,res){
  res.render('contact',{contactCon:contactContent})
})

app.get("/compose",function(req,res){
  
  res.render('compose')
})

app.post("/compose",function(req,res){
  const post=new Post({
    title:req.body.postTitle,
    content:req.body.postBody
  })
  post.save(function(err){
    if(!err){
      res.redirect("/")
    }
  });
  //res.redirect("/")
})

app.get("/posts/:postId",function(req,res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

})












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
