import express from 'express';
import { body } from 'express-validator';
import * as QueryController from '../controllers/query-controller';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router
  .route('/')
  .get(QueryController.getAllQueries)
  .post(
    [body('query').not().isEmpty().withMessage('query field cannot be empty')],
    validateRequest,
    QueryController.createone
  );

router.route('/top-search').get(QueryController.getTopSearches);

export default router;
