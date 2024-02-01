// userModel.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  // ... other fields
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // ... other fields
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
