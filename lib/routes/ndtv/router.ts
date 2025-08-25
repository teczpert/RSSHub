import { Router } from '@hono/hono';
import { route as worldRoute } from './world';

const router = new Router();

router.get('/world', worldRoute.handler);

export default router;
