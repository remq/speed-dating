import { RoundDTO } from "@backend/domain/dtos/round";
import { UserLikesMapDTO } from "@backend/domain/dtos/userLikesMap";

export interface IRoundsGenerator {
  generateNextRound(
    previousRounds: RoundDTO[],
    userLikesMap: UserLikesMapDTO
  ): RoundDTO;
}
