const express = require('express')
const router = express.Router()
const articleAdminController = require('../controllers/admin/article')
const checkUser = require('../utils/checkUser')

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

router.post('/admin/article/edit/:id', checkUser('admin'), async (req, res) => {
    const updatedArticleId = req.params.id;
    const updatedArticle = {
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      body: req.body.body,
      published: new Date().toISOString().slice(0, 19).replace('T', ' '),
      author_id: req.body.author_id  
  
    };
  
    await articleAdminController.updateArticle(updatedArticleId, updatedArticle);
  
    res.redirect('/admin'); 
  });


router.post('/admin/article/delete/:id', checkUser('admin'), async (req, res) => {
    const deletedArticleId = req.params.id;
  
    await articleAdminController.deleteArticle(deletedArticleId);

    res.redirect('/admin'); 
  });

module.exports = router;