import mongoose from 'mongoose';

interface IllustrationAttrs {
  title: string;
  description?: string;
  url: string;
  categories: string[];
  author?: string;
  updatedAt?: Date;
}

export interface IllustrationDoc extends mongoose.Document {
  title: string;
  description: string;
  url: string;
  categories: string[];
  author?: string;
  updatedAt?: Date;
}

interface IllustrationModel extends mongoose.Model<IllustrationDoc> {
  build(attrs: IllustrationAttrs): IllustrationDoc;
}

const illustrationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Illustration must have a name'],
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: [true, 'Illustration must have a url path'],
  },
  categories: {
    type: Array,
    required: [true, 'Illustration must have a categories'],
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  downloadCount: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
  },
});

illustrationSchema.statics.build = (attr: IllustrationAttrs) => new Illustration({ ...attr });

const Illustration = mongoose.model<IllustrationDoc, IllustrationModel>(
  'Illustration',
  illustrationSchema
);

export { Illustration };
