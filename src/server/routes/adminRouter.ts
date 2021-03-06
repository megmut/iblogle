import { Router } from 'express';

/**
 * import routes
 */
import Dashboard from './admin/dashboard';
import Settings from './admin/settings';
import Posts from './admin/posts';
import Themes from './admin/themes';
import Menus from './admin/menus';
import Users from './admin/users';
import Pages from './admin/pages';
import Media from './admin/media';
import { Authentication } from '../controllers/core/authentication';

let router;

export default () => {
    router = Router();

    router.use('*', Authentication.loggedIn);
    router.use('*', Authentication.isAdmin);

    router.use('/', Dashboard());
    router.use('/settings', Settings());
    router.use('/themes', Themes());
    router.use('/users', Users());
    router.use('/content/posts', Posts());
    router.use('/content/menus', Menus());
    router.use('/content/pages', Pages());
    router.use('/content/media', Media());
    

    return router;
}