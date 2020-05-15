const express=require('express')
const route = express.Router()
const Question = require("../model/Questions")


route.get('/questions', async(req, res) =>{
   try{
    const questions = await Question.find()
    return res.status(200).json(questions)
    
   }catch (error) {
    return res.status(500).json({"error":error})
   }
})

route.get('/question/:id', async (req, res) =>{
    try{
        const _id = req.params.id

        const question = await Question.findOne({_id})
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
                    
        }


    }catch(error){return res.status(500).json({"error":error})}
},)

route.post('/questions', async (req, res) => {
    try {
        const { questionDescription } = req.body
        const { questionOptions } = req.body
        const {questionExam} = req.body
        const {questionSubject} =req.body
        const {questionYear} = req.body

        const question = await Question.create({
            questionDescription,
            questionOptions,
            questionSubject,
            questionYear, 
            questionExam

        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// route.delete('/questions', (req, res)=>{
//     try{
//         const questions =await Question.remove()
//     }catch(error){
//         return res.status(500).json({"error": error})
//     }
// })
route.delete('/question/:id', async(req, res)=>{
    try{
        const _id = req.params.id
        const question = await Question.deleteOne({_id})
        if(question.deletedCount ==0){
            return res.status(404).json("No Question found")
        }else{
            return res.status(204).json('deleted')
        }

    }catch (error){
        return res.status(500).json({"error":error})
    }
})
route.put('/question/:id', async (req, res) => {
    try {
        const _id = req.params.id 
        const { questionDescription,
            questionOptions,
            questionSubject,
            questionYear, 
            questionExam } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                questionDescription,
                questionOptions,
                questionSubject,
                questionYear, 
                questionExam
            })    
            return res.status(201).json(question)
        }else{
            question.questionDescription = questionDescription
            question.questionOptions = questionOptions
            question.questionSubject= questionSubject
            question.questionYear= questionYear
            question.questionExam=questionExam
            await question.save()
            return res.status(200).json(question)
           
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

route.get('/', (req, res)=>
{
    res.send("Hurray now on index page")
})

//Get questions by subject

route.get('/questions/subjects', async (req, res)=>{
     Question.find({}, (err, results)=>{
        if(err) throw err
        let allSubjects=[]
         results.forEach(result => {
            const {questionSubject} =result
            allSubjects.push(questionSubject)
        });
        
        res.status(200).json(allSubjects)
        console.log(allSubjects)
    })

    
})
//get questions by year

    route.get('/questions/years', async(req, res)=>{

                 let allYear=[]
                 Question.find({}, (err, results)=>
                {
                    if(err) throw err
                   
                    results.forEach(result=>
                    {
                    const {questionYear} = result
                     allYear.push(questionYear)
                    })
                    console.log(allYear)
                res.status(200).json(allYear)
                

                })
                
           
            
    })
module.exports=route
