const arr = [3, 2, 9, 7, 1, 8, 5, 6, 4, 0]

function swap(arr: number[], i: number, j: number) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function createHeap(arr: number[]) {
  const result = arr.slice()

  for (let i = Math.floor(result.length / 2); i >= 0; --i) {
    heapify(result, i)
  }

  return result
}

function heapify(arr: number[], parent: number, len?: number) {
  const left = parent * 2 + 1
  const right = parent * 2 + 2
  len = len ?? arr.length

  let largest = parent

  if (left < len && arr[left] > arr[largest]) largest = left
  if (right < len && arr[right] > arr[largest]) largest = right

  if (largest !== parent) {
    swap(arr, parent, largest)
    heapify(arr, largest, len)
  }
}

function heapSort(arr: number[]) {
  let len = arr.length

  const result = createHeap(arr)

  for (let i = len - 1; i >= 0; --i) {
    swap(result, 0, i)
    len--
    heapify(result, 0, len)
  }

  return result
}

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest

  it('array', () => {
    expect(heapSort(arr)).toMatchInlineSnapshot(`
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
