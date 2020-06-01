import R from "ramda";
// Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
  let maxScoreTeam: Team = { name: "", score: 0 };
  R.compose(
    R.forEach(
      (team: Team) =>
        (maxScoreTeam = maxScoreTeam.score >= team.score ? maxScoreTeam : team)
    )
  )(teams);
  return maxScoreTeam.name;
};

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = (qsObj: QsObj): string => {
  const params: string[] = [];
  for (const key in qsObj) {
    params.push(`${key}=${qsObj[key]}`);
  }
  return "?" + R.compose(R.join("&"))(params);
};

// Задание 3

export const parseQs = (qs: string): QsObj => {
  const result: QsObj = {};
  R.compose(R.forEach((s: string[]) => (result[s[0]] = s[1])))(R.map((s: string) => s.split("="))(R.split("&")(qs.substr(1))));
  return result;
};
