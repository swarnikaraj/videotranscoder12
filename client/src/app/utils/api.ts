import axios, { AxiosResponse } from "axios"
import { UploadApiResponse } from "./type";
import { read } from "fs";

export const getPresignedUrl = async (file: File): Promise<string> => {
    try {
        const response: AxiosResponse<UploadApiResponse> = await axios.post('/api/upload', { data: { slug: file.name } });

        return response.data.presignedUrl;
    } catch (error) {

        throw new Error('Failed to get presigned URL');
    }
};



export async function uploadVideoToS3(videoFile: File, presignedUrl: string): Promise<{ uploaded: boolean }> {
    try {
        const response = await axios.put(presignedUrl, videoFile, {
            headers: {
                'Content-Type': videoFile.type,
            },
        });
        return { uploaded: true }
        console.log('Video uploaded successfully to S3');
    } catch (error) {
        console.error('Error uploading video to S3:', error);
        return { uploaded: false }

    }
}

