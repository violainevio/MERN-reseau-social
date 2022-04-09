const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        } else {
          if (err) return res.status(500).send({ message: err });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  if (!ObjectId.isValid(req.body.idToFollow)) {
    return res.status(400).send("ID unknown : " + req.body.idToFollow);
  }

  try {
    // add to the follower list
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { following: req.body.idToFollow },
      },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        // else return res.status(400).json(err);
        if (err) return res.status(400).json(err);
      }
    );

    // add to following list
    UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      {
        $addToSet: { followers: req.params.id },
      },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else res.status(400).json(err);
      }
    );
  } catch (error) {
    res.status(500).json({ message: error });
    console.log("Error updating following : " + error);
  }
};

module.exports.unfollow = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  if (!ObjectId.isValid(req.body.idToUnfollow)) {
    return res.status(400).send("ID unknown : " + req.body.idToUnfollow);
  }

  try {
    // remove from the follower list
    UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { following: req.body.idToUnfollow },
      },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        // else return res.status(400).json(err);
        if (err) return res.status(400).json(err);
      }
    );

    // remove from following list
    UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      {
        $pull: { followers: req.params.id },
      },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else res.status(400).json(err);
      }
    );
  } catch (error) {
    res.status(500).json({ message: error });
    console.log("Error updating unfollowing : " + error);
  }
};
