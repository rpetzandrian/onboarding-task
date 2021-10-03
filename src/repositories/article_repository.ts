import { SQLRepository } from 'rey-common';
import { Article } from '../entity/models/article';

export type ArticleRepository = SQLRepository<Article>;

export default ArticleRepository;