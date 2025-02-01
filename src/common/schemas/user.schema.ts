import { BaseSchema } from 'src/common/base/base.schema';
import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const UserSchemaDefinition = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Role' },
};

const PopulateDefinition = {
  path: 'role',
};

export const UserSchema = new BaseSchema(
  UserSchemaDefinition,
  PopulateDefinition,
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
  }

  this.updatedAt = new Date();
  next();
});

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.password;
  return obj;
};

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};
