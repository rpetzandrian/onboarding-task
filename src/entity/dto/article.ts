export interface ArticleRequestDTO {
    body: {
        id: string | number,
        author_id: string | number,
        title: string,
        content: string
    }
}

export interface ArticleParamsDTO {
    params: {
        id: string | number,
    }
}