const express = require('express');
const router = express.Router();
const MongoDbClient = require('./mongo.connector')

router.get('/', (req, res) => {
    res.send('All articles');
});

router.get('/:articleId', (req, res) => {
    MongoDbClient.db.collection('articles').findOne({id: parseInt(req.params.articleId)})
        .then(result => {
            res.send(result);
        }).catch(error => {
            res.status(500).send(err)
        })
});

router.post('/', (req, res) => {
    MongoDbClient.db.collection('articles').insertOne(req.body)
        .then(result => {
            res.send(result);
        }).catch(error => {
        res.status(500).send(err)
    })


    // Avec Mongoose
    // const articleSchema = new mongoose.Schema({
    //     id: Number
    // });
    // const article = mongoose.model("articles", articleSchema);
    // article.save();
    // res.send(`An article is created and have id : ${req.params.articleId}`);
});


// router.update('/:articleId', (req, res) => {
// // Utilisation de notre schéma articles pour interrogation de la base
//     articles.find((err, articles) => {
//         if (err) {
//             res.send(err);
//         }
//         else {
//             res.json(articles);
//         }
//     });
// });

module.exports = router;