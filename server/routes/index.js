import HomeController from 'controller/HomeController';
import { Router } from 'express';

const routes = Router();

routes.get('/', HomeController.viewHome);

export default routes;
