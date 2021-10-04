export interface AuthorRequestDTO {
    body: {
        id: string | number,
        name: string
    }
}

export interface AuthorParamsDTO {
    params: {
        id: string | number,
    }
}