import { TownsType } from "../enums/towns-type.enum";

export class TownHelper {
    public static toTown(townType: TownsType): string {
        switch (townType) {
            case TownsType.AB_DENDRIEL:
                return "Ab'Dendriel";
            case TownsType.ANKRAHMUN:
                return "Ankrahmun";
            case TownsType.CARLIN:
                return "Carlin";
            case TownsType.DARASHIA:
                return "Darashia";
            case TownsType.EDRON:
                return "Edron";
            case TownsType.FARMINE:
                return "Farmine";
            case TownsType.GRAY_BEACH:
                return "Gray Beach";
            case TownsType.KAZORDOON:
                return "Kazordoon";
            case TownsType.LIBERTY_BAY:
                return "Liberty Bay";
            case TownsType.PORT_HOPE:
                return "Port Hope";
            case TownsType.RATHLETON:
                return "Rathleton";
            case TownsType.SVARGROND:
                return "Svargrond";
            case TownsType.THAIS:
                return "Thais";
            case TownsType.VENORE:
                return "Venore";
            case TownsType.YALAHAR:
                return "Yalahar";
            default:
                throw new Error('The provided status enum value does not exists');
        }
    }
}