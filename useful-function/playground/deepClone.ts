function cloneObject(target: { [key: string]: any }) {
  const newObj: { [key: string]: any } = {}

  for (const key in target) {
    if (Array.isArray(target[key])) {
      newObj[key] = cloneArray(target[key])
    } else if (target[key] instanceof Object) {
      newObj[key] = cloneObject(target[key])
    } else {
      newObj[key] = target[key]
    }
  }

  return newObj
}

function cloneArray(target: any[]): any[] {
  const newArray = []

  for (let i = 0; i < target.length; ++i) {
    if (Array.isArray(target[i])) {
      newArray[i] = cloneArray(target[i])
    } else if (target[i] instanceof Object) {
      newArray[i] = cloneObject(target[i])
    } else {
      newArray[i] = target[i]
    }
  }

  return newArray
}

const clone = (target: any) => {
  if (Array.isArray(target)) {
    return cloneArray(target)
  } else if (target instanceof Object) {
    return cloneObject(target)
  } else {
    return target
  }
}

if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest

  it('deepClone ', () => {
    const target = {
      field1: 1,
      field2: undefined,
      field3: {
        child: 'child'
      },
      field4: [[3], 2, 4, 8]
    }

    const newTarget = clone(target)
    newTarget.filed1 = 2
    newTarget.field3.child = 'new child'
    newTarget.field4[0].push(16)

    expect([target, newTarget]).toMatchInlineSnapshot(`
      [
        {
          "field1": 1,
          "field2": undefined,
          "field3": {
            "child": "child",
          },
          "field4": [
            [
              3,
            ],
            2,
            4,
            8,
          ],
        },
        {
          "field1": 1,
          "field2": undefined,
          "field3": {
            "child": "new child",
          },
          "field4": [
            [
              3,
              16,
            ],
            2,
            4,
            8,
          ],
          "filed1": 2,
        },
      ]
    `)
  })
}
