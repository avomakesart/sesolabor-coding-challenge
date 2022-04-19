'use strict';

// Print all entries, across all of the sources, in chronological order.

/*
 *
 * Sync Solution:
 *
 * in the beginning, I was thinking about using the faster
 * data structure for sorting a "QuickSort" algorithm,
 *
 * In this solution, we pop the first log from each log source
 * to keep track from where it came from.
 *
 * We sort the logs, and then we find the insert position of
 * new element in sorted array, using the findIndex function below.
 *
 * Then we splice the array that replaces printed log entries
 * with the next entry popped from the same source.
 *
 */

module.exports = (logSources, printer) => {
  const logEntries = logSources.map((source, index) => ({
    // Trying to see the drained value 🤔
    drained: source.drained,
    logIndex: index,
    log: source.pop(),
  }));

  logEntries.sort((a, b) => (a.log.date > b.log.date ? 1 : -1));
  while (logEntries.length > 0) {
    // Let's print the first log
    const firstLog = logEntries.shift();
    printer.print(firstLog.log);

    // new logs
    const logSource = logSources[firstLog.logIndex].pop();

    // Checking just for safety if
    // it is different than false
    if (logSource !== false) {
      const newLog = {
        logIndex: firstLog.logIndex,
        log: logSource,
      };

      const insertLogPosition = findIndex(logEntries, newLog);
      logEntries.splice(insertLogPosition, 0, newLog);
    }
  }

  printer.done();

  return console.log('Sync sort complete.');
};

/*
 * Since we will be traversing the whole array therefore
 * the time complexity of algorithm would be O(N).
 */

function findIndex(arr, element) {
  let low = 0,
    high = arr.length;
  while (low < high) {
    let mid = (low + high) >>> 1;
    if (arr[mid].log.date < element.log.date) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
