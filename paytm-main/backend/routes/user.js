const express = require("express");
const zod = require('zod');
const { User, Account } = require("../db");
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const { authMiddleWare } = require("../middleware");
const router = express.Router();

const signupBody= zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})
router.post('/signup',async (req,res)=>{
    try{
    const body = req.body;
    let sucess = signupBody.safeParse(body);

    if(!sucess){
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser =  await User.findOne({
        username: body.username
    })

    if(existingUser){
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create(body);
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1+ Math.random()*10000
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
	    token: token
    })
   }
   catch(e){
    res.status(411).json({
        message: "Email already taken / Incorrect inputs"
    })
   }
    
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin',async (req,res)=>{
    const body = req.body;
    const {sucess} = signinBody.safeParse(body);
    if(!sucess){
        res.status(411).json({
            message:"invalid inputs"
        })
    }

    const user = await User.findone({
        username,
        password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        },JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message:"Error while signin"
    })
})

const updatebody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})

router.put('/',authMiddleWare,async (req,res)=>{
    const {sucess} = updatebody.safeParse(req.body);
    if(!sucess){
        res.status(403).json({
            message: "Error while updating information"
        })
    }
    
    await User.updateOne({
        _id: req.userId
    },req.body)

    res.json({
        message: "Updated successfully"
    })

})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;