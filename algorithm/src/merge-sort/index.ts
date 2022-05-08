const arr = [3, 2, 9, 7, 1, 8, 5, 6, 4, 0]

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr

  const middle = Math.floor(arr.length / 2)

  const left = arr.slice(0, middle)
  const right = arr.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = []

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift()!)
    } else {
      result.push(right.shift()!)
    }
  }

  while(left.length) result.push(left.shift()!)
  while(right.length) result.push(right.shift()!)

  return result
}

// @ts-ignore
if (import.meta.vitest) {
  // @ts-ignore
  const { expect, it } = import.meta.vitest

  it('merge-sort', () => {
    expect(mergeSort(arr)).toMatchInlineSnapshot(`
      [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
      ]
    `)
  })
}
