const user = require("../models/user");
const speakeasy = require('speakeasy')
const qrcode = require('qrcode');

async function Login(req,res){
    try {
        const {username,password} = req.body;
        const result = await user.findOne({$and:[{username: username},{password: password}]});
        res.status(200).json({token:result._id})
    } catch (error) {
        console.log(error)
    }
}

async function Regiter(req,res){
    try {
        const secret = speakeasy.generateSecret({
            name: 'MyAuthentication',
        })
        const {username,password} = req.body;
        await user.create({username: username,password: password,auth_secret:secret});
        res.status(200).json({message:"User created successfully"})
    } catch (error) {
        console.log(error)
    }
}

async function generateQr(req,res){
    try {
        const {token} = req.body;
        const {auth_secret} = await user.findOne({_id: token});
        qrcode.toDataURL(auth_secret.otpauth_url, (err, url) => {
            if (err) throw err;
           res.status(200).send(`<img src='${url}'/>`)
        })
    } catch (error) {
        console.log(error)
    }
}

async function verifyOtp(req,res){
    try {
        const {otp,token} = req.body;
        const {auth_secret} = await user.findOne({_id: token})
        const verify = speakeasy.totp.verify({
            secret: auth_secret.ascii,
            encoding: 'ascii',
            token: otp
        })
        res.status(200).json({verify:verify})
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    Login,
    Regiter,
    generateQr,
    verifyOtp
}