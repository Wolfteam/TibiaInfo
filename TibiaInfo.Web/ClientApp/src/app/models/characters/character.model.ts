import { SimpleCharacter } from "../characters/simple-character.model";
import { AccountStatusType } from "../../enums/account-status-type.enum";
import { CreatedInformation } from "../shared/created-information.model";
import { CharacterDeath } from "./character-death.model";
import { AccountInformation } from "./account-information.model";
import { Achievement } from "./achievement.model";
import { GuildMember } from "../guilds/guild-member.model";
import { CharacterHouse } from "./character-house.model";
import { OtherCharacter } from "../shared/other-character.model";

export interface Character extends SimpleCharacter {
  achievemntsPoints: number;
  marriedTo: string;
  comment: string;
  accountStatus: AccountStatusType;
  lastLogin: CreatedInformation;
  deaths?: CharacterDeath[];
  accountInformation?: AccountInformation;
  achievements?: Achievement[];
  guild?: GuildMember;
  house?: CharacterHouse;
  otherCharacters?: OtherCharacter[];
}
