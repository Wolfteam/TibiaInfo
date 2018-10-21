import { PipeTransform, Pipe } from '@angular/core';
import { VocationType } from '../enums/vocation-type.enum';

@Pipe({
    name: 'vocationTitle'
})
export class VocationTtitlePipe implements PipeTransform {
    transform(value: VocationType): string {
        switch (value) {
            case VocationType.DRUID:
                return 'Druid';
            case VocationType.KNIGHT:
                return 'Knight';
            case VocationType.PALADIN:
                return 'Paladin';
            case VocationType.SORCERER:
                return 'Sorcerer';
            case VocationType.ELDER_DRUID:
                return 'Elder Druid';
            case VocationType.ELITE_KNIGHT:
                return 'Elite Knight';
            case VocationType.ROYAL_PALADIN:
                return 'Royal Paladin';
            case VocationType.MASTER_SORCERER:
                return 'Master Sorcerer';
            case VocationType.NONE:
                return 'None';
            default:
                throw new Error('The provided enum value does not exists');
        }
    }

}
