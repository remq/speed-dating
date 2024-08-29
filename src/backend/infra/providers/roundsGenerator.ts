import { IRoundsGenerator } from "@backend/app/providers/roundsGenerator";
import { Match, Round } from "@backend/domain/entities/session";
import { UserLikesMap } from "@backend/domain/valueObjects/userLikesMap";

export class RoundsGenerator implements IRoundsGenerator {
  generateNextRound(
    previousRounds: Round[],
    userLikesMap: UserLikesMap
  ): Round {
    const userIds = Object.keys(userLikesMap);

    const isExclusion = ([a, b]: Match) =>
      !userLikesMap[a].includes(b) && !userLikesMap[b].includes(a);

    const combinations = userIds
      // Generate all combinations
      .flatMap<[string, string]>((a, index) =>
        userIds.slice(index + 1).map<[string, string]>((b) => [a, b])
      )
      // Filter out the combinations from the previous rounds
      .filter((combination) => {
        const [a, b] = combination;
        return !previousRounds
          .flat()
          .find(([c, d]) => (a === c && b === d) || (a === d && b === c));
      })
      // Order by matching preference
      .sort((combination) => (isExclusion(combination) ? 1 : -1));

    // Keeps track of how often exclusions have been matched together
    const exclusionCountMap = userIds.reduce<Record<string, number>>(
      (map, userId) => {
        map[userId] = previousRounds
          .flat()
          .filter(
            ([a, b]) =>
              (a === userId || b === userId) &&
              userIds.includes(a) &&
              userIds.includes(b)
          )
          .reduce(
            (count, match) => (isExclusion(match) ? count + 1 : count),
            0
          );
        return map;
      },
      {}
    );

    // Keeps track of how often each user has been matched
    // const matchCountMap = userIds.reduce<Record<string, number>>(
    //   (map, userId) => {
    //     map[userId] = previousRounds
    //       .flat()
    //       .filter(([a, b]) => a === userId || b === userId).length;
    //     return map;
    //   },
    //   {}
    // );

    // Generate round
    const nextRound: Round = [];

    [...userIds]
      .sort((a, b) => exclusionCountMap[b] - exclusionCountMap[a])
      .forEach((userId) => {
        if (nextRound.flat(1).includes(userId)) {
          return;
        }
        const index = combinations.findIndex((combination) => {
          if (!combination.includes(userId)) {
            return false;
          }
          const otherCombination = combination.find(
            (otherstring) => otherstring !== userId
          )!;
          return !nextRound.flat().includes(otherCombination);
        });
        if (index !== -1) {
          nextRound.push(combinations[index]);
          combinations.splice(index, 1);
        }
      });

    return nextRound;
  }
}
