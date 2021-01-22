import HomeController from 'controller/HomeController';
import { Router } from 'express';

const v1Router = Router();

v1Router.get('/', HomeController.viewHome);

export default v1Router;
