import { SexType } from './sexType.enum';
import { VocationType } from './vocationType.enum';
import { StatusType } from './statusType.enum';

export interface Character {
    name: string;
    sex: SexType;
    vocation: VocationType;
    level: number;
    achievementPoints: number;
    world: string;
    residence: string;
    marriedTo: string;
    status: StatusType;
}

