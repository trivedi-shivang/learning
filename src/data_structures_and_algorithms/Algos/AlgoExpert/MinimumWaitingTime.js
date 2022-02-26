// given an array of queries. Elements of the array are positive. There will atleast be one element in the array.
// each query can be executed sequentially
// each query can be executed after previous query ends.
// question is to find minimum waiting time for all queries to execute.

// HINT: the minimum waiting time for the first query to execute

//SOLUTION: if there is minimum waiting time for each query to execute, sum of minimum waiting time of each query will be minimum waiting time for all queries
// TIME COMPLEXITY: O(nlog(n)) O(n)
function sortArr(arr) {
  arr.sort((a, b) => a - b);
}

let firstElmIdx = 0;
function minimumWaitingTime(queries) {
  sortArr(queries);
  return minimumWaitingTimeForNextQuery(queries);
}

function minimumWaitingTimeForNextQuery(queries, sum = 0) {
  if (queries.length === 1) {
    return 0;
  } else {
    sum += queries[firstElmIdx];
    return (
      sum + minimumWaitingTimeForNextQuery(queries.splice(firstElmIdx + 1), sum)
    );
  }
}

minimumWaitingTime([3, 2, 1, 2, 6]);

// iterative solution
function minimumWaitingTime(queries) {
  // sorting queries in asc order makes sure that each takes minimum amount of time.
  queries.sort((a, b) => a - b);
  let totalDuration = 0; //0 for first query it requires no time to execute.
  for (let idx in queries) {
    totalDuration += queries[idx] * (queries.length - (parseInt(idx) + 1));
  }
  return totalDuration;
}
