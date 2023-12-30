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
       res.status(201).json({ token, userId:generateduserId, email:sanitizedEmail})
        
    }
    catch(err) {
        console.log(err)
    }



})






app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    try {


        await client.connect();
        const database = client.db('app-data')
        const users = database.collection('users')

        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    }
    finally  {
        await client.close()
    }
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
