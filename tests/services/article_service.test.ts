import test from 'ava';
import { InternalServerError, NotFoundError } from 'rey-common/modules/utils/http_error';
import * as sinon from 'sinon';
import ArticleRepository from '../../src/repositories/impl/article_repository_impl';
import ArticleService from '../../src/services/impl/article_service_impl';
import { ARTICLE, ARTICLE_ONE, CREATE_ARTICLE, UPDATE_ARTICLE } from '../variables/article_variable';

test.beforeEach('Initialize sandbox', (t: any): void => {
    t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always('Restore sandbox', (t: any): void => {
    t.context.sandbox.restore();
});

//Get Articles
test.serial('SUCCESS, get all article found', async (t: any): Promise<void> => {
    const articleRepo = new ArticleRepository();
    const articleServ = new ArticleService(articleRepo);

    const mockRepo = t.context.sandbox.mock(articleRepo).expects('findAllWithItem').resolves({ data: [ARTICLE_ONE] });

    await articleServ.getArticles()
        .then(response => {
            t.true(mockRepo.called);
            t.deepEqual(response, { data: [ARTICLE_ONE] });
        });
});

//Get One Article
test.serial('SUCCESS, get one article found', async (t: any): Promise<void> => {
    const articleRepo = new ArticleRepository();
    const articleServ = new ArticleService(articleRepo);

    const mockRepo = t.context.sandbox.mock(articleRepo).expects('findByIdWithItem').resolves(ARTICLE_ONE);

    await articleServ.getArticleById(2)
        .then(response => {
            t.true(mockRepo.called);
            t.is(response, ARTICLE_ONE);
        });
});

test.serial('FAILED, get one article not found', async (t: any): Promise<void> => {
    const articleRepo = new ArticleRepository();
    const articleServ = new ArticleService(articleRepo);

    const mockRepo = t.context.sandbox.mock(articleRepo).expects('findByIdWithItem').resolves();

    await articleServ.getArticleById(2)
        .then(() => {
            t.fail();
        })
        .catch((err) => {
            t.true(mockRepo.called);
            t.true(err instanceof NotFoundError);
        });
});

//Create Article
test.serial('SUCCESS, create new article', async (t: any): Promise<void> => {
    const articleRepo = new ArticleRepository();
    const articleServ = new ArticleService(articleRepo);

    const mockRepo = t.context.sandbox.mock(articleRepo).expects('create').resolves(ARTICLE);

    await articleServ.createArticle(CREATE_ARTICLE)
        .then(response => {
            t.true(mockRepo.called);
            t.is(response, ARTICLE);
        });
});

test.serial('FAILED, create new article', async (t: any): Promise<void> => {
    const articleRepo = new ArticleRepository();
    const articleServ = new ArticleService(articleRepo);

    const mockRepo = t.context.sandbox.mock(articleRepo).expects('create').throws(new InternalServerError('test', '500', {}));

    await articleServ.createArticle(CREATE_ARTICLE)
        .then(() => {
            t.fail();
        })
        .catch((err) => {
            t.true(mockRepo.called);
            t.true(err instanceof InternalServerError);
        });
});

//Update Article
test.serial('SUCCESS, update an article', async (t: any): Promise<void> => {
    const articleRepo = new ArticleRepository();
    const articleServ = new ArticleService(articleRepo);

    const mockFind = t.context.sandbox.mock(articleRepo).expects('findByIdWithItem').resolves(ARTICLE_ONE);
    const mockRepo = t.context.sandbox.mock(articleRepo).expects('update').resolves('updated');

    await articleServ.updateArticle(UPDATE_ARTICLE)
        .then(response => {
            t.true(mockFind.called);
            t.true(mockRepo.called);
            t.deepEqual(response, 'updated');
        });
});

test.serial('FAILED, update an article', async (t: any): Promise<void> => {
    const articleRepo = new ArticleRepository();
    const articleServ = new ArticleService(articleRepo);

    const mockFind = t.context.sandbox.mock(articleRepo).expects('findByIdWithItem').resolves();
    // const mockRepo = t.context.sandbox.mock(articleRepo).expects('update').resolves('updated');

    await articleServ.updateArticle(UPDATE_ARTICLE)
        .then(() => {
            t.fail();
        })
        .catch((err) => {
            t.true(mockFind.called);
            t.true(err instanceof NotFoundError);
        });
});

test.serial('FAILED, update an article internal server error', async (t: any): Promise<void> => {
    const articleRepo = new ArticleRepository();
    const articleServ = new ArticleService(articleRepo);

    const mockFind = t.context.sandbox.mock(articleRepo).expects('findByIdWithItem').resolves(ARTICLE_ONE);
    const mockRepo = t.context.sandbox.mock(articleRepo).expects('update').throws(new InternalServerError('test', '500', {}));

    await articleServ.updateArticle(UPDATE_ARTICLE)
        .then(() => {
            t.fail();
        })
        .catch((err) => {
            t.true(mockFind.called);
            t.true(mockRepo.called);
            t.true(err instanceof InternalServerError);
        });
});

//Delete Article
test.serial('SUCCESS, delete an article', async (t: any): Promise<void> => {
    const articleRepo = new ArticleRepository();
    const articleServ = new ArticleService(articleRepo);

    const mockFind = t.context.sandbox.mock(articleRepo).expects('findByIdWithItem').resolves(ARTICLE_ONE);
    const mockRepo = t.context.sandbox.mock(articleRepo).expects('delete').resolves('deleted');

    await articleServ.deleteArticle(1)
        .then(response => {
            t.true(mockFind.called);
            t.true(mockRepo.called);
            t.deepEqual(response, 'deleted');
        });
});

test.serial('FAILED, delete an article', async (t: any): Promise<void> => {
    const articleRepo = new ArticleRepository();
    const articleServ = new ArticleService(articleRepo);

    const mockFind = t.context.sandbox.mock(articleRepo).expects('findByIdWithItem').resolves();
    // const mockRepo = t.context.sandbox.mock(articleRepo).expects('delete').resolves('deleted');

    await articleServ.deleteArticle(1)
        .then(() => {
            t.fail();
        })
        .catch((err) => {
            t.true(mockFind.called);
            t.true(err instanceof NotFoundError);
        });
});

test.serial('FAILED, delete an article internal server error', async (t: any): Promise<void> => {
    const articleRepo = new ArticleRepository();
    const articleServ = new ArticleService(articleRepo);

    const mockFind = t.context.sandbox.mock(articleRepo).expects('findByIdWithItem').resolves(ARTICLE_ONE);
    const mockRepo = t.context.sandbox.mock(articleRepo).expects('delete').throws(new InternalServerError('test', '500', {}));

    await articleServ.deleteArticle(1)
        .then(() => {
            t.fail();
        })
        .catch((err) => {
            t.true(mockFind.called);
            t.true(mockRepo.called);
            t.true(err instanceof InternalServerError);
        });
});