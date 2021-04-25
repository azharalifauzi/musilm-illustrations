import { model, Schema, Document, Model } from 'mongoose';

interface IQuery {
  query: string;
  createdAt?: Date;
}

interface IQueryDoc extends IQuery, Document {}

interface IQueryModel extends Model<IQueryDoc> {
  build(attrs: IQuery): IQueryDoc;
}

const QuerySchemaFields: Record<keyof IQuery, any> = {
  query: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
};

const QuerySchema = new Schema(QuerySchemaFields);

QuerySchema.statics.build = (attrs: IQuery) => new Query({ ...attrs });

const Query = model<IQueryDoc, IQueryModel>('Query', QuerySchema);

export { Query, IQuery };
