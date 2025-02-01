import { BaseSchema } from 'src/common/base/base.schema';
import { Document } from 'mongoose';
import slugify from 'slugify';

const RoleSchemaDefinition = {
  name: { type: String, required: true },
  slug: { type: String, default: '' },
  permissions: { type: [String], default: [] },
};

export const RoleSchema = new BaseSchema(RoleSchemaDefinition);

RoleSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name as string, { lower: true, strict: true });
  }
  this.updateAt = new Date();
  next();
});

export interface Role extends Document {
  name: string;
  slug: string;
  permissions: [string];
  createdAt: Date;
  updatedAt: Date;
}
