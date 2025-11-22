const express = require("express");
const axios = require("axios");

const app = express()

app.get("/kwik",async (req,res)=>{
    const { kwik_url } = req.query;
    if(!kwik_url){
        return res.status(400).json({
            status:400,
            message:"Kwik url required"
        })
    }
    try{
        const payload = {
            "service": "kwik",
            "action": "fetch",
            "content": {
                "kwik": kwik_url
            },
            "auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.O0FKaqhJjEZgCAVfZoLz6Pjd7Gs9Kv6qi0P8RyATjaE"
        }
        const response = await axios.post("https://access-kwik.apex-cloud.workers.dev",payload);
        if(response.status !== 200){
            return res.status(500).json({
                status:500,
                message:"Server Error Try again"
            })
        }
    
        return res.json({
            url:response.data.content.url
        })

    } catch(error){
        console.error("An error OCcured",error)
        return res.status(500).json({
            message:"An unknown error occured",
            error:error.message
        })
    }
})

app.listen(4000,()=>{
    console.log("Server listening to Port 4000")
})