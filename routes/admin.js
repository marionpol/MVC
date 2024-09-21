const express = require('express')
const router = express.Router()
const articleAdminController = require('../controllers/admin/article')
const checkUser = require('../utils/checkUser')
const { error } = require('console')

router.get('/admin', checkUser('admin'), async (req, res) => {
    const articles = await articleAdminController.getAllArticles();
    res.render('admin', {articles});
})

router.get('/admin/article/create', checkUser('admin'), (req, res) => {
    res.render('create');
});

router.post('/admin/article/create', checkUser('admin'), (req, res) => articleAdminController.createNewArticle(req, res))

router.get ('/admin/article/edit/:id', checkUser('admin'), async (req, res) => {
    const article = await articleAdminController.getArticleById(req.params.id);
    res.render('edit', { article });
});

router.post('/admin/article/edit/:id',(req, res) => articleAdminController.updateArticle(req, res));


router.post('/admin/article/delete/:id', (req, res) => articleAdminController.deleteArticle(req, res));

module.exports = router;