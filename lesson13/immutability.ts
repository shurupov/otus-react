// Задание 1
import { or } from "ramda";

export type OriginalTeam = {
  size: number;
  name: string;
  league: string;
};

export type ExpectedTeam = {
  name: string;
  league: string;
  roster: number;
};

export const originalTeamToExpectedTeam = (
  originalTeam: OriginalTeam
): ExpectedTeam => {
  return {
    name: "New York Badgers",
    league: originalTeam.league,
    roster: 25,
  };
};

// Задание 2
export type SomeArray = Array<number | string>;

export const originalArrayToExpectedArray = (
  originalArray: SomeArray
): SomeArray => {
  return ["two", originalArray[2], originalArray[3], 5];
};

// Задание 3

export type Team = {
  name: string;
  captain: {
    name: string;
    age: number;
  };
};

export const originalTeamToExpectedTeamDeep = (
  originalTeam: Record<string, any>
): Record<string, any> => {
  return {
    name: originalTeam.name,
    captain: {
      name: originalTeam.captain.name,
      age: 28,
    },
  };
};
