import { WorldLocationType } from "src/app/enums/world-location-type";
import { WorldPvPType } from "src/app/enums/world-pvp-type.enum";
import { OnlineRecord } from "./online-record.model";
import { SimpleCharacter } from "../characters/simple-character.model";

export interface World {
    name: string;
    numberOfPlayersOnline: number;
    onlineRecord: OnlineRecord;
    creationDate: string;
    location: WorldLocationType;
    pvpType: WorldPvPType;
    worldQuestTitles: string[];
    battleEyeStatus: string;
    gameWorldType: string;
    playersOnline: SimpleCharacter[];
}
