import { Context, Controller, RequestData } from 'rey-common';
import { API_ROUTE } from '../entity/constant/api';
import ArticleService from '../services/article_service';

export default class ArticleController extends Controller {
    constructor(
        private ArticleService: ArticleService
    ) {
        super({ path: API_ROUTE.ARTICLE });
    }

    public async getArticle(data: RequestData, context: Context): Promise<any> {
        return await this.ArticleService.getArticles();
    }

    public async getArticleById(data: RequestData, context: Context): Promise<any> {
        return await this.ArticleService.getArticleById(data.params.id);
    }

    public async createArticle(data: RequestData, context: Context): Promise<any> {
        return await this.ArticleService.createArticle(data.body);
    }

    public async updateArticle(data: RequestData, context: Context): Promise<any> {
        return await this.ArticleService.updateArticle(data.body);
    }

    public async deleteArticle(data: RequestData, context: Context): Promise<any> {
        return await this.ArticleService.deleteArticle(data.params.id);
    }

    public setRoutes(): void {
        /** router level caching */
        this.addRoute('get', '/', this.getArticle.bind(this), { cache: false });
        this.addRoute('get', '/:id', this.getArticleById.bind(this), { cache: false });
        this.addRoute('post', '/', this.createArticle.bind(this), { cache: false });
        this.addRoute('put', '/', this.updateArticle.bind(this), { cache: false });
        this.addRoute('delete', '/:id', this.deleteArticle.bind(this), { cache: false });
    }
}