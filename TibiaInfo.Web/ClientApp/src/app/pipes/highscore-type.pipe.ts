import { Pipe, PipeTransform } from '@angular/core';
import { HighScoreType } from '../models/highscores/highscore-type.enum';

@Pipe({
  name: 'highscoreType'
})
export class HighscoreTypePipe implements PipeTransform {

  transform(value: HighScoreType): string {
    switch (value) {
      case HighScoreType.ACHIEVEMENTS:
        return 'Achievements';
      case HighScoreType.AXE:
        return 'Axe Fighting';
      case HighScoreType.CLUB:
        return 'Club Fighting';
      case HighScoreType.DISTANCE:
        return 'Distance Fighting';
      case HighScoreType.EXPERIENCE:
        return 'Experience Points';
      case HighScoreType.FISHING:
        return 'Fishing';
      case HighScoreType.FIST:
        return 'Fist Fighting';
      case HighScoreType.LOYALTY:
        return 'Loyalty Points';
      case HighScoreType.MAGIC:
        return 'Magic Level';
      case HighScoreType.SHIELDING:
        return 'Shielding';
      case HighScoreType.SWORD:
        return 'Sword Fighting';
      default:
        throw new Error('The provided highscore type enum value does not exists');
    }
  }

}
