import { Request, Response } from 'express';
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
  const { forLastMonth = 3, year = 2021 } = req.query;

  const month = new Date().getMonth() + 1 - Number(forLastMonth);
  const date = new Date(`${year}-${month}-01`);

  const docs = await Query.aggregate([
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

  res.status(200).send({
    message: 'OK',
    data: docs,
  });
};

export { getAllQueries, createone, getTopSearches };
