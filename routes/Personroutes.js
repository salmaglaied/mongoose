const express=require('express')
const router=express.Router()
const Person=require('../models/PersonSchema')
var arrayOfPeople = [
    {name: "anas", age: 74,   favouritefoods: ["pizza"]},
    {name: "emy", age: 76,    favouritefoods: ["roast chicken"]},
    {name: "rayhan", age: 78, favouritefoods: ["hamburger"]}
   ];
//add user @Post
router.post('/newPerson',(req,res)=> {
    let newPerson=new Person(req.body)
    newPerson.save( (err,data)=> {
        err ? console.log(err) : res.send('person was added')

    })
})
//get person by id @get
router.get('/:id', (req,res)=> {
    Person.findById( { _id : req.params.id}, (err,data)=> {
        err ? console.log(err) : res.json(data)  
    })
})
    // Create many People with Model.create() 

   router.post('/many', (req, res) => {
   Person.create (arrayOfPeople,(err,data)=>{
    err ? console.log(err) : res.json(data)
   }
   )})

   //get user by name @get
router.get('/prenom/:name', (req,res)=> {
    Person.find( {name:req.params.name}, (err,data)=> {
        err ? console.log(err) : res.json(data)  
    })
})

   //get user by favouritefood @get
   router.get('/food/:favouritefoods', (req,res)=> {
    Person.findOne( {favouritefoods:req.params.favouritefoods}, (err,data)=> {
        err ? console.log(err) : res.json(data)  
    })
})

//get all persons @get
router.get( '/', (req,res)=> {
    Person.find({}, (err,data)=> {
        err ? console.log(err) : res.json(data)
    } )
})
//Perform Classic Updates by Running Find, Edit, then Save
var foodToAdd = "hamburger";
  router.get( '/hamburger/:id', (req,res)=> {
    
    Person.findById({ _id : req.params.id}, (err, data)=> {
        data.favouritefoods.push(foodToAdd);
        data.save(err ? console.log(err) : res.json(data))
        
      });
      
    
    } )
    //FindOne by name and update  
router.put( '/:name', (req,res)=> {
   Person.findOneAndUpdate( {name:req.params.name},{ "age":20 },(err,data)=> {
        err ? console.log(err) : res.json(data)
    })
})
//FindOne by id and remove 
router.delete( '/:id', (req,res)=> {
    Person.findByIdAndRemove( {_id:req.params.id},(err,data)=> {
         err ? console.log(err) : res.json(data)
     })
 })
   //delete Mary 
router.delete( '/Mary/:name', (req,res)=> {
    Person.remove( {name:"Mary"},(err,data)=> {
         err ? console.log(err) : res.json(data)
     })
 }) 
 //Chain Search Query Helpers to Narrow Search Results
 var foodToSearch = "burrito";
 router.get('/burrito/:favouritefoods',(req,res)=> {
    Person.find({favouritefoods:foodToSearch}).sort({name : "desc"}).limit(2).select("-age").exec((err, data) => {
        err ? console.log(err) : res.json(data)})
    })
  


module.exports=router