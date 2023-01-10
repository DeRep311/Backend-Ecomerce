module.exports={
   isAutenticated(req, res, next){
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/signin')
    }

}