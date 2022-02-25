// Two teams will compete in a competition. One winner and one looser in a competition.
// Every team will compete against every other team exactly once. Called Round Robin
// competitions will be atleast between two teams.
// there will be a winner at the end of the competition
// O(n) O(k)

function tournamentWinner(competitions, results) {
  let bestTeam = "";
  let scores = { [bestTeam]: 0 };
  const HOME_TEAM_WON = 1;
  for (let i = 0; i < competitions.length; i++) {
    let [homeTeam, awayTeam] = competitions[i];
    if (results[i] !== HOME_TEAM_WON) {
      if (awayTeam in scores) {
        scores[awayTeam] += 3;
      } else {
        scores[awayTeam] = 3;
      }
      if (scores[awayTeam] > scores[bestTeam]) {
        bestTeam = awayTeam;
      }
    } else {
      if (homeTeam in scores) {
        scores[homeTeam] += 3;
      } else {
        scores[homeTeam] = 3;
      }
      if (scores[homeTeam] > scores[bestTeam]) {
        bestTeam = homeTeam;
      }
    }
  }
  return bestTeam;
}

let competitions = [
  ["HTML", "C#"],
  ["C#", "python"],
  ["python", "HTML"],
];

let results = [1, 1, 0];

tournamentWinner(competitions, results);

// Lessons Learned
// bestTeam can act as a key for scores object. that key has to be evaluated every time(since it changes dynamically).
// can split the competitions[i] using destructuring
