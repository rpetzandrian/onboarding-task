import { SQLRepository } from 'rey-common';
import { Author } from '../entity/models/author';

export interface AuthorRepository extends SQLRepository<Author> {
    findAllWithItem(condition: Partial<Author>): Promise<any>
    findByIdWithItem(id: number | string | undefined): Promise<any>
}

export default AuthorRepository;
