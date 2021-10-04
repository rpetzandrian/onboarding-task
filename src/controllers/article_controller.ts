import { Context, Controller, RequestData } from 'rey-common';
import { ArticleParamsDTO, ArticleRequestDTO } from 'src/entity/dto/article';
import { API_ROUTE } from '../entity/constant/api';
import ArticleService from '../services/article_service';
import { SCHEME, COMMON_PARAMS_ID } from '../entity/validation/common';

export default class ArticleController extends Controller {
    constructor(
        private ArticleService: ArticleService
    ) {
        super({ path: API_ROUTE.ARTICLE });
    }

    public async getArticle(data: RequestData, context: Context): Promise<any> {
        return await this.ArticleService.getArticles();
    }

    public async getArticleById(data: RequestData<ArticleParamsDTO>, context: Context): Promise<any> {
        return await this.ArticleService.getArticleById(data.params.id);
    }

    public async createArticle(data: RequestData<Partial<ArticleRequestDTO>>, context: Context): Promise<any> {
        return await this.ArticleService.createArticle(data.body);
    }

    public async updateArticle(data: RequestData<Partial<ArticleRequestDTO>>, context: Context): Promise<any> {
        return await this.ArticleService.updateArticle(data.body);
    }

    public async deleteArticle(data: RequestData<ArticleParamsDTO>, context: Context): Promise<any> {
        return await this.ArticleService.deleteArticle(data.params.id);
    }

    public setRoutes(): void {
        /** router level caching */
        this.addRoute('get', '/', this.getArticle.bind(this), { cache: false });
        this.addRoute('get', '/:id', this.getArticleById.bind(this), { cache: false, validate: COMMON_PARAMS_ID });
        this.addRoute('post', '/', this.createArticle.bind(this), { cache: false, validate: SCHEME.CREATE_ARTICLE });
        this.addRoute('put', '/', this.updateArticle.bind(this), { cache: false, validate: SCHEME.UPDATE_ARTICLE });
        this.addRoute('delete', '/:id', this.deleteArticle.bind(this), { cache: false, validate: COMMON_PARAMS_ID });
    }
}