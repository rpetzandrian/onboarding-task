import { SQLRepository } from 'rey-common';
import { camelToSnakeCase } from 'rey-common/modules/utils/helpers';
import { NotFoundError } from 'rey-common/modules/utils/http_error';
import { Author } from '../../entity/models/author';
import AuthorRepository from '../author_repository';

export class AuthorRepositoryImpl extends SQLRepository<Author> implements AuthorRepository {
    public constructor() {
        super('Author');
    }

    async findAllWithItem(condition: Partial<Author>): Promise<any> {
        const db = this.getInstance();
        return db.model[this.modelName].findAll({
            where: condition as any,
            include: 'article'
        }).then(rows => rows.map(row => row.get()));
    }

    async findByIdWithItemOrFail(id: number | string): Promise<any> {
        const db = this.getInstance();
        return db.model[this.modelName].findOne({
            where: { id },
            include: 'article'
        }).then((res: any): Author => {
            if (!res) {
                throw new NotFoundError(`${camelToSnakeCase(this.modelName).toUpperCase()}_NOT_FOUND`);
            }
            return res;
        }
        );
    }
}

export default AuthorRepositoryImpl;