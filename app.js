require('dotenv').config();

const express = require('express');
// const errorHandler = require('errorhandler'); to handle errors

const app = express();
const path = require('path');
const port = 3000;

const Prismic = require('@prismicio/client');
const PrismicDOM = require('prismic-dom');

const initApi = req => {
    return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        req
    });
}

const handleLinkResolver = doc => {

    // Define the url depending on the document type
    // if (doc.type === 'page') {
    //   return '/page/' + doc.uid;
    // } else if (doc.type === 'blog_post') {
    //   return '/blog/' + doc.uid;
    // }

    // Default to homepage
    return '/';
}

// app.use(errorHandler());

app.use((req, res, next) => {
    res.locals.ctx = {
        endpoint: process.env.PRISMIC_ENDPOINT,
        linkResolver: handleLinkResolver
    };
    // add PrismicDOM in locals to access them in templates.
    res.locals.PrismicDOM = PrismicDOM; // access to the prismic dome for the frontend

    next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/about', async (req, res) => {
    const api = await initApi(req);
    const meta = await api.getSingle('meta');
    const about = await api.getSingle('about');

    res.render('pages/about', {
        about,
        meta
    });

})

app.get('/collections', async (req, res) => {
    const api = await initApi(req);
    const meta = await api.getSingle('meta');
    const { results: collections } = await api.query(Prismic.Predicates.at('document.type', 'collection'));

    console.log(collections);

    res.render('pages/collections', {
        meta,
        collections
    });
})

app.get('/detail/:uid', async (req, res) => {
    // console.log(req.params.uid)

    const api = await initApi(req);
    const meta = await api.getSingle('meta');
    const product = await api.getByUID('product', req.params.uid, {
        fetchLinks: 'collection.title'
    });

    res.render('pages/detail', {
        meta,
        product
    });
})

app.get('/home', (req, res) => {
    res.render('pages/home');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})