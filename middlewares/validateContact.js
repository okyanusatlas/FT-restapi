const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
module.exports = (req, res, next) => {
    if (!emailRegEx.test(req.body.email)) {
        return res.status(400).send({
            success: 'false',
            message: 'You must enter a valid email'
        });
    } else if (!req.body.marketingPreferences || !req.body.marketingPreferences.length) {
        return res.status(400).send({
            success: 'false',
            message: 'marketingPreferences is required'
        });
    }
    next();
};