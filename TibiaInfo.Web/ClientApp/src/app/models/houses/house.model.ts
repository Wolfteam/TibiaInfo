import { HouseType } from "src/app/enums/house-type.enum";
import { HouseStatus } from "./house-status.model";

export interface House {
    id: number;
    world: string;
    name: string;
    houseType: HouseType;
    numberOfBeds: number;
    size: number;
    rent: number;
    imageUrl: string;
    status: HouseStatus;
}