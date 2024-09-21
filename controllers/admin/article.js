const articleDbModel = require('../../models/article')
const ArticleController = require('../article')
const ArticleModel = new articleDbModel()

class articleAdminController extends ArticleController {


    async getAllArticles(req, res){
        return await ArticleModel.findAll(); 
    }

    async getArticleById(id) {
        return await ArticleModel.findById(id); 
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
            author_id: req.body.id
        }
        const articleId = await ArticleModel.create(newArticle);

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

        await ArticleModel.update(updatedArticleId, updatedArticle);

        res.status(200).redirect('/admin')
    }

    async deleteArticle(req, res){
        const deletedArticleId = req.params.id;

        await ArticleModel.delete(deletedArticleId);

        res.status(200).redirect('/admin')
    }
}

module.exports = new articleAdminController();