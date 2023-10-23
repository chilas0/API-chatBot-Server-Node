function send(req, res){
    console.log(req.body);
    res.status(200).send({msg: "OK"});
}

module.exports = {
    send,
}