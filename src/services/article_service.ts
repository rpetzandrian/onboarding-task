import { Service } from 'rey-common';
import { Article } from '../entity/models/article';

export interface ArticleService extends Service {
    getArticles(): Promise<Article[]>
    getArticleById(id: number | string): Promise<Article>
    createArticle(data: Partial<Article>): Promise<any>
    updateArticle(data: Partial<Article>): Promise<any>
    deleteArticle(id: number | string): Promise<any>
}

export default ArticleService;