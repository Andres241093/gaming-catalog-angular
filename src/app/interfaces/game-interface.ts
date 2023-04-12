import { EsrbRating, GameGenre, ParentPlatform, Platform, Store, Tag } from "./esrb-rating-interface";
import { Review } from "./review-interface";
import { Screenshot } from "./screenshot-interface";

export interface Game {
    id: number;
    name: string;
    metacritic: number;
    released: string;
    background_image: string;
    dominant_color: string;
    esrb_rating: EsrbRating;
    genres: GameGenre[];
    parent_platforms: ParentPlatform[];
    platforms: Platform[];
    rating: number;
    rating_top: number;
    ratings_count: number;
    reviews_count: number;
    ratings: Review[];
    saturated_color: string;
    short_screenshots: Screenshot[];
    slug: string;
    stores: {id: number; store: Store}[];
    tags: Tag[];
}


