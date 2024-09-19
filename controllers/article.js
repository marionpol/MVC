const articleDbModel = require ('../models/article')
const articleModel = new articleDbModel();

class articleController {
    constructor() {
        const articles = []
    }
    
    async getAllArticles(req, res){
        const articles = await articleModel.findAll()
        res.status(201).render('index', {articles: articles})
    }

    async getArticleBySlug(req,res){
        const article = await articleModel.findOne(req.params.slug)
        res.status(201).render('article', {article: article})
    }

    async createForm(req, res) {
        res.render('create');
      }

    async createNewArticle(req, res){
        const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
        }
        const articleId = await articleModel.create(newArticle);

        res.status(201).json('create', {
            message: `created article with id ${articleId}`,
            article: {id: articleId, ...newArticle}
        })
    }

    async updateArticle(req, res){
        const updatedArticleId = req.params.id;

        const updatedArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
        }

        await articleModel.update(updatedArticleId, updatedArticle);

        res.status(201).json({
            message: `updated article with id ${updatedArticleId}`,
            article: {id: updatedArticleId, ...updatedArticle}
        })
    }

    async deleteArticle(req, res){
        const deletedArticleId = req.params.id;

        await articleModel.delete(deletedArticleId);

        res.status(201).json({
            message: `deleted article with id ${deletedArticleId}`
        });
    }

    
}

module.exports = articleController;