import { GuildMemberCharacter } from "./guild-member-character.model";

export interface GuildRank {
    rankTitle: string;
    rankMembers: GuildMemberCharacter[]; 
}