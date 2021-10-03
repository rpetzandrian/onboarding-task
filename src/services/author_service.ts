import { Service } from 'rey-common';
import { Author } from '../entity/models/author';

export interface AuthorService extends Service {
    getAuthors(): Promise<Author[]>
    getAuthorById(id: number | string): Promise<Author>
    createAuthor(data: Partial<Author>): Promise<any>
    updateAuthor(data: Partial<Author>): Promise<any>
    deleteAuthor(id: number | string): Promise<any>
}

export default AuthorService;