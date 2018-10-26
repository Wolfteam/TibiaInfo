import { VocationType } from '../enums/vocation-type.enum';

const KNIGHT: string = 'Knight';
const ELITE_KNIGHT: string = 'Elite Knight';
const SORCERER: string = 'Sorcerer';
const MASTER_SORCERER: string = 'Master Sorcerer';
const PALADIN: string = 'Paladin';
const ROYAL_PALADIN: string = 'Royal Paladin';
const DRUID: string = 'Druid';
const ELDER_DRUID: string = 'Elder Druid';
const NONE_VOCATION: string = 'None';

export class VocationHelper {
  public static toVocationType(vocation: string): VocationType {
    switch (vocation) {
      case KNIGHT:
        return VocationType.KNIGHT;
      case ELITE_KNIGHT:
        return VocationType.ELITE_KNIGHT;
      case SORCERER:
        return VocationType.SORCERER;
      case MASTER_SORCERER:
        return VocationType.MASTER_SORCERER;
      case PALADIN:
        return VocationType.PALADIN;
      case ROYAL_PALADIN:
        return VocationType.ROYAL_PALADIN;
      case DRUID:
        return VocationType.DRUID;
      case ELDER_DRUID:
        return VocationType.ELDER_DRUID;
      case NONE_VOCATION:
        return VocationType.NONE;
      default:
        throw new Error('The provided vocation value does not exists');
    }
  }

  public static toVocation(vocationType: VocationType) {
    switch (vocationType) {
      case VocationType.DRUID:
        return DRUID;
      case VocationType.ELDER_DRUID:
        return ELDER_DRUID;
      case VocationType.ELITE_KNIGHT:
        return ELITE_KNIGHT;
      case VocationType.KNIGHT:
        return KNIGHT;
      case VocationType.MASTER_SORCERER:
        return MASTER_SORCERER;
      case VocationType.PALADIN:
        return PALADIN;
      case VocationType.ROYAL_PALADIN:
        return ROYAL_PALADIN;
      case VocationType.SORCERER:
        return SORCERER;
      case VocationType.NONE:
        return NONE_VOCATION;
      default:
        throw new Error('The provided vocation enum type does not exists');
    }
  }
}
