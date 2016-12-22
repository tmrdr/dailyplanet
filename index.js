// $(document).ready(function(){});

//jquery is crashing nodemon

//requires
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");

//app variables
var app = express();
var db = require("./models");

//setup/use statements
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));

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
  db.article.findAll().then(function(articles){
  console.log(articles);
  res.render("articles/show", {articles: articles});
  });
});


//get one article
app.get("/articles/:id", function(req, res){
  console.log(req.params.id);
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
  console.log(req.body);
  db.article.create(req.body).then(function(article){
    res.redirect("/show");
  });
});

//get edit
app.get("/edit/:id", function(req, res){
  console.log(req.params.id);
  db.article.findById(req.params.id).then(function(article){
  res.render("articles/edit", {article: article});
  });
});


// $(".edit-form").on('submit', function(e){
//   e.preventDefault();
//   console.log("Edit submit just got clicked...");
//   var element = $(this);
//   var url = element.attr('action');
//   var formData = element.serialize();
// });

//jquery is crashing nodemon


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
