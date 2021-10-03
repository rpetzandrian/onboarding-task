import { App as BaseApp, SQLContext, RedisContext } from 'rey-common';
import ArticleServiceImpl from './services/impl/article_service_impl';
import ArticleRepositoryImpl from './repositories/impl/article_repository_impl';
import ArticleController from './controllers/article_controller';
import AuthorServiceImpl from './services/impl/author_service_impl';
import AuthorRepositoryImpl from './repositories/impl/author_repository_impl';
import AuthorController from './controllers/author_controller';

class App extends BaseApp {
    public constructor(port: number) {
        super(port, false, true);
    }

    public async initProviders(): Promise<void> {
        SQLContext.initialize({
            connection_string: String(process.env.DB_CONNECTION_STRING),
            models_path: './database/models'
        });
    }

    public async initControllers(): Promise<void> {
        /** initiate services */
        const articleService = new ArticleServiceImpl(new ArticleRepositoryImpl);
        const authorService = new AuthorServiceImpl(new AuthorRepositoryImpl);


        /** Register Controller */
        this.addController(new ArticleController(articleService));
        this.addController(new AuthorController(authorService));
    }
}

export default App;
