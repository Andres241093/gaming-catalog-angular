export interface VideoData {
    kind:          string;
    etag:          string;
    nextPageToken: string;
    regionCode:    string;
    pageInfo:      PageInfo;
    items:         Item[];
}

export interface Item {
    kind: ItemKind;
    etag: string;
    id:   ID;
}

export interface ID {
    kind:    IDKind;
    videoId: string;
}

export enum IDKind {
    YoutubeVideo = "youtube#video",
}

export enum ItemKind {
    YoutubeSearchResult = "youtube#searchResult",
}

export interface PageInfo {
    totalResults:   number;
    resultsPerPage: number;
}
