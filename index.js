
//requires
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");

//app variables
var app = express();
var db = require("./models");
var path = require('path');

//setup/use statements
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'static')));

//routs
app.get("/", function(req,res){
  res.render("home");
});

app.get("/about", function(req,res){
  res.render("site/about");
});

app.get("/contact", function(req,res){
  res.render("site/contact");
});

// get all articles
app.get("/show", function(req,res){
  db.article.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then(function(articles){
  res.render("articles/show", {articles: articles});
  });
});


//get one article
app.get("/articles/:id", function(req, res){
  db.article.findById(req.params.id).then(function(article){
  res.render("articles/one", {article: article});
  });
});

// get new article
app.get("/new", function(req,res){
  res.render("articles/new");
});

//POST create new article and redirect to articles
app.post("/articles/new", function(req, res){
  db.article.create(req.body).then(function(article){
    res.redirect("/show");
  });
});

//get edit
app.get("/edit/:id", function(req, res){
  db.article.findById(req.params.id).then(function(article){
  res.render("articles/edit", {article: article});
  });
});

//submit edit
app.put("/articles/:id", function(req, res){
  var articleToUpdate = req.params.id;
  console.log("article to edit:", req.params.id);
  db.article.update({
    title: req.body.title,
    body: req.body.body,
  }, {
    where: { id: articleToUpdate }
  }).then(function(){
    res.send();
  });
});



//deletes article and redirects to articles
app.delete('/articles/:id',function(req,res){
  console.log(req.params.id);
  db.article.findById(req.params.id).then(function(article){

    article.destroy();
    res.send({message:'success destroying'});
  });
});

//list
app.listen(3000);
































// app.put('/articles/:id', function(req, res) {
//   var articleContent = req.body.body;
//   var articleTitle = req.body.title;
//   var articleId = req.params.id;
//
//       db.article.update(
//         {title: articleTitle}, {where: {id: articleId}},
//         {content: articleContent}, {where: {id: articleId}
//       }).then(function(user) {
//         // do something when done updating
//       });
//       db.article.update(
//
//         {content: articleContent}, {where: {id: articleId}
//       }).then(function(user) {
//         // do something when done updating
//       });
//   res.send({message: 'success'});
// });
