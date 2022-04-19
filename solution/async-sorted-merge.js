'use strict';

// Print all entries, across all of the *async* sources, in chronological order.

/*
 *
 * Async Solution:
 *
 * I was thinking using async await with a trycatch instead of a big
 * Promise, but for the seak of this challenge I used Promises.
 *
 * and... well I ended up using a while :laugh: since it is faster in this case.
 *
 * This solution it's similar to sync one,  We sort the logs, and then
 * we find the insert position of new element in sorted array, using the findIndex function below.
 *
 * Then we splice the array that replaces printed log entries
 * with the next entry popped from the same source.
 *
 * But we use Promises and at the end we resolve the final console.log
 */

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    const logItems = await Promise.all(
      logSources.map(async (logSource, index) => {
        const logItem = await logSource.popAsync();
        return {
          logIndex: index,
          log: logItem,
        };
      })
    );

    logItems.sort((a, b) => (a.log.date > b.log.date ? 1 : -1));

    while (logItems.length > 0) {
      const firstLog = logItems.shift();
      printer.print(firstLog.log);

      const logSource = await logSources[firstLog.logIndex].popAsync();

      // Checking just for safety if
      // it is different than false
      if (logSource !== false) {
        const newElement = {
          logIndex: firstLog.logIndex,
          log: logSource,
        };

        const insertLogPosition = findIndex(logItems, newElement);
        logItems.splice(insertLogPosition, 0, newElement);
      }
    }
    printer.done();
    resolve(console.log('Async sort complete.'));
  });
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
