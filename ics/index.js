const auth = require('./src/auth');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userSchema = require('./src/userSchema');
const User = mongoose.model('user', userSchema);
// const connectionString = 'mongodb+srv://dbccc:1711@ctest.s3vxw.mongodb.net/Social?retryWrites=true&w=majority';
const connectionString = 'mongodb+srv://dbccc:1711@cluster0.h4kr0.mongodb.net/Social?retryWrites=true&w=majority'




let articles = [{ id: 0, author: 'Mack', body: 'Post 1' },
{ id: 1, author: 'Jack', body: 'Post 2' },
{ id: 2, author: 'Zack', body: 'Post 3' }];


const hello = (req, res) => res.send({ hello: 'world' });

const getUser = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        // TODO: add a user to the database
        let username = req.params.uname;
        await (connector.then(async () => {
            return new User({
                username,
                created: Date.now()
            }).save();
        }));
        res.send({ name: username });
    })();

};

const getArticles = (req, res) => res.send(articles);

const getArticle = (req, res) => res.send(articles[req.params.id]);

const addArticle = (req, res) => {
    let post = req.body;
    let article = { id: articles.length, author: post.author, body: post.body }
    articles.push(article);
    res.send(articles);
}

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/', hello);
app.get('/users/:uname', getUser);
auth(app);
app.get('/articles', getArticles);
app.get('/articles/:id', getArticle);
app.post('/article', addArticle);

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    const addr = server.address();
    console.log(`Server listening at http://${addr.address}:${addr.port}`)
});
