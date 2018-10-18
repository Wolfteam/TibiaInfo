import { VocationType } from "../../enums/vocation-type.enum";
import { SexType } from "../../enums/sex-type.enum";

export interface BaseCharacter {
  name: string;
  vocation: VocationType;
  sex: SexType;
}
