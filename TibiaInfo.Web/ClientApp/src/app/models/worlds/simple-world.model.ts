import { WorldPvPType } from "src/app/enums/world-pvp-type.enum";
import { WorldLocationType } from "src/app/enums/world-location-type";

export interface SimpleWorld {
    name: string;
    pvpType: WorldPvPType;
    numberOfPlayersOnline: number;
    location: WorldLocationType;
}