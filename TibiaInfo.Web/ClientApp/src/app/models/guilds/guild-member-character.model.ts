import { StatusType } from '../../enums/status-type.enum';
import { HasLevel } from '../shared/has-level.model';
import { HasVocation } from '../shared/has-vocation.model';
import { HasName } from '../shared/has-name.model';

export interface GuildMemberCharacter extends HasName, HasLevel, HasVocation {
    status: StatusType
    nick: string;
    joinedOn: Date
}