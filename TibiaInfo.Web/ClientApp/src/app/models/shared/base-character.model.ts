import { HasSex } from "./has-sex.model";
import { HasVocation } from "./has-vocation.model";

export interface BaseCharacter extends HasSex , HasVocation {
  name: string;
}
