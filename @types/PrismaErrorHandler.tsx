export interface PrismaErrorHandler {
    name: string;
    code: string;
    clientVersion: string;
    meta: {
        modelName: string;
        target: string[];
    };
}
