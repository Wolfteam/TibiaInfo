import { VocationType } from '../enums/vocation-type.enum';

export class VocationHelper {
    public static toVocationType(vocation: string): VocationType {
        switch (vocation) {
            case 'Knight':
                return VocationType.KNIGHT;
            case 'Elite Knight':
                return VocationType.ELITE_KNIGHT;
            case 'Sorcerer':
                return VocationType.SORCERER;
            case 'Master Sorcerer':
                return VocationType.MASTER_SORCERER;
            case 'Paladin':
                return VocationType.PALADIN;
            case 'Royal Paladin':
                return VocationType.ROYAL_PALADIN;
            case 'Druid':
                return VocationType.DRUID;
            case 'Elder Druid':
                return VocationType.ELDER_DRUID;
            default:
                throw new Error('The provided enum value does not exists');
        }
    }
}
