import { ImageDetails } from "./image-gallery-interface";

export interface Screenshot {
    count: number;
    next: string | null;
    previous: string | null;
    results: ImageDetails[];
}