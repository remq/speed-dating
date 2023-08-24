import { writeFileSync } from "fs";
import rand from "random-seed";
import colleagues from "./private/colleagues.json";
import exclusions from "./private/exclusions.json";

const NUMBER_OF_ROUNDS = 6;
const RANDOM = rand.create("seed");

const initCountMap = () =>
  colleagues.reduce((map, colleague) => {
    map[colleague] = 0;
    return map;
  }, {} as Record<string, number>);

const main = () => {
  const isExclusion = ([a, b]: [string, string]) =>
    exclusions.some(
      (exclusion) => exclusion.includes(a) && exclusion.includes(b)
    );

  // All combinations between two people
  const combinations = (
    colleagues.flatMap((a, index) =>
      colleagues.slice(index + 1).map((b) => [a, b])
    ) as [string, string][]
  ).sort((a) => (isExclusion(a) ? 1 : -1));

  // Generate rounds
  const matchCountMap = initCountMap();
  const exclusionCountMap = initCountMap();
  const rounds: [string, string][][] = [];

  for (let roundNumber = 0; roundNumber < NUMBER_OF_ROUNDS; roundNumber++) {
    rounds[roundNumber] = [];

    [...colleagues]
      .sort((a, b) => exclusionCountMap[b] - exclusionCountMap[a])
      .forEach((colleague) => {
        if (rounds[roundNumber].flat(1).includes(colleague)) {
          return;
        }
        const index = combinations.findIndex((combination) => {
          if (!combination.includes(colleague)) {
            return false;
          }
          const otherstring = combination.find(
            (otherstring) => otherstring !== colleague
          );
          return !rounds[roundNumber].flat().includes(otherstring);
        });
        if (index !== -1) {
          rounds[roundNumber].push(combinations[index]);
          matchCountMap[combinations[index][0]]++;
          matchCountMap[combinations[index][1]]++;
          if (isExclusion(combinations[index])) {
            exclusionCountMap[combinations[index][0]]++;
            exclusionCountMap[combinations[index][1]]++;
          }
          combinations.splice(index, 1);
        }
      });

    rounds[roundNumber] = rounds[roundNumber].sort(() => RANDOM.random() - 0.5);
  }
  writeFileSync(
    "rounds.csv",
    rounds
      .map(
        (round) =>
          `Table, Name, Name\n${round
            .map((match, index) => `${index + 1}, ${match.join(", ")}`)
            .join("\n")}`
      )
      .join("\n\n")
  );
  console.log("ROUNDS");
  console.log(rounds);
  console.log("MATHCES");
  console.log(matchCountMap);
  console.log("EXCLUSIONS");
  console.log(exclusionCountMap);
  console.log("NUMBER OF TABLES");
  console.log(rounds.reduce((max, round) => Math.max(max, round.length), 0));
};

main();
