import express from 'express';
import notes from './data/notes';
import dotenv from 'dotenv'

const app=express();
dotenv.config();

app.get('/',(req,res) =>{
    console.log("API is working")
    res.send("HIIII");    
})

app.get('/api/notes',(req,res)=>{
    res.json(notes);
})

app.get('/api/notes/:id',(req,res)=>{
    const note=notes.find((n)=> n._id===req.params.id)  
    res.send(note);
})

const PORT= process.env.port || 5000;

app.listen(PORT,() => console.log(`server started on port ${PORT}`))