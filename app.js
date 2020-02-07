//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");
const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://admin-raghu:test123@cluster0-1mhcm.mongodb.net/challengeDB",{useNewUrlParser:true, useUnifiedTopology: true });
const homeStartingContent = " There's a lot of effort that goes into reporting, publishing, and distributing news truthfully and fairly. Hindu's seamless coverage of news is a result of the round-the-clock efforts of hundreds of journalists - reporters, editors, fact-checkers, photographers, videographers, publishers - as well as many support staff.The Hindu's promise is to deliver quality journalism to its readers in a world where disinformation and propaganda are in abundance. This also means desisting, as The Hindu does, from passing off rumours, gossip, and marketing messages, which draw a lot of eyeballs and therefore advertising monies, as news. ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const pageSchema=({
  title:String,
  desc:String
})

const Page=mongoose.model("Page",pageSchema);

app.get("/",function(req,res){
  Page.find({},function(err,foundItems){
    // foundItems.forEach(i => {
    //   console.log(i.title);
    //   console.log(i.desc);
    // });
    res.render("home",{hm:homeStartingContent,pos:foundItems});
  });
});

app.get("/about",function(req,res){
  res.render("about",{abt:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{cnt:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:dir",function(req,res){
  var dirname=_.lowerCase(req.params.dir);
  Page.find({},function(err,foundItems){
    foundItems.forEach(i => {
      if(dirname===_.lowerCase(i.title))
      res.render("post",{nn:i.title,pp:i.desc});
    });
  })
    
});

app.post("/compose",function(req,res){
  
  namee=req.body.num;
  textareaa=req.body.post;
  image=req.body.image;
  const page=new Page({
    title:namee,
    desc:textareaa
  })
  page.save();
  
  res.redirect("/");
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started");
});
