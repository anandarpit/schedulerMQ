import { Router } from 'express';
import TaskController from '@/controllers/task.controller';
import { Routes } from '@interfaces/routes.interface';
import validationUtil from '../utils/validationUtil';
import { task_body } from '../dto/task.dto';

class IndexRoute implements Routes {
  public router = Router();
  public taskController = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //create a health check
    this.router.get(`/health`, this.taskController.healthCheck);
    this.router.post(`/add-task/sms`, task_body, validationUtil.validateInput, this.taskController.addSms);
    this.router.post(`/add-task/mail`, task_body, validationUtil.validateInput, this.taskController.addMail);
  }
}

export default IndexRoute;
