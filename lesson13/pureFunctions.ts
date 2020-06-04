// Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
  let maxScoreTeam: Team = { name: "", score: 0 };
  teams.forEach(
    (team) =>
      (maxScoreTeam = maxScoreTeam.score >= team.score ? maxScoreTeam : team)
  );
  return maxScoreTeam.name;
};

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = (qsObj: QsObj): string => {
  const params: string[] = [];
  for (const key in qsObj) {
    params.push(`${key}=${qsObj[key]}`);
  }
  return "?" + params.join("&");
};

// Задание 3

export const parseQs = (qs: string): QsObj => {
  const result: QsObj = {};
  qs.substr(1)
    .split("&")
    .map((s) => s.split("="))
    .forEach((s) => (result[s[0]] = s[1]));
  return result;
};
