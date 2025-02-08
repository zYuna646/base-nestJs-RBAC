import { BaseSchema } from 'src/common/base/base.schema';
import { Document } from 'mongoose';
import slugify from 'slugify';

const __name__SchemaDefinition = {
  name: { type: String, required: true },
  slug: { type: String, default: '' },
};

const PopulateDefinition = {};

export const __name__Schema = new BaseSchema(
  __name__SchemaDefinition,
  PopulateDefinition,
);

__name__Schema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name as string, { lower: true, strict: true });
  }
  this.updatedAt = new Date();
  next();
});

export interface __name__ extends Document {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}
