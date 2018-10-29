import { StatusType } from "../../enums/status-type.enum";
import { HasName } from "./has-name.model";

export interface OtherCharacter extends HasName {
  world: string;
  status: StatusType
}
