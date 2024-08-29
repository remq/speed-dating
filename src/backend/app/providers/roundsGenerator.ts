import { Round } from "@backend/domain/entities/session";
import { UserLikesMap } from "@backend/domain/valueObjects/userLikesMap";

export interface IRoundsGenerator {
  generateNextRound(previousRounds: Round[], userLikesMap: UserLikesMap): Round;
}
