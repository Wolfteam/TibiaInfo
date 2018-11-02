import { CreatedInformation } from "../shared/created-information.model";

export interface News{
    id: number;
    title: string;
    content: string;
    createdAt: CreatedInformation;
}