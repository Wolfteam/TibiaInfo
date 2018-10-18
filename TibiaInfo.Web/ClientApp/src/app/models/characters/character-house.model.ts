import { TownsType } from "../../enums/towns-type.enum";

export interface CharacterHouse {
  id: number;
  name: string;
  town: TownsType;
  paidUntil: Date;
  world: string;
}
