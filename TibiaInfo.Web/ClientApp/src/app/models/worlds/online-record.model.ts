import { CreatedInformation } from "../shared/created-information.model";

export interface OnlineRecord {
    playersOnline: number;
    at: CreatedInformation;
}