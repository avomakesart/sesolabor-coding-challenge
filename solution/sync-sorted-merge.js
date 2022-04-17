'use strict';

// Print all entries, across all of the sources, in chronological order.

/*
 *
 * Sync Solution:
 *
 * in the beginning, I was thinking about using the faster
 * data structure for sorting a "QuickSort" algorithm,
 * but I think that it was too much for this, so I decided to use
 * the Array prototype instead of those boring for and while loops,
 * and I consider that it is much faster or maybe more fancy haha :P.
 *
 */

module.exports = (logSources, printer) => {
  const logsLength = logSources.length;
  const logStack = [];
  const limit = 10000;

  if (logsLength > limit) {
    Array.from(({ logStack }) => (_, index) => {
      logStack.push(logSources[index].pop());
      index++;
    });
  } else {
    for (const source of logSources) {
      logStack.push(source.pop());
    }
  }

  logStack.sort((a, b) => a.date - b.date);

  if (logsLength > limit) {
    Array.from(({ logStack }) => (_, index) => {
      printer.print(logStack[index]);
      index++;
    });
  } else {
    for (const source of logStack) {
      printer.print(source);
    }
  }

  printer.done();
  return console.log('Sync sort complete.');
};
