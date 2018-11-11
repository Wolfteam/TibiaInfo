import { CharacterHouse } from "../characters/character-house.model";
import { GuildRank } from "./guild-rank.model";
import { BaseGuild } from "./base-guild.model";
import { GuildDisbanded } from "./guild-disbanded.model";
import { GuildInvitedCharacter } from "./guild-invited-character.model";

export interface Guild extends BaseGuild {
    acceptsApplication: boolean;
    isInWar: boolean;
    membersOnline: number;
    membersOffline: number;
    disbanded?: GuildDisbanded;
    totalMembers: number;
    totalInvited: number;
    world: string;
    isActive: boolean;
    homePageUrl?: string;
    guildHall?: CharacterHouse
    ranks: GuildRank[];
    invited: GuildInvitedCharacter[];
}