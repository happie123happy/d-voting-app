const express=require('express');
const route=express.Router()

const services=require('../services/render')

route.get('/',services.homeRoutes)
route.get('/login',services.homeRoutes)
route.get('/vote',services.voter)
route.get('/signup',services.signup)

module.exports=route