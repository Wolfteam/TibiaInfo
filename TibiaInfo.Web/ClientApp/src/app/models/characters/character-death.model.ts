import { CreatedInformation } from "../shared/created-information.model";
import { DeathInvolved } from "./death-involved.model";

export interface CharacterDeath {
  diedAt: CreatedInformation;
  diedAtLevel: number;
  reason: string;
  involved: DeathInvolved[];
}
