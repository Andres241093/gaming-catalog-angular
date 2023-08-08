export interface EsrbRating {
    id: number;
    name: string;
    slug: string;
}

export interface GameGenre extends EsrbRating{
    games_count: number;
    image_background: string;
}

export interface ParentPlatform {
    platform: EsrbRating;
}

export interface PlatformDetails extends GameGenre {
    image: string | null;
    year_end: number | null;
    year_start: number | null;
}

export interface Platform {
    platform: PlatformDetails;
    released_at: string;
}

export interface Store extends GameGenre{
    domain: string;
}

export interface Tag extends GameGenre {
    language: string;
}
