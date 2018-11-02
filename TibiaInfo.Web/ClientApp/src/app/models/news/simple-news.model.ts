import { NewsType } from "src/app/enums/news-type.enum";
import { CreatedInformation } from "../shared/created-information.model";

export interface SimpleNews {
    id: number;
    type: NewsType;
    title: string;
    tibiaUrl: string;
    createdAt: CreatedInformation;
}