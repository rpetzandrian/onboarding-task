import { Service } from 'rey-common';
import { InternalServerError, NotFoundError } from 'rey-common/modules/utils/http_error';
import ArticleRepositoryImpl from 'src/repositories/impl/article_repository_impl';
import { Article } from '../../entity/models/article';
import ArticleRepository from '../../repositories/article_repository';
import ArticleService from '../article_service';

export class ArticleServiceImpl extends Service implements ArticleService {
    constructor(
        // private ArticleRepo: ArticleRepository
        private ArticleRepo: ArticleRepositoryImpl
    ) {
        super();
    }

    public async getArticles(): Promise<Article[]> {
        // return await this.ArticleRepo.findAll({}, {});
        return await this.ArticleRepo.findAllWithItem({});
    }

    public async getArticleById(id: number | string | undefined): Promise<Article> {
        // return await this.ArticleRepo.findOneOrFail({ id });
        const article = await this.ArticleRepo.findByIdWithItem(id);
        if (!article) {
            throw new NotFoundError('ARTICLE_NOT_FOUND');
        }
        return article;
    }

    public async createArticle(data: Partial<Article>): Promise<any> {
        return await this.ArticleRepo.create(data);
    }

    public async updateArticle(data: Partial<Article>): Promise<any> {
        await this.getArticleById(data.id);
        try {
            await this.ArticleRepo.update({ id: data.id }, data);
        } catch (error) {
            throw new InternalServerError('error updating article');
        }
        return 'updated';
    }

    public async deleteArticle(id: number | string): Promise<any> {
        await this.getArticleById(id);
        try {
            await this.ArticleRepo.delete({ id });
        } catch (error) {
            throw new InternalServerError('error deleting article');
        }
        return 'deleted';
    }
}

export default ArticleServiceImpl;