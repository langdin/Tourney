let boutModel = require("../models/bout");
let tourneyModel = require("../models/tourney");

module.exports.GetBoutList = (req, res, next) => {
  // find all
  boutModel.find((err, boutList) => {
    if (err) {
      return console.error(err);
    } else {
      res.json({
        success: true,
        msg: "Bout List Displayed Successfully",
        boutList: boutList
      });
    }
  });
};

module.exports.ProcessAddBout = (req, res, next) => {
  // create new
  let newBout = boutModel({
    number:  req.body.number,
    tourneyId: req.body.tourneyId
  });

  // save
  newBout.save((err, boutModel) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.json({ success: true, msg: "Successfully Added New Bout" });
    }
  });
}