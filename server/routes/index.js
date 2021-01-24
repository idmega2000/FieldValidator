import HomeController from 'controller/HomeController';
import ValidationController from 'controller/ValidationController';
import SchemaValidation from 'middleware/SchemaValidation';
import { Router } from 'express';
import Validators from 'middleware/Validators';

const routes = Router();

/**
 * @description Route viewOwner
 * @param {Function} viewOwner - retrieve the owner information
 * @returns {object} - response information
 */
routes.get('/', HomeController.viewOwner);

/**
 * @description Route handle field validation
 * @param {Function} validateRuleDataSchema - schema and input validation
 * @param {Function} validateCondtionType - Type checking mostly for data
 * @param {Function} validate - the controller that make the validation
 * @returns {object} - response information
 */
routes.post('/validate-rule',
  [SchemaValidation.validateRuleDataSchema,
    Validators.validateCondtionType],
  ValidationController.validate);

export default routes;
