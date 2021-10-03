import test from 'ava';
import { NotFoundError } from 'rey-common/modules/utils/http_error';
import * as sinon from 'sinon';
import ArticleController from '../../src/controllers/article_controller';
import ArticleService from '../../src/services/impl/article_service_impl';
import { ARTICLE, ARTICLE_ONE, CREATE_ARTICLE, UPDATE_ARTICLE } from '../variables/article_variable';

test.beforeEach('Initialize sandbox', (t: any): void => {
    t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always('Restore sandbox', (t: any): void => {
    t.context.sandbox.restore();
});

// //Get Articles
test.serial('SUCCESS, get all article found', async (t: any): Promise<void> => {
    const articleService = new ArticleService({});
    const articleController = new ArticleController(articleService);

    const mockRepo = t.context.sandbox.mock(articleService).expects('getArticles').resolves([ARTICLE_ONE]);

    await articleController.getArticle('', '')
        .then(response => {
            t.true(mockRepo.called);
            t.deepEqual(response, [ARTICLE_ONE]);
        });
});

// //Get One Article
test.serial('SUCCESS, get one article found', async (t: any): Promise<void> => {
    const articleService = new ArticleService({});
    const articleController = new ArticleController(articleService);

    const mockRepo = t.context.sandbox.mock(articleService).expects('getArticleById').resolves(ARTICLE_ONE);

    await articleController.getArticleById({ params: { id: 1 } }, '')
        .then(response => {
            t.true(mockRepo.called);
            t.is(response, ARTICLE_ONE);
        });
});

// //Create Article
test.serial('SUCCESS, create new article', async (t: any): Promise<void> => {
    const articleService = new ArticleService({});
    const articleController = new ArticleController(articleService);

    const mockRepo = t.context.sandbox.mock(articleService).expects('createArticle').resolves(ARTICLE);

    await articleController.createArticle({ body: CREATE_ARTICLE }, '')
        .then(response => {
            t.true(mockRepo.called);
            t.is(response, ARTICLE);
        });
});

// //Update Article
test.serial('SUCCESS, update an article', async (t: any): Promise<void> => {
    const articleService = new ArticleService({});
    const articleController = new ArticleController(articleService);

    const mockRepo = t.context.sandbox.mock(articleService).expects('updateArticle').resolves('updated');

    await articleController.updateArticle({ body: UPDATE_ARTICLE }, '')
        .then(response => {
            t.true(mockRepo.called);
            t.deepEqual(response, 'updated');
        });
});

// //Delete Article
test.serial('SUCCESS, delete an article', async (t: any): Promise<void> => {
    const articleService = new ArticleService({});
    const articleController = new ArticleController(articleService);

    const mockRepo = t.context.sandbox.mock(articleService).expects('deleteArticle').resolves('deleted');

    await articleController.deleteArticle({ params: 1 }, '')
        .then(response => {
            t.true(mockRepo.called);
            t.deepEqual(response, 'deleted');
        });
});
