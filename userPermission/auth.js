const authUser = (req, res, next) => {
    if(req.user == null) {
        return res.status(403).send('You need to sign in')
    }
    next()
}

const authRole= (role) => {
    return (req, res, next) => {
        if( req.user.role !== role) {
            res.status(401)
            return res.send("not allowed")
        }
        next()
    }
}

module.exports = {
    authUser,
    authRole
}