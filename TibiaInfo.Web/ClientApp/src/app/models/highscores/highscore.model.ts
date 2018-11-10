import { HasVocation } from "../shared/has-vocation.model";
import { HasName } from "../shared/has-name.model";

export interface HighScore extends HasName, HasVocation {
    levelPoints: number;
    rankPosition: number;
    points: number;
}