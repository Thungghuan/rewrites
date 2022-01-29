#!/usr/bin/env zx

let project = await question('Project name: ')

await $`cp -r bin/template ${project}`

let content = JSON.parse(
  (await fs.readFile(`${project}/package.json`)).toString()
)
content.name = 'rewrite_' + project
await fs.writeFile(`${project}/package.json`, JSON.stringify(content, null, 2))

console.log(`${project} created`)

let answer = await question('Do you want to install dependencies? [Y/n] ')
if (answer.toLowerCase() !== 'n') {
  await $`cd ${project} && npm install`
  await $`code ${project}`
  await $`git init`
} else {
  console.log('Type commands below to start your project yourself:\n')

  console.log(chalk.yellow(`cd ${project}`))
  console.log(chalk.yellow(`npm install`))
  console.log(chalk.yellow(`git init`))
}
