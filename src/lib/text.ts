/**
 * Splits a phrase into two lines of roughly equal length, never leaving a
 * short word ("a", "of") dangling at the end of the first line.
 */
export function splitInTwo(text: string): [string, string] {
  const words = text.split(" ");
  let best = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    if (words[i - 1].length <= 2) continue;
    const diff = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (diff < bestDiff) [best, bestDiff] = [i, diff];
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}
