import { HighScoreType } from "src/app/enums/highscore-type.enum";
import { HighScore } from "./highscore.model";

export interface AllHighScores {
    world: string;
    highScoreType: HighScoreType;
    highScore: HighScore[];
}