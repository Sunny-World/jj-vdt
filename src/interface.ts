export interface ResStru {
    res: boolean,
    msg?: string
}
export interface ConfStru {
    [propName: string]: Array<{
        msg: string,
        default?: string,
        fn?: any
    }>|{
        msg: string,
        default?: string,
        fn?: any
    }
}
export interface ExportStuc {
    [propName: string]: any
}