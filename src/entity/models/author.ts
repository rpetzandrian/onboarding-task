import { BaseProps } from 'rey-common';
import { Article } from './article';

export interface Author extends BaseProps {
    id: number | string;
    name: string;

    article: Article[];
}

export default Author;