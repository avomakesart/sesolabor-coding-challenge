'use strict';

// Print all entries, across all of the *async* sources, in chronological order.

/*
 *
 * Async Solution:
 *
 * Ok so in the sync solution I used the Array prototype to
 * complete the task, but in this case, since it's an async operation
 * I consider that using that Array stuff doesn't matter, so I used
 * a classic for loop because of readability purposes.
 *
 */

module.exports = (logSources, printer) => {
  return new Promise((resolve, reject) => {
    const logsLength = logSources.length;
    const logStack = [];
    const limit = 10000;

    if (logsLength > limit) {
      for (let index = 0; index < logsLength; index++) {
        const element = logSources[index];
        logEntriesPromise.push(element.popAsync());
      }
    } else {
      for (const source of logSources) {
        logStack.push(source.popAsync());
      }
    }

    Promise.all(logStack).then((sources) => {
      sources.sort((a, b) => a.date - b.date);

      if (logsLength > limit) {
        for (let index = 0; index < logsLength; index++) {
          const element = sources[index];
          printer.print(element);
        }
      } else {
        for (const source of sources) {
          printer.print(source);
        }
      }
      printer.done();
    });

    resolve(console.log('Async sort complete.'));
  });
};
