export function isNumeric(x: any): x is number {
  if (typeof x == "number") return true;
  if (typeof x == "undefined" || x === undefined) return false;
  return !isNaN(parseFloat(x));
}
