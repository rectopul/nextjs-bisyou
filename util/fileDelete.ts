import {
    DeleteObjectCommand,
    DeleteObjectCommandInput,
    DeleteObjectCommandOutput,
    S3Client,
} from "@aws-sdk/client-s3";

export async function fileDelete(
    key: string
): Promise<DeleteObjectCommandOutput> {
    try {
        const region = process.env.AWS_DEFAULT_REGION;
        const secretAccessKey = process.env.AWS_ACESS_KEY;
        const accessKeyId = process.env.AWS_ACESS_KEY_ID;
        const bucket = process.env.AWS_BUCKET;

        if (!secretAccessKey || !accessKeyId || !region || !bucket)
            throw new Error(`Forneça as credenciais`);

        const s3Client = new S3Client({
            region,
            credentials: { accessKeyId, secretAccessKey },
        });

        const fileInput: DeleteObjectCommandInput = {
            Bucket: bucket,
            Key: key,
        };

        const command = new DeleteObjectCommand(fileInput);
        const response = await s3Client.send(command);

        return response;
    } catch (error) {
        throw error;
    }
}
