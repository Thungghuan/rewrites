#!/usr/bin/env zx

let project = await question('Project name: ')

await $`cp -r bin/template ${project}`

let content = JSON.parse(
  (await fs.readFile(`${project}/package.json`)).toString()
)
content.name = 'rewrite_' + project
await fs.writeFile(`${project}/package.json`, JSON.stringify(content, null, 2))

await $`echo '# Rewrite ${project}' >> ${project}/README.md`

console.log(`${project} created`)

let answer = await question('Do you want to install dependencies? [Y/n] ')
if (answer.toLowerCase() !== 'n') {
  await $`cd ${project}`
  await $`pnpm install`
  await $`code ${project}`
} else {
  console.log('Use commands below to start your project yourself:\n')

  console.log(chalk.yellow(`cd ${project}`))
  console.log(chalk.yellow(`pnpm install`))
}
