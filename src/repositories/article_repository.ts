import { SQLRepository } from 'rey-common';
import { Article } from '../entity/models/article';

export interface ArticleRepository extends SQLRepository<Article> {
    findAllWithItem(conditions: Partial<Article>): Promise<any>
    findByIdWithItem(id: number | string | undefined): Promise<any>
}

export default ArticleRepository;