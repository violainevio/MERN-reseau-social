const UserModel = require("../models/user.model");
const fs = require("fs");
// const { promisify } = require("util");
const { uploadErrors } = require("../utils/errors.utils");
// const pipeline = promisify(require("stream").pipeline);
// const multer = require("multer");

module.exports.uploadProfile = (req, res) => {
  try {
    if (
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/jpeg"
    ) {
      throw Error("invalid file");
    }

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json(errors);
  }

  const fileName = req.body.name + ".jpg";
  const tempPath = req.file.path;
  const targetPath = __dirname + "/../client/public/uploads/profil/" + fileName;

  fs.rename(tempPath, targetPath, (err) => {
    if (err) console.log(err);
  });

  try {
    UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: "./uploads/profil/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
