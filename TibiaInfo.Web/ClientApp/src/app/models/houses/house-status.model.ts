import { CreatedInformation } from "../shared/created-information.model";

export interface HouseStatus {
    isOccupied: boolean;
    isAuctioned: boolean;
    currentOwner: string;
    newOwner: string;
    currentBid?: number;
    auctionEndsOn?: CreatedInformation;
    paidUntil: CreatedInformation;
    movingOn?: CreatedInformation;
    isTransferAccepted?: boolean;
    transferBid?: number;
    description: string;
}