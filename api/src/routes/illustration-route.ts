import express from 'express';
import { body } from 'express-validator';
import * as illustrationController from '../controllers/illustration-controller';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router
  .route('/')
  .post(
    illustrationController.getFileMiddleware,
    [
      body('title').not().isEmpty().withMessage('Title field cannot be empty'),
      body('categories')
        .isLength({ min: 1 })
        .withMessage('Categories must at least have one category'),
    ],
    validateRequest,
    illustrationController.uploadSvg,
    illustrationController.createOne
  )
  .get(illustrationController.getAll);

router.route('/all-categories').get(illustrationController.getCategories);
router.route('/download').post(illustrationController.downloadOne);

router
  .route('/:id')
  .get(illustrationController.getOne)
  .patch(illustrationController.updateOne)
  .delete(illustrationController.deleteOne);

export default router;
