import { StatusType } from '../../enums/status-type.enum';
import { HasLevel } from '../shared/has-level.model';
import { HasVocation } from '../shared/has-vocation.model';
import { HasName } from '../shared/has-name.model';
import { IsInFavorites } from '../shared/is-in-favorites.model';

export interface GuildMemberCharacter extends HasName, HasLevel, HasVocation, IsInFavorites {
    status: StatusType
    nick: string;
    joinedOn: Date
}