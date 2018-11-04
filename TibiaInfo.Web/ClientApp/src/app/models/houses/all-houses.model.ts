import { TownsType } from "src/app/enums/towns-type.enum";
import { HouseType } from "src/app/enums/house-type.enum";
import { SimpleHouse } from "./simple-house.model";

export interface AllHouses{
    town: TownsType;
    world: string;
    type: HouseType;
    houses: SimpleHouse[];
}