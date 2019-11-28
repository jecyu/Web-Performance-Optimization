export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
}

export function defaultCompare(a, b) {
  if ( a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
/**
 * 交换函数
 * @export
 * @param {*} array
 * @param {*} a
 * @param {*} b
 */
export function swap(array, a, b) {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}