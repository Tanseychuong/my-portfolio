const Visitor = require("../models/visitor");


exports.trackVisitor = async (req, res) => {


    await Visitor.create({

        ip_address: req.ip,

        page: req.body.page,

        device: req.body.device,

        duration: req.body.duration

    });


    res.json({
        message: "Tracked"
    });


};



exports.dashboardStats = async (req, res) => {


    const stats =
        await Visitor.getStats();


    res.json(stats);


};