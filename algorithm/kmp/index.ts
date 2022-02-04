const getNextMap = (pattern: string): number[] => {
  const patternLen = pattern.length

  if (patternLen === 0) {
    throw new Error('Empty pattern received.')
  }

  const next: number[] = []
  next.push(-1)

  if (patternLen > 1) {
    next.push(0)

    let prefixLen = 0
    let i = 1

    while (i < patternLen - 1) {
      if (pattern[i] === pattern[prefixLen]) {
        next[++i] = ++prefixLen
      } else if (prefixLen > 0) {
        prefixLen = next[prefixLen]
      } else {
        next[++i] = 0
      }
    }
  }

  return next
}

const kmp = (text: string, pattern: string): number | number[] => {
  const next = getNextMap(pattern)

  const n = text.length
  const m = pattern.length

  if (n < m) return -1

  let i = 0
  let j = 0
  const result: number[] = []

  while (i < n) {
    if (text[i] !== pattern[j]) {
      j = next[j]
    } else {
      if (j === m - 1) {
        result.push(i - m + 1)
        j = next[j]
      } else {
        i++
        j++
      }
    }

    if (j === -1) {
      i++
      j++
    }
  }

  return result.length === 0 ? -1 : result.length === 1 ? result[0] : result
}

const markIndex = (text: string, markIndex: ReturnType<typeof kmp>) => {
  console.log(text)
  if (typeof markIndex === 'number') markIndex = [markIndex]

  let arrowHead = ''

  for (let i = 0; i < text.length; ++i) {
    if (markIndex.includes(i)) {
      arrowHead += '^'
    } else {
      arrowHead += ' '
    }
  }

  console.log(arrowHead)
  console.log(`Pattern index: ${markIndex.join(' ')}\n`)
}

let text: string
let pattern: string

// pattern = 'abcdabc'
// console.log('pattern:', pattern)
// console.log(JSON.stringify(getNextMap(pattern)))

// pattern = 'xxxxxxxx'
// console.log('pattern:', pattern)
// console.log(JSON.stringify(getNextMap(pattern)))

// pattern = 'abababc'
// console.log('pattern:', pattern)
// console.log(JSON.stringify(getNextMap(pattern)))

text = 'abababcaabababcabab'

console.log('Text:', text)
console.log()

pattern = 'cabab'
console.log('Pattern:', pattern)
markIndex(text, kmp(text, pattern))

pattern = 'aba'
console.log('Pattern:', pattern)
markIndex(text, kmp(text, pattern))

pattern = 'aaa'
console.log('Pattern:', pattern)
markIndex(text, kmp(text, pattern))

pattern = 'aab'
console.log('Pattern:', pattern)
markIndex(text, kmp(text, pattern))
