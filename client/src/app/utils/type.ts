
import React from 'react';

export interface VideoListProps {
    videos: VideoObject[]
}

export interface VideoObject {
    id: string,
    title: string,
    type: string,
    size?: string
    status: string,
    createdAt: string
}

export interface VidepUploaderProps {
    selectedFiles: File[];
    setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}


export interface UploadApiResponse {
    presignedUrl: string;
}