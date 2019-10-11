const channelEnum = ["email", "phone", "post"];
module.exports = (req, res, next) => {
    const {brandName, channel, optInStatus} = req.body;
    if (!brandName || !channel || optInStatus === undefined) {
        return res.status(400).send({
            success: 'false',
            message: 'All fields are mandatory'
        });
    }
    if (!channelEnum.includes(channel)) {
        return res.status(400).send({
            success: 'false',
            message: 'channel must be either email, phone or post'
        });
    }
    next();
};