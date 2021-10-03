import { Context, Controller, RequestData } from 'rey-common';
import { API_ROUTE } from '../entity/constant/api';
import AuthorService from '../services/author_service';

export default class AuthorController extends Controller {
    constructor(
        private AuthorService: AuthorService
    ) {
        super({ path: API_ROUTE.AUTHOR });
    }

    public async getAuthors(data: RequestData, context: Context): Promise<any> {
        return await this.AuthorService.getAuthors();
    }

    public async getAuthorById(data: RequestData, context: Context): Promise<any> {
        return await this.AuthorService.getAuthorById(data.params.id);
    }

    public async createAuthor(data: RequestData, context: Context): Promise<any> {
        return await this.AuthorService.createAuthor(data.body);
    }

    public async updateAuthor(data: RequestData, context: Context): Promise<any> {
        return await this.AuthorService.updateAuthor(data.body);
    }

    public async deleteAuthor(data: RequestData, context: Context): Promise<any> {
        return await this.AuthorService.deleteAuthor(data.params.id);
    }

    public setRoutes(): void {
        /** router level caching */
        this.addRoute('get', '/', this.getAuthors.bind(this), { cache: false });
        this.addRoute('get', '/:id', this.getAuthorById.bind(this), { cache: false });
        this.addRoute('post', '/', this.createAuthor.bind(this), { cache: false });
        this.addRoute('put', '/', this.updateAuthor.bind(this), { cache: false });
        this.addRoute('delete', '/:id', this.deleteAuthor.bind(this), { cache: false });
    }
}