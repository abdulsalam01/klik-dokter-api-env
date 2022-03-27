export enum Unit {
    CARTON = 'carton',
    PIECES = 'pieces',
    PACK = 'pack'
}

export interface BaseRequest {
    take: number | 10,
    skip: number | 0,
}