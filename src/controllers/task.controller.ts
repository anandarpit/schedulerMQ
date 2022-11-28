import { NextFunction, Request, Response } from 'express';
import amqplib from 'amqplib';
class TaskController {
  public healthCheck = (req: Request, res: Response) => {
    res.status(200).json({
      message: 'OK',
    });
  };

  public addSms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { job_id, priority } = req.body;
      const msg = JSON.stringify({ job_id, priority });
      console.log('msg', msg);
      const connection = await amqplib.connect('amqp://localhost');
      const queueName = 'sms';
      const channel = await connection.createChannel();
      await channel.assertQueue(queueName, { durable: false });
      channel.sendToQueue(queueName, Buffer.from(msg));
      setTimeout(() => {
        connection.close();
      }, 500);
      return res.status(200).json({
        message: 'added to queue',
      });
    } catch (error) {
      console.log('error', error);
      next(error);
    }
  };

  public addMail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { job_id, priority } = req.body;
      const msg = JSON.stringify({ job_id, priority });
      console.log('msg', msg);
      const connection = await amqplib.connect('amqp://localhost');
      const queueName = 'mail';
      const channel = await connection.createChannel();
      await channel.assertQueue(queueName, { durable: false });
      channel.sendToQueue(queueName, Buffer.from(msg));
      setTimeout(() => {
        connection.close();
      }, 500);
      return res.status(200).json({
        message: 'added to queue',
      });
    } catch (error) {
      console.log('error', error);
      next(error);
    }
  };
}

export default TaskController;
