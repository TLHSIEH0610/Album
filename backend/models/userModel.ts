import mongoose, { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";
// import { UserDocument } from "../interfaces/UserDocument";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: string;
}

export interface UserMethod extends User {
  comparePassword(password1: string, password2: string): boolean;
}

interface UserModel extends Model<UserMethod> {
  hashPassword(password: string): string;
}

const userSchema: Schema = new Schema<UserMethod, UserModel>({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    // validate: [validator.]
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please input password again!"],
    validate: {
      validator: function (confirm) {
        return confirm === this.password;
      },
    },
  },
  role: {
    type: String,
    enum: ["super", "admin", "normal"],
    default: "normal",
  },
});

//encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //if password field is not modified

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; //not required be persisted in DB
  next();
});

userSchema.method(
  "comparePassword",
  async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
);

userSchema.static("hashPassword", (password: string): string => {
  return bcrypt.hashSync(password);
});

const User: UserModel = model<UserMethod, UserModel>("User", userSchema);

export default User;
