import { NewsType } from "src/app/enums/news-type.enum";
import { SimpleNews } from "./simple-news.model";

export interface AllNews {
    newsType: NewsType;
    news: SimpleNews[];
}