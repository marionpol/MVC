const articleDbModel = require('../../models/article')
const ArticleController = require('../article')
const articleModel = new articleDbModel()

class articleAdminController extends ArticleController {

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

        res.status(201).json({
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

module.exports = new articleAdminController();