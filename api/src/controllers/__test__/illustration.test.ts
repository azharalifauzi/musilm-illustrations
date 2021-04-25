import request from 'supertest';
import path from 'path';
import { Types } from 'mongoose';
import app from '../../app';

type CreateIllustrationOpt = {
  title?: string;
  categories?: string[] | string;
  author?: string;
  description?: string;
};

const createIllustration = (options?: CreateIllustrationOpt) => {
  if (!options) {
    options = {
      title: 'Undraw Stats',
      author: 'Azam',
      categories: ['digital'],
      description: 'test illustration',
    };
  }

  const {
    title = 'Undraw Stats',
    author = 'Azam',
    categories = ['digital'],
    description = 'test illustration',
  } = options;

  const response = request(app)
    .post('/api/v1/illustrations')
    .attach('svg', path.resolve(__dirname, '../../public/test.svg'))
    .field('title', title)
    .field('categories', categories)
    .field('author', author)
    .field('description', description);

  return response;
};

describe('GET /api/v1/illustrations - get illustrations', () => {
  it('can fetch a list of illustrations', async () => {
    await createIllustration();
    await createIllustration();

    const response = await request(app).get('/api/v1/illustrations').send().expect(200);

    expect(response.body.data.length).toEqual(2);
  });

  it('limits the amount of illustrations', async () => {
    await createIllustration();
    await createIllustration();
    await createIllustration();
    await createIllustration();

    const response = await request(app).get('/api/v1/illustrations?limit=2').send().expect(200);

    expect(response.body.data.length).toEqual(2);
  });

  it('selects only title and description field', async () => {
    await createIllustration();
    await createIllustration();

    const response = await request(app)
      .get('/api/v1/illustrations?select=title description')
      .send()
      .expect(200);

    const { data } = response.body;

    const key = Object.keys(data[0]);

    expect(key).toEqual(['_id', 'title', 'description']);
  });

  it('filters the illustrations by categories', async () => {
    await createIllustration({ categories: ['nano'] });
    await createIllustration({ categories: ['digital'] });
    await createIllustration({ categories: ['marketing'] });
    await createIllustration({ categories: ['programmer'] });

    const response = await request(app)
      .get('/api/v1/illustrations?categories=digital,marketing')
      .send()
      .expect(200);

    expect(response.body.data.length).toEqual(2);
  });

  it('sorts the illustration by spesific field', async () => {
    await createIllustration({ title: 'f13' });
    await createIllustration({ title: 'Zach' });
    await createIllustration({ title: 'a' });
    await createIllustration({ title: 'c2' });

    const response = await request(app).get('/api/v1/illustrations?sort=title').send().expect(200);

    expect(response.body.data[0].title).toEqual('a');
  });
});

describe('GET /api/v1/illustrations/:id - get one illustration', () => {
  it('can fetch illustration with specific id', async () => {
    const doc = await createIllustration();

    const { _id } = doc.body.data;

    const response = await request(app).get(`/api/v1/illustrations/${_id}`).send().expect(200);

    expect(response.body.data).not.toBeNull();
  });

  it("gives null when the user doesn't exist", async () => {
    const id = new Types.ObjectId().toHexString();

    const response = await request(app).get(`/api/v1/illustrations/${id}`).send().expect(404);

    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('404 Not Found');
  });
});

describe('POST /api/v1/illustrations/ - post one illustration', () => {
  it('creates new document', async () => {
    const response = await request(app).get('/api/v1/illustrations').send().expect(200);

    expect(response.body.data.length).toEqual(0);

    await createIllustration().expect(201);

    const illustrationResponse = await request(app).get('/api/v1/illustrations').send().expect(200);

    expect(illustrationResponse.body.data.length).toEqual(1);
  });

  it('gives an error if an invalid title provided', async () => {
    await request(app)
      .post('/api/v1/illustrations')
      .attach('svg', path.resolve(__dirname, '../../public/test.svg'))
      .field('categories', ['halo'])
      .expect(400);

    await request(app)
      .post('/api/v1/illustrations')
      .attach('svg', path.resolve(__dirname, '../../public/test.svg'))
      .field('title', '')
      .field('categories', ['halo'])
      .expect(400);
  });

  it('gives an error if there is no category', async () => {
    await request(app)
      .post('/api/v1/illustrations')
      .attach('svg', path.resolve(__dirname, '../../public/test.svg'))
      .field('title', 'testing')
      .expect(400);

    await createIllustration({ categories: [] });

    await createIllustration({ categories: '' });
  });

  it('gives an error if there is no file attached', async () => {
    await request(app)
      .post('/api/v1/illustrations')
      .field('categories', ['testing'])
      .field('title', 'testing')
      .expect(400);
  });

  it('gives an error if file type not image', async () => {
    await request(app)
      .post('/api/v1/illustrations')
      .attach('svg', path.resolve(__dirname, '../../tmp/index.md'))
      .field('categories', ['testing'])
      .field('title', 'testing')
      .expect(400);
  });
});

describe('PATCH /api/v1/illustrations/:id - edit one illustration', () => {
  it('gives an error when trying to edit downloadCount', async () => {
    const response = await createIllustration();

    const { _id } = response.body.data;

    await request(app)
      .patch(`/api/v1/illustrations/${_id}`)
      .send({ downloadCount: 100 })
      .expect(403);
  });

  it('gives an error when trying to edit url path', async () => {
    const response = await createIllustration();

    const { _id } = response.body.data;

    await request(app).patch(`/api/v1/illustrations/${_id}`).send({ url: 'test.svg' }).expect(403);
  });

  it('edits the document and updates updatedAt field', async () => {
    const response = await createIllustration();

    const { _id } = response.body.data;

    const updateResponse = await request(app)
      .patch(`/api/v1/illustrations/${_id}`)
      .send({ title: 'this is edited one' })
      .expect(200);

    const { updatedAt, createdAt } = updateResponse.body.data;

    expect(new Date(updatedAt).getTime()).toBeGreaterThan(new Date(createdAt).getTime());
  });
});

describe('DELETE /api/v1/illustrations/:id - delete one illustration', () => {
  it('deletes document', async () => {
    const createResponse = await createIllustration();
    const { _id } = createResponse.body.data;

    const response = await request(app).get('/api/v1/illustrations/').send();

    expect(response.body.data.length).toEqual(1);

    const deleteResponse = await request(app)
      .delete(`/api/v1/illustrations/${_id}`)
      .send()
      .expect(203);

    const anotherResponse = await request(app).get('/api/v1/illustrations/').send();

    expect(deleteResponse.body.data).toBeNull();
    expect(anotherResponse.body.data.length).toEqual(0);
  });

  it('gives an error if there is document not found', async () => {
    const id = new Types.ObjectId().toHexString();

    await request(app).delete(`/api/v1/illustrations/${id}`).send().expect(404);
  });
});

describe('GET /api/v1/illustrations/all-categories - get all categories', () => {
  it('groups documents by categories', async () => {
    await createIllustration({ categories: ['halo'] });
    await createIllustration({ categories: ['tidak', 'makan'] });
    await createIllustration({ categories: ['kamu', 'halo'] });

    const response = await request(app)
      .get('/api/v1/illustrations/all-categories')
      .send()
      .expect(200);

    expect(response.body.data.length).toEqual(4);
  });

  it('gives correct amount of item in each category', async () => {
    await createIllustration({ categories: ['halo'] });
    await createIllustration({ categories: ['tidak', 'makan'] });
    await createIllustration({ categories: ['kamu', 'halo'] });

    const response = await request(app)
      .get('/api/v1/illustrations/all-categories')
      .send()
      .expect(200);

    const { data } = response.body;
    const newData: { [key: string]: any } = {};
    data.forEach((val: any) => {
      newData[val.category] = val;
    });

    expect(newData.halo.count).toEqual(2);
    expect(newData.tidak.count).toEqual(1);
    expect(newData.makan.count).toEqual(1);
    expect(newData.kamu.count).toEqual(1);
  });
});
