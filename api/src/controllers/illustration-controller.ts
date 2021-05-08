import fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import { Illustration } from '../models/illustration-model';

declare module 'express-serve-static-core' {
  interface Request {
    pathName?: string;
    files: {
      svg: Express.Multer.File[];
    };
  }
}

const multerStorage = multer.memoryStorage();

const multerFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const getFileMiddleware = upload.fields([
  {
    name: 'svg',
  },
]);

const uploadSvg = async (req: Request, _res: Response, next: NextFunction) => {
  if (!req.files.svg) return next();
  const svg = req.files.svg[0];

  const data = new Uint8Array(svg.buffer);

  const writeFile = (attempt: number) => {
    let folderName = 'public';

    if (process.env.NODE_ENV === 'test') folderName = 'tmp';

    if (!fs.existsSync(path.join(__dirname, '../public'))) {
      // create folder if public folder didn't exist
      fs.mkdirSync(path.join(__dirname, '../public'));
    }

    let pathName = path.join(
      __dirname,
      `../${folderName}`,
      `${req.body.title.toLowerCase().split(' ').join('-')}.svg`
    );

    if (attempt > 0) {
      pathName = path.join(
        __dirname,
        `../${folderName}`,
        `${req.body.title.toLowerCase().split(' ').join('-')}-${attempt}.svg`
      );
    }

    fs.writeFile(pathName, data, { flag: 'wx' }, (err) => {
      if (err) {
        if (err.errno === -4075 || err.code === 'EEXIST') {
          writeFile(attempt + 1);
        } else {
          console.error(err);
          throw new Error('Failed to save the file');
        }
      } else {
        req.pathName = `${req.body.title.toLowerCase().split(' ').join('-')}${
          attempt > 0 ? `-${attempt}` : ''
        }.svg`;
        next();
      }
    });
  };

  writeFile(0);
};

const createOne = async (req: Request, res: Response) => {
  const { title, categories, description, author } = req.body;

  if (!req.pathName) {
    return res.status(400).send({ message: '400 Bad Request' });
  }

  const illustration = Illustration.build({
    title,
    categories,
    description,
    url: req.pathName,
    author,
  });

  await illustration.save();

  res.status(201).send({
    message: 'OK',
    data: illustration,
  });
};

const updateOne = async (req: Request, res: Response) => {
  if (req.body.downloadCount || req.body.url) {
    return res.status(403).send({ message: '403 Forbidden Request' });
  }

  const doc = await Illustration.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      updatedAt: new Date(),
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (!doc) {
    return res.status(404).send({
      message: '404 Not Found',
    });
  }

  res.status(200).send({
    message: 'OK',
    data: doc,
  });
};

const deleteOne = async (req: Request, res: Response) => {
  const doc = await Illustration.findByIdAndDelete(req.params.id);

  if (!doc) {
    return res.status(404).send({
      message: '404 Not Found',
    });
  }

  res.status(203).send({
    message: 'OK',
    data: null,
  });
};

const getOne = async (req: Request, res: Response) => {
  const doc = await Illustration.findById(req.params.id);

  if (!doc) {
    return res.status(404).send({
      message: '404 Not Found',
    });
  }

  res.status(200).send({
    message: 'OK',
    data: doc,
  });
};

interface Filter {
  [key: string]: any;
}

const getAll = async (req: Request, res: Response) => {
  const sort = req.query.sort || '-createdAt';
  const limit = Number(req.query.limit) || 5;
  const select = req.query.select || '';
  const categories = req.query.categories?.toString().split(',') || undefined;
  const search = req.query.search || undefined;

  let filter: Filter = {};

  if (categories) {
    filter.categories = {
      $in: categories,
    };
  }

  if (search) {
    const searchString = search.toString().split(' ').join('.*');
    const $in = search
      .toString()
      .split(' ')
      .map((val) => new RegExp(val, 'i'));
    const searchQuery = new RegExp(`.*${searchString}.*`, 'i');

    filter = {
      ...filter,
      $or: [
        { title: { $regex: searchQuery } },
        { description: { $regex: searchQuery } },
        { categories: { $in } },
      ],
    };
  }

  const illustrations = await Illustration.find(filter)
    .collation({ locale: 'en' })
    .sort(sort)
    .limit(limit)
    .select(select);

  res.status(200).send({
    message: 'OK',
    data: illustrations,
  });
};

const getCategories = async (_req: Request, res: Response) => {
  const data = await Illustration.aggregate([
    {
      $unwind: '$categories',
    },
    {
      $group: {
        _id: '$categories',
        count: { $sum: 1 },
      },
    },
    {
      $addFields: { category: '$_id' },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: { category: 1 },
    },
  ]);

  res.status(200).send({
    message: 'OK',
    data,
  });
};

const downloadOne = async (req: Request, res: Response) => {
  const { color = '#6C63FF', format = 'svg', id } = req.body;

  const doc = await Illustration.findById(id);

  doc.downloadCount += 1;
  await doc.save();

  if (!doc) {
    return res.status(404).send({
      message: '404 Not Found',
    });
  }

  fs.readFile(path.join(__dirname, '../public', doc.url), async (err, data: Buffer) => {
    if (err) {
      console.error(err);
      throw new Error('Failed to read file');
    }

    const svg = data.toString().replace(/#6c63ff/gi, color);

    if (format === 'png') {
      try {
        const buffer = await sharp(Buffer.from(svg)).png().resize(1000).toBuffer();
        res.header('Content-Type', 'image/png');
        res.header('Content-Disposition', `attachment; filename="${doc.url.split('.')[0]}.png"`);
        res.header('Content-Length', `${buffer.byteLength}`);
        res.end(buffer);
      } catch (e) {
        console.error(e);
        throw new Error('500 Internal Server Error');
      }
    } else {
      const buffer = Buffer.from(svg);
      res.header('Content-Type', 'image/svg+xml');
      res.header('Content-Disposition', `attachment; filename="${doc.url}"`);
      res.header('Content-Length', `${data.byteLength}`);
      res.end(buffer);
    }
  });
};

export {
  createOne,
  getFileMiddleware,
  uploadSvg,
  getAll,
  getCategories,
  updateOne,
  deleteOne,
  getOne,
  downloadOne,
};
