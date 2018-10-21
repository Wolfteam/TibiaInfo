import { SimpleWorld } from "./simple-world.model";

export interface AllWorlds {
    totalPlayersOnline: number;
    worlds: SimpleWorld[];
}