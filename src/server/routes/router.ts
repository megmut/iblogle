import { Router } from 'express';
import * as csrf from 'csurf';

// import { BlogPostController } from './../controllers/blogPostController';
import admin from './admin/dashboard';
import Breadcrumb from './../middleware/breadcrumb';

import { PageModel } from './../models/mysql/pages';

// var csrfProtection = csrf({ cookie: true });
let router;

const themeRoot = 'themes/theme-one';

export default () => {
    router = Router();
    router.use('/', Breadcrumb);

    PageModel.getPages()
        .then((pages) => {
            // console.log(pages)
            for(let i = 0, len = pages.length; i < len; i++) {
                let page = pages[i];
                router.get(page.url, (req, res, next) => {
                    
                    res.render(`${themeRoot}/templates/${page.template}`, {
                        layout: `../layouts/${page.layout}`
                    });
                })
            }
        })
        .catch((error) => {});

    // router.get('/shop', (req, res, next) => {
    //     PageModel.getPage(1)
    //         .then((data) => {
    //             res.render(`${themeRoute}/pages/index`, {});
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // });


    router.use('/admin', admin());

    // router.get('/portfolio', (req, res, next) => {
    //     res.render('pages/portfolio', {
    //         portfolio: true,
    //         title: 'My Work',
    //         path: req.breadcrumbs,
    //         blogPost: BlogPostController.blogs
    //     });
    // });

    // router.get('/portfolio/:blogPostSlug', (req, res, next) => {
    //     let blogSlug = req.params.blogPostSlug;
    //     let blogData = BlogPostController.generateData(blogSlug);
    //     if (!blogData) {
    //         res.status(404).render('pages/404', { '404': true, title: '404 Not Found', slug: '404' });
    //         return;
    //     } else {
    //         res.render('pages/blog-single', {
    //             travels: true,
    //             title: blogData['title'],
    //             data: blogData,
    //             path: req.breadcrumbs
    //         });
    //     }
    // });

    // router.get('/technologies', (req, res, next) => {
    //     res.render('pages/technologies', {
    //         technologies: true,
    //         techs: Technologies.list,
    //         title: "Technologies I've used",
    //         path: req.breadcrumbs
    //     });
    // });

    // router.get('/contact', csrfProtection, (req, res, next) => {
    //     res.render('pages/contact', {
    //         contact: true,
    //         title: 'Contact Me',
    //         slug: 'Contact',
    //         csrfToken: req.csrfToken()
    //     });
    // });

    // router.get('/about/music', (req, res, next) => {
    //     res.render('pages/music', {
    //         music: true,
    //         title: 'My Music',
    //         path: req.breadcrumbs
    //     });
    // });

    // router.get('/about/photography', (req, res, next) => {
    //     res.render('pages/photography', {
    //         music: true,
    //         title: 'My Photography',
    //         path: req.breadcrumbs
    //     });
    // });

    // router.get('/about/travelling', (req, res, next) => {
    //     res.render('pages/travels', {
    //         travels: true,
    //         title: 'My Travels',
    //         path: req.breadcrumbs
    //     });
    // });

    // router.get('/about/programming', (req, res, next) => {
    //     res.render('pages/travels', {
    //         travels: true,
    //         title: 'My Travels',
    //         path: req.breadcrumbs
    //     });
    // });

    return router;
}