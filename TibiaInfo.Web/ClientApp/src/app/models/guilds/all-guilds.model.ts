import { BaseGuild } from "./base-guild.model";

export interface AllGuilds {
    world: string;
    active: BaseGuild[];
    formation: BaseGuild[];
}