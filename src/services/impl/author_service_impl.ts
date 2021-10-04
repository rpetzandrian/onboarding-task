import { Service } from 'rey-common';
import { InternalServerError, NotFoundError } from 'rey-common/modules/utils/http_error';
import AuthorRepositoryImpl from 'src/repositories/impl/author_repository_impl';
import { Author } from '../../entity/models/author';
import AuthorRepository from '../../repositories/author_repository';
import AuthorService from '../author_service';

export class AuthorServiceImpl extends Service implements AuthorService {
    constructor(
        private AuthorRepo: AuthorRepository
    ) {
        super();
    }

    public async getAuthors(): Promise<Author[]> {
        return await this.AuthorRepo.findAllWithItem({});
    }

    public async getAuthorById(id: number | string | undefined): Promise<Author> {
        const author = await this.AuthorRepo.findByIdWithItem(id);
        if (!author) {
            throw new NotFoundError('ARTICLE_NOT_FOUND');
        }
        return author;

    }

    public async createAuthor(data: Partial<Author>): Promise<any> {
        let author;
        try {
            author = await this.AuthorRepo.create(data);
        } catch (error) {
            throw new InternalServerError('error creating author');
        }
        return author;
    }

    public async updateAuthor(data: Partial<Author>): Promise<any> {
        await this.getAuthorById(data.id);
        try {
            await this.AuthorRepo.update({ id: data.id }, data);
        } catch (error) {
            throw new InternalServerError('error updating article');
        }
        return 'updated';
    }

    public async deleteAuthor(id: number | string): Promise<any> {
        await this.getAuthorById(id);
        try {
            await this.AuthorRepo.delete({ id });
        } catch (error) {
            throw new InternalServerError('error deleting article');
        }
        return 'deleted';
    }
}
export default AuthorServiceImpl;