const express = require("express");
const axios = require("axios");

const app = express()

app.post("/kwik",async (req,res)=>{
    const { kwik_url,token,kwik_session } = req.body;
    if(!kwik_url){
        return res.status(400).json({
            status:400,
            message:"Kwik url required"
        })
    }
    if(!token) return res.status(400).json({
        status:400,
        message:"Token is required"
    })
    if(!kwik_session) return res.status(400).json({
        status:400,
        message:"Kwik param is required"
    })

    try{
        const payload = {
            kwik_url,
            kwik_session,
            token
        }
        const response = await axios.post("https://wispy-resonance-ee4a.ayanokojix2306.workers.dev/",payload);
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

module.exports = app;