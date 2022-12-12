import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 20,
      lowercase: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER',
    },
    active: {
      type: Boolean,
      default: true,
    },
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    passwordHash: { type: String, required: true },
    profilePic: {
      type: String,
      default:
        'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png',
    },
    confirmEmail: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = model('User', userSchema);

export default UserModel;
