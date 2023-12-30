const PORT = 8000;

const express = require('express');
const bcrypt = require('bcrypt')
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
const cors = require('cors')
const uri = 'mongodb+srv://davidyang838:Goodluck1971@elder-link.bwbggxk.mongodb.net/elder-link?retryWrites=true&w=majority'

const app = express();
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json("hello app")
    })

app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    const generateduserId = uuidv4()
    const hashedpassword = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const existingUser = await users.findOne({ email })

        if (existingUser) {

            return res.status(409).send('user already exists. Please login')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generateduserId,
            email: sanitizedEmail,
            hashed_password: hashedpassword



        }
       const insertedUser =  await users.insertOne(data)

       const token = jwt.sign(insertedUser, sanitizedEmail, {
        expiresIn: 60 * 24
       })
       res.status(201).json({ token, userId: generateduserId})
        
    }
    catch(err) {
        console.log(err)
    }



})

app.post('/login', async (req,res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const user = await users.findOne( { email })
        const correctPassword = await bcrypt.compare(password, user.hashed_password)
        if (user && correctPassword) {
            const token = jwt.sign(user, user.email, {
                expiresIn: 60 * 24
            })
            res.status(201).json({ token, userId: user.user_id})
        }
        res.status(400).send('invalid credentials')
    } catch(err) {
        console.log(err)
    }


})




app.get('/gendered-users', async (req, res) => {
    const client = new MongoClient(uri)
    const gender = req.query.gender
    console.log('gender', gender)
    try {


        await client.connect();
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = { gender_identity: { $eq : gender} }
        const foundusers = await users.find(query).toArray()

        res.send(returnedUsers)
    }
    finally  {
        await client.close()
    }
})




app.get('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId

    console.log('userId', userId)
    

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = { user_id: userId }
        const user = await users.findOne(query)
        res.send(user)

           
    } finally {
        await client.close()
    }



})






















app.put ('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = { user_id: formData.user_id}
        const updateDocument = {
            $set: {

                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                url: formData.url,
                about: formData.about,
                matches: formData.matches
            },
            


        }
        const insertedUser = await users.updateOne(query, updateDocument)
        res.send(insertedUser)





    }
    finally {
        await client.close()
    }




})
app.put("/addmatch", async(req, res) => {

    const client = new MongoClient(uri)
    const { userId, matchedUserId } = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = { user_id: userId }
        const updateDocument = {
            $push: {
                matches: { user_id: matchedUserId }
            },
        }
        const user = await users.updateOne(query, updateDocument)
        req.send(user)





    }
    finally {
        await client.close()
    }
})














app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
