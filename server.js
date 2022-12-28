const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'containers-us-west-56.railway.app',
    user : 'postgres',
    password : 'VCxPcXkZxxqZjVKSADj5',
    database : 'railway',
    port: 7385,
    url: 'postgresql://postgres:VCxPcXkZxxqZjVKSADj5@containers-us-west-56.railway.app:7385/railway'
  }
});


const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {res.send(db.users);})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt )})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res)=> { profile.handleProfile(req, res, db) })
app.put('/image', (req, res)=> { image.handleImage(req, res, db) }) 

app.listen(PORT, ()=>{
	console.log(`app is running on port ${PORT}`);
})

