import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 0 },
    password: { type: String, required: true },
    cart: { type: Schema.Types.ObjectId, ref: "carts"},
    role: { type: String, enum: ["admin", "user"], default: "user" },
},
{ versionKey: false });

export const UserModel = model("user", userSchema);