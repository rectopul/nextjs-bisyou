export interface Errors {
    errors: Error[];
}

export interface Error {
    message: string;
    locations: Location[];
    path: string[];
    extensions: Extensions;
}

export interface Location {
    line: number;
    column: number;
}

export interface Extensions {
    code: string;
    typeName: string;
    fieldName: string;
}
