import { ResStru, ConfStru, ExportStuc } from "./interface";
export declare const vdtInitDefault: (obj: any) => void;
export declare const vdt: (conf: ConfStru) => ExportStuc;
export declare const vdtX: {
    conf: any;
    init: (obj: any) => void;
    check: (obj: any) => void;
    run: (obj: any) => ResStru;
    runAsync: (obj: any) => Promise<any>;
};
export default vdt;
//# sourceMappingURL=index.d.ts.map