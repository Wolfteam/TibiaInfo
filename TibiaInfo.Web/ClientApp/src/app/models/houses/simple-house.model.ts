import { HouseStatusType } from "src/app/enums/house-status-type.enum";

export interface SimpleHouse {
    id: number;
    name: string;
    size: number;
    rent: number;
    status: HouseStatusType;
    statusText: string;
    bid?: number;
    minutesUntilAuctionEnds?: number;
}