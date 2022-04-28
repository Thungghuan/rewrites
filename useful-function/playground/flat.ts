const array = [
  1,
  2,
  3,
  4,
  [1, 2, 3, [1, 2, 3, [1, 2, 3]]],
  5,
  'string',
  { name: 'hi' }
]

// const flat = (arr: any[]) => {
//   const result: any[] = []

//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       result.push(...flat(arr[i]))
//     } else {
//       result.push(arr[i])
//     }
//   }

//   return result
// }

const flat = (arr: any[]): any[] => {
  return arr.reduce((prev, curr) => {
    return prev.concat(Array.isArray(curr) ? flat(curr) : curr)
  }, [])
}

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest

  it('flat', () => {
    expect(array.flat(Infinity)).toMatchInlineSnapshot(`
      [
        1,
        2,
        3,
        4,
        1,
        2,
        3,
        1,
        2,
        3,
        1,
        2,
        3,
        5,
        "string",
        {
          "name": "hi",
        },
      ]
    `)

    expect(flat(array)).toMatchInlineSnapshot(`
      [
        1,
        2,
        3,
        4,
        1,
        2,
        3,
        1,
        2,
        3,
        1,
        2,
        3,
        5,
        "string",
        {
          "name": "hi",
        },
      ]
    `)
  })
}
