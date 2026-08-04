const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageURL: { type: String, default: null },
  },
  { timestamps: true },
);

//hiding the password before saving

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.pssword, 10);
  next();
});

//compare password
UserSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
};

module.exports = mongoose.model("User", UserSchema);
