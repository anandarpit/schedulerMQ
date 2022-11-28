import { body } from 'express-validator';

export const task_body = [
  body('job_id', 'Please provide a valid name').isNumeric().notEmpty(),
  body('priority', 'Please provide a valid value').isNumeric().notEmpty(),
  //   body('dep', 'Please provide a valid dependeny').isNumeric().optional({ nullable: true }),
];
