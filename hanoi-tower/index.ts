let times = 0

const move = (n: number, from: string, to: string) => {
  times++
  console.log(`${times}. Move Disk-${n} from ${from} to ${to}.`)
}

const hanoi = (n: number, from: string, to: string, auxiliary: string) => {
  if (n === 1) {
    move(n, from, to)
  } else {
    hanoi(n - 1, from, auxiliary, to) // from FROM to AUXILiARY

    move(n, from, to)

    hanoi(n - 1, auxiliary, to, from)
  }
}

hanoi(3, 'FROM', 'TO', 'AUXILiARY')
