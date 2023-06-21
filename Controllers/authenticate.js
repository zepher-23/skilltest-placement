const authenticate = (req, res, next) => {
    // console.log(req.session.id)
    if (req.session.userId === '12345') {
    next()
    }
    else {
        res.render('index',{message:'User logged out'})
    }

}

module.exports = authenticate
