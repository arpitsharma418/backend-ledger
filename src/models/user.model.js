const mongoose = require("mongoose");
const bcrypt  = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required to create an account"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address"
      ]
    },

    name: {
      type: String,
      required: [true, "Name is required to create an account"],
      trim: true
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function(){
      if (!this.isModified("password")){
            return;
      }

      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;

      return;
});

userSchema.methods.comparePassword = async function (password){
      return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;