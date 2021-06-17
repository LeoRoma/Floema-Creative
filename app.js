require('dotenv').config();

const express = require('express');

// need to understand what they do
// const bodyParser = require('body-parser');
// const methodOverride = require('method-override');
// const logger = require('morgan');
// const errorHandler = require('errorhandler'); to handle errors

const app = express();
const path = require('path');
const port = 3000;

// need to understand what they do
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(methodOverride());
// app.use(errorHandler());

const Prismic = require('@prismicio/client');
const PrismicDOM = require('prismic-dom');

const initApi = req => {
    return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        req
    });
}

const handleLinkResolver = doc => {
    if(doc.type == 'product'){
        return `/detail/${doc.slug}`
    }
    // Define the url depending on the document type
    // if (doc.type === 'page') {
    //   return '/page/' + doc.uid;
    // } else if (doc.type === 'blog_post') {
    //   return '/blog/' + doc.uid;
    // }

    // Default to homepage
    return '/';
}

app.use((req, res, next) => {
    // res.locals.ctx = {
    //     endpoint: process.env.PRISMIC_ENDPOINT,
    //     linkResolver: handleLinkResolver
    // };
    res.locals.Link = handleLinkResolver;

    // add PrismicDOM in locals to access them in templates.
    res.locals.PrismicDOM = PrismicDOM; // access to the prismic dome for the frontend

    res.locals.Numbers = index => {
        return index == 0 ? 'One' : index == 1 ? 'Two' : index == 2 ? 'Three' : index == 3 ? 'Four' : '';
    }
    next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
    const api = await initApi(req);
    const home = await api.getSingle('home');
    const meta = await api.getSingle('meta');
    const preloader = await api.getSingle('preloader');
    
    const { results: collections } = await api.query(Prismic.Predicates.at('document.type', 'collection'), {
        fetchLinks: 'product.image'
    });

    console.log(home)
    res.render('pages/home', {
        collections,
        home,
        meta,
        preloader
    });
})

app.get('/about', async (req, res) => {
    const api = await initApi(req);
    const meta = await api.getSingle('meta');
    const about = await api.getSingle('about');
    const preloader = await api.getSingle('preloader');

    res.render('pages/about', {
        about,
        meta,
        preloader
    });

})

app.get('/collections', async (req, res) => {
    const api = await initApi(req);
    const home = await api.getSingle('home');
    const meta = await api.getSingle('meta');
    const preloader = await api.getSingle('preloader');

    const { results: collections } = await api.query(Prismic.Predicates.at('document.type', 'collection'), {
        fetchLinks: 'product.image'
    });

    res.render('pages/collections', {
        collections,
        home,
        meta,
        preloader
    });
})

app.get('/detail/:uid', async (req, res) => {
    const api = await initApi(req);
    const meta = await api.getSingle('meta');
    const preloader = await api.getSingle('preloader');

    const product = await api.getByUID('product', req.params.uid, {
        fetchLinks: 'collection.title'
    });

    res.render('pages/detail', {
        meta,
        preloader,
        product
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})