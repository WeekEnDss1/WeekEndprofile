const express = require('express');
const app = express();
const ejs = require('ejs')
const path = require('path')
const youtubeThumbnail = require('youtube-thumbnail');
const ytlist = require('youtube-playlist');
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://anas:anas@cluster0.mycnn.mongodb.net/')
app.listen(80,() => {
    console.log('listening [80] port')
})
const database = require('./database')


const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
require('./passport')(passport)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session({ 
  secret: 'aasdasdasd',
  name: 'login-session',
  resave: false,
  saveUninitialized: false,
}))
const router = express.Router()

app.use(passport.initialize())
app.use(passport.session())
const isLoggedIn = (req, res, next) => req.user ? next() : res.redirect('/failed')

app.get('/success', isLoggedIn, (req, res) => res.redirect('/'))
app.get('/failed', (req, res) => res.status(401).json({ message: 'Unauthorized' }))


app.use('/auth/google', [
  router.get('/login', passport.authenticate('google', { scope: ['profile',] })),
  router.get('/callback', passport.authenticate('google', { failureRedirect: '/failed', successRedirect: '/success' })),
])

app.get('/auth/google/logout', function(req, res, next) {
  req.logout(() => {
    res.redirect('/');
  });
 
});









app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/html'));
let publicPath = path.join(__dirname, '/cdn')
app.use(express.static(publicPath));


const fetch = require('node-fetch')

app.get('/',async (req,res) => {
console.log(req.user)
    ////  var data = await youtubeThumbnail(url);
    ////console.log(data)
    res.render('index.ejs',{
      user : req.user
    })
})
app.get('/experience',async (req,res) => {
    const devListApi = await fetch('https://dlist.dev/api/profile/920608584310595596')
const result = await devListApi.json()
const aa = []
for (const record in result.experiences) {
    if (record) {
      aa.push({name : record,persent : result.experiences[record],
    })
    }
  }
  console.log(aa)
res.render('experience.ejs',{
    experiences : aa,
    user:req.user
})
})

app.get('/contactme',async (req,res) => {
    const devListApi = await fetch('https://dlist.dev/api/profile/920608584310595596')
const result = await devListApi.json()
const aa = []
for (const record in result.experiences) {
    if (record) {
      aa.push({name : record,persent : result.experiences[record],
    })
    }
  }
  console.log(aa)
res.render('contactme.ejs',{
    experiences : aa,
    user : req.user
})
})
app.get('/zajil',async (req,res) => {
  const devListApi = await fetch('https://dlist.dev/api/profile/920608584310595596')
const result = await devListApi.json()
const aa = []
for (const record in result.experiences) {
  if (record) {
    aa.push({name : record,persent : result.experiences[record],
  })
  }
}
console.log(aa)
res.render('zajil.ejs',{
  experiences : aa,
  user : req.user
})
})

app.post('/api/v1/users/feedbacks',async (req,res) => {
  if(!req.user) return res.json({
    action:'error',
    message : '401 unauthorized you must login .'
  })
const message = req.body.message
if(message.length < 5 ) return res.json({
  action:'error',
  message : 'Your Message Must Not be Empty .'
})
const data = new database({ userData : req.user, message : message})
await data.save()
res.json({
  action:'success',
  message : 'Your feedback submited successfuly .'
})
})