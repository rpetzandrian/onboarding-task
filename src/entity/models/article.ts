
import { BaseProps } from 'rey-common';
import { Author } from './author';

export interface Article extends BaseProps {
    id: number | string;
    author_id: number;
    title: string;
    content: string;

    author: Author;
}