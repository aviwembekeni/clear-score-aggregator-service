export default (
  originalValue: number,
  minObservedValue: number,
  diffBetweenMaxAndMinPotValues: number,
  upperLimitOfRescaledVar: number,
): number => {
  // Reference of rescaling variables to be the same: https://www.theanalysisfactor.com/rescaling-variables-to-be-same/
  return ((originalValue - minObservedValue) / diffBetweenMaxAndMinPotValues) * upperLimitOfRescaledVar;
};
