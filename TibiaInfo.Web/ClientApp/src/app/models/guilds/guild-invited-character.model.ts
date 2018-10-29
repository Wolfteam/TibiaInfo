import { HasName } from "../shared/has-name.model";

export interface GuildInvitedCharacter extends HasName {
    invitedOn: Date;
}