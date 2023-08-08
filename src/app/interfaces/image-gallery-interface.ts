export interface ImageGallery {
    count: number;
    next: string | null;
    previous: string | null;
    results: ImageDetails[];
}

export interface ImageDetails {
    height: number;
    id: number;
    image: string;
    is_deleted: boolean;
    width: number;
}