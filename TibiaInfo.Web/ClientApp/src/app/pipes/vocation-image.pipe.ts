import { PipeTransform, Pipe } from '@angular/core';
import { VocationType } from '../enums/vocation-type.enum';
import { SexType } from '../enums/sex-type.enum';

@Pipe({
    name: 'vocationImage'
})
export class VocationImagePipe implements PipeTransform {
    transform(value: VocationType, sex: SexType): string {
        switch (value) {
            case VocationType.KNIGHT:
                return sex === SexType.MALE ?
                    './assets/images/knight_outfit_male.gif' :
                    './assets/images/knight_outfit_female.gif';
            case VocationType.ELITE_KNIGHT:
                return sex === SexType.MALE ?
                    './assets/images/knight_outfit_full_male.gif' :
                    './assets/images/knight_outfit_full_female.gif';
            case VocationType.SORCERER:
            case VocationType.DRUID:
                return sex === SexType.MALE ?
                    './assets/images/mage_outfit_male.gif' :
                    './assets/images/mage_outfit_female.gif';
            case VocationType.ELDER_DRUID:
                return sex === SexType.MALE ?
                    './assets/images/druid_outfit_full_male.gif' :
                    './assets/images/druid_outfit_full_female.gif';
            case VocationType.PALADIN:
                return sex === SexType.MALE ?
                    './assets/images/hunter_outfit_male.gif' :
                    './assets/images/hunter_outfit_female.gif';
            case VocationType.ROYAL_PALADIN:
                return sex === SexType.MALE ?
                    './assets/images/assains_outfit_full_male.gif' :
                    './assets/images/assains_outfit_full_female.gif';
            case VocationType.MASTER_SORCERER:
                return sex === SexType.MALE ?
                    './assets/images/mage_outfit_full_male.gif' :
                    './assets/images/mage_outfit_full_female.gif';
            default:
                throw new Error('The provided enum value does not exists');
        }
    }
}
