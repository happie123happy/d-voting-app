exports.homeRoutes=(req,res)=>{
    res.render("login_page.ejs");
}

exports.signup=(req,res)=>{
    res.render("signup_page.ejs");
}

exports.voter=(req,res)=>{
    res.render("vote_page.ejs",{name:"Sasi",Aadhar:"123456789012"});
}