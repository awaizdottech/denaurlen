import user from "../models/user.js";
import bcrypt from "bcrypt";

export default async function signin(req, res) {
  console.log(req.body);
  try {
    const userExists = await user.findOne({ username: req.body.username });
    if (userExists) {
      const matching = await bcrypt.compare(
        req.body.password,
        userExists.password
      );
      matching ? res.json("successful login") : res.json("wrong password");
    } else {
      res.json("user doesnt exist");
    }
  } catch (err) {
    res.json(err.message);
  }
}