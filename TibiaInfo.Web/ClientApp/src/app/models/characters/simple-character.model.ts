import { StatusType } from '../../enums/status-type.enum';
import { BaseCharacter } from '../shared/base-character.model';
import { IsInFavorites } from '../shared/is-in-favorites.model';

export interface SimpleCharacter extends BaseCharacter, IsInFavorites {
  level: number;
  world: string;
  residence: string;
  status: StatusType;
}

