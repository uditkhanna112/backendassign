var express = require("express")
var query = require('url');
var app = express();
var bodi = require("body-parser");
app.use(bodi.urlencoded({extened:true}))
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb', (err,db) => {
  if(err){
    return console.log('Unable to connect');
  }

    console.log('Connected');
});

var schema = new mongoose.Schema({
  id:Number,
  first_name:String,
last_name:String,
  companyname:String,
  age:Number,
  city:String,
  state:String,
zip:Number,
email:String,
web:String

})

var mess = mongoose.model("mess",schema);
var x= new mess({
  id: 1,
        first_name: "rohit",
        last_name: "sharma",
        
        company_name: "Benton, John B Jr",
        age: 1000,
        city: "New Orleans",
        state: "LA",
        zip: 70116,
        email: "jbutt@gmail.com",
        web: "http://www.bentonjohnbjr.com"
        

});
x.save(function(err,y){

});

app.get("/display5",function(req,res){
  query2=query.parse(req.url,true).query;

  var id = query2.id;
console.log(id);
mess.find({id:id},function(err,docs){
  if(err){
    console.log(err)
  }
  else{
    res.render("display5.ejs",{arr:docs});
  }
})

})


app.get("/display4",function(req,res){
 
  res.render("display4.ejs");  
  
});
app.get("/display3",function(req,res){
 
  res.render("display3.ejs");  
  
});     
     app.get("/substr",function(req,res){
       res.render("substr.ejs")
     })   

app.get("/about",function(req,res){
  res.render("home.ejs");
});

app.get("/get",function(req,res){
  mess.find({},null,{limit:5},function(err,details){
    if(err){
      console.log(err)
    }
    else
  res.render("display.ejs",{arr:details});  
  console.log(details);  
  });
  
});

app.get("/sort",function(req,res){
  
  res.render("sort.ejs")
  
   
})

app.get("/sorted",function(req,res){
  
  res.render("sorted.ejs")
  
   
})

app.get("/display2",function(req,res){
  res.render("display2.ejs");
})
app.post("/display2",function(req,res){
  var name=req.body.abc;

  mess.find({first_name:{$regex:name}},null,{limit:5},function(err,details){
    if(err){
      console.log(err)
    }
    else
  res.render("display2.ejs",{arr:details});  
  console.log(details);  
  });
  console.log(name)
  
});

app.get("/display6",function(req,res){
  query2=query.parse(req.url,true).query;

  var id = query2.id;
mess.find({id:id}).remove().exec();
res.render("display6.ejs")

})
app.get("/delete",function(req,res){
  res.render("delete.ejs")
})
app.post("/sorted",function(req,res){
  var name=req.body.sort;
  mess.find({}).sort(name).exec(function(err, docs) { 
  if(err){
    console.log(err)
  }
  else
res.render("display2.ejs",{arr:docs});  
console.log(docs);  
});
console.log(name)

    
});


app.post("/create",function(req,res){
  var name=req.body.fname;
  var id = req.body.id;
  var lname=req.body.lname;
  var cname=req.body.cname;
  var age=req.body.age;
  var state=req.body.state;
  var zip=req.body.zip;
  var email=req.body.email;
  var web=req.body.web;
 
  var newmes={id:id,first_name:name,last_name:lname,company_name:cname,age:age,state:state,zip:zip,email:email,
  web:web};

mess.create(newmes,function(err,newly){
  if(err){
    console.log(err);
  }
  else
  {
    res.redirect("/about")
  }
})
  
})
app.use('/assets',express.static('assets'))


var port=process.env.PORT || 3000;
app.listen(port);