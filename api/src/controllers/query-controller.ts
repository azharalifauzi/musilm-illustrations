import { Request, Response } from 'express';
import Fuse from 'fuse.js';
import { Illustration } from '../models/illustration-model';
import { Query } from '../models/query-model';

const createone = async (req: Request, res: Response) => {
  const { query } = req.body;

  const doc = Query.build({
    query,
  });

  await doc.save();

  res.status(201).send({
    message: 'OK',
    data: [],
  });
};

const getAllQueries = async (req: Request, res: Response) => {
  const docs = await Query.find({});

  res.status(200).send({
    message: 'OK',
    data: docs,
  });
};

const getTopSearches = async (req: Request, res: Response) => {
  const { forLastMonth = 3, year = new Date().getFullYear(), limit = 4 } = req.query;

  const month = new Date().getMonth() + 1 - Number(forLastMonth);
  const date = new Date(`${year}-${month}-01`);

  type QueryTopSearch = {
    query: string;
    count: number;
  };

  const docs = await Query.aggregate<QueryTopSearch>([
    {
      $match: {
        createdAt: { $gte: date },
      },
    },
    {
      $group: {
        _id: '$query',
        count: { $sum: 1 },
      },
    },
    {
      $addFields: { query: '$_id' },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  const titleParam = Array.from(docs, ({ query }) => ({
    title: query,
  }));

  const descriptionParam = Array.from(docs, ({ query }) => ({ description: query }));

  const illustrations = await Illustration.find({});

  const fuse = new Fuse(illustrations, {
    threshold: 0.3,
    isCaseSensitive: false,
    shouldSort: true,
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'description', weight: 0.3 },
    ],
    includeScore: true,
  });

  const data = fuse.search({ $or: [...titleParam, ...descriptionParam] });

  if (data.length > Number(limit)) data.length = Number(limit);

  res.status(200).send({
    message: 'OK',
    data,
  });
};

const getSearchSuggestions = async (req: Request, res: Response) => {
  const { search } = req.body;

  const docs = await Query.find({});

  const fuse = new Fuse(docs, {
    isCaseSensitive: false,
    shouldSort: true,
    threshold: 0.3,
    keys: ['query'],
  });

  const data = fuse.search(search);

  if (data.length > 10) data.length = 10;

  res.status(200).send({
    message: 'OK',
    data,
  });
};

export { getAllQueries, createone, getTopSearches, getSearchSuggestions };
