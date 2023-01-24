module.exports = (req, res, next) => {
    console.log(req.session)
    if(req.session.userInfo) {
        next();
    } else {
        res.status(201).send({});
    }
}