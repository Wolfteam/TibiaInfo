import { StatusType } from '../../enums/status-type.enum';
import { BaseCharacter } from '../shared/base-character.model';

export interface SimpleCharacter extends BaseCharacter {
  level: number;
  world: string;
  residence: string;
  status: StatusType;
}

