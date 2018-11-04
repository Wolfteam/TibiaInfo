import { TownsType } from "src/app/enums/towns-type.enum";
import { HouseType } from "src/app/enums/house-type.enum";
import { SortDirectionType } from "src/app/enums/sort-direction-type.enum";

export interface HouseListSearchEvent {
    world: string;
    town: TownsType;
    houseType: HouseType;
    houseStatus: number;
    sortBy: string;
    sortDirection: SortDirectionType;
}