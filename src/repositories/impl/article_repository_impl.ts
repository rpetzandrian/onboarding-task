import { string } from 'joi';
import { SQLRepository } from 'rey-common';
import { camelToSnakeCase } from 'rey-common/modules/utils/helpers';
import { NotFoundError } from 'rey-common/modules/utils/http_error';
import { Article } from '../../entity/models/article';
import ArticleRepository from '../article_repository';

export class ArticleRepositoryImpl extends SQLRepository<Article> implements ArticleRepository {
    public constructor() {
        super('Article');
    }

    async findAllWithItem(conditions: Partial<Article>): Promise<any> {
        const db = this.getInstance();
        return db.model[this.modelName].findAll({
            where: conditions as any,
            include: 'author'
        }).then(rows => rows.map(row => row.get()));
    }

    async findByIdWithItem(id: number | string | undefined): Promise<any> {
        const db = this.getInstance();
        return db.model[this.modelName].findOne({
            where: { id },
            include: 'author'
        }).then((res: any): Article => {
            return res;
        });
    }
}

export default ArticleRepositoryImpl;
