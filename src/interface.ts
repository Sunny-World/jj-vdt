export interface ResStru {
    res: boolean,
    msg?: string
}
export interface ConfStru {
    [propName: string]: Array<{
        msg: string,
        default?: string,
        fn?: any,
        asyncFn?: any
    }>|{
        msg: string,
        default?: string,
        fn?: any,
        asyncFn?: any
    }
}
export interface ExportStuc {
    [propName: string]: any
}