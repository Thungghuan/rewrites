const arr = [3, 2, 9, 7, 1, 8, 5, 6, 4, 0]

function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr

  const middle = arr[Math.floor(arr.length / 2)]
  const left = []
  const right = []

  for (let i = 0; i < arr.length; ++i) {
    if (i === Math.floor(arr.length / 2)) continue

    if (arr[i] <= middle) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat(middle, quickSort(right))
}

// @ts-ignore
if (import.meta.vitest) {
  // @ts-ignore
  const { expect, it } = import.meta.vitest

  it('quick-sort', () => {
    expect(quickSort(arr)).toMatchInlineSnapshot(`
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
