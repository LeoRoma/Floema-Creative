require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const Prismic = require('@prismicio/client');
const PrismicDOM = require('prismic-dom');

const initApi = (req) => {
    return Prismic.getApi(process.end.PRISMIC_ENDPOINT, {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        req: req
    });
}

const handleLinkResolver = (doc) => {
  
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
    res.locals.ctx = {
      endpoint: process.end.PRISMIC_ENDPOINT,
      linkResolver: handleLinkResolver
    };
    // add PrismicDOM in locals to access them in templates.
    res.locals.PrismicDOM = PrismicDOM;
    next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/about', (req, res) => {
    res.render('pages/about');
})

app.get('/collection', (req, res) => {
    res.render('pages/collection');
})

app.get('/detail/:uid', (req, res) => {
    res.render('pages/detail');
})

app.get('/home', (req, res) => {
    res.render('pages/home');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})