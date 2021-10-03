import { Service } from 'rey-common';
import AuthorRepositoryImpl from 'src/repositories/impl/author_repository_impl';
import { Author } from '../../entity/models/author';
import AuthorRepository from '../../repositories/author_repository';
import AuthorService from '../author_service';

export class AuthorServiceImpl extends Service implements AuthorService {
    constructor(
        // private AuthorRepo: AuthorRepository
        private AuthorRepo: AuthorRepositoryImpl
    ) {
        super();
    }

    public async getAuthors(): Promise<Author[]> {
        // return await this.AuthorRepo.findAll({},{});
        return await this.AuthorRepo.findAllWithItem({});
    }

    public async getAuthorById(id: number | string): Promise<Author> {
        // return await this.AuthorRepo.findOneOrFail({ id });
        return await this.AuthorRepo.findByIdWithItemOrFail(id);
    }

    public async createAuthor(data: Partial<Author>): Promise<any> {
        return await this.AuthorRepo.create(data);
    }

    public async updateAuthor(data: Partial<Author>): Promise<any> {
        return await this.AuthorRepo.update({ id: data.id }, data);
    }

    public async deleteAuthor(id: number | string): Promise<any> {
        return await this.AuthorRepo.delete({ id });
    }
}
export default AuthorServiceImpl;