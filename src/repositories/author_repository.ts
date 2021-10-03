import { SQLRepository } from 'rey-common';
import { Author } from '../entity/models/author';

export type AuthorRepository = SQLRepository<Author>

export default AuthorRepository;
