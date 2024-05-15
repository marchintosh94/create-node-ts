#!/usr/bin/env node
import { input, select } from '@inquirer/prompts'
import * as logo from 'asciiart-logo'
import { getPackageJson } from './packageJson'
import { tsconfigJson } from './tsconfigJson'
import * as fs from 'fs'
import { execSync } from 'child_process'
import * as path from 'path'
import * as chalk from 'chalk'

const wantsCreateNewFolder = async () =>
  await select({
    message: 'Do you want to create a new folder?',
    choices: [
      {
        value: 'yes',
        name: 'Yes'
      },
      {
        value: 'no',
        name: 'No'
      }
    ]
  })

const getProjectName = async () =>
  await input({
    message: 'Enter the project name:',
    default: 'typescript-nodejs-project'
  })

const getFullLogo = () =>
  logo({
    name: 'TypeScript NodeJS',
    font: 'ANSI Shadow',
    borderColor: 'grey',
    logoColor: 'bold-cyan',
    textColor: 'cyan'
  })
    .emptyLine()
    .center('Create a Typescript NodeJS project')
    .emptyLine()
    .emptyLine()
    .right('version 1.0.0')
    .right('Author: @marchintosh')

const main = async () => {
  /* available fonts:
    Big Money-ne
    Broadway 
    DOS Rebel 
  */
  const asciiLogo = getFullLogo()
  console.log(asciiLogo.render())
  console.log('Welcome to Typescript NodeJS project creator')
  const projectName = await getProjectName()
  const wantsCreateFolder = await wantsCreateNewFolder()

  if (wantsCreateFolder === 'yes') {
    fs.mkdirSync(projectName)
    process.chdir(projectName)
    console.log(`✅ Folder ${projectName} created`)
  }

  const packageJson = getPackageJson(projectName)
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2))
  console.log('✅ package.json created')
  const tsconfig = tsconfigJson
  fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, 2))
  console.log('✅ tsconfig.json created')
  fs.mkdirSync('src')
  console.log('✅ src folder created')
  fs.writeFileSync('src/index.ts', 'console.log("Hello NodeTS! 🚀")')
  console.log('✅ src/index.ts created')
  console.log('')

  //install dev dependencies
  console.log('Installing dev dependencies...')
  const devDependencies = [
    'typescript',
    'jest',
    'ts-jest',
    'husky',
    'lint-staged',
    '@types/jest',
    '@types/node',
    'ts-node'
  ]
  execSync(`npm install --save-dev -s ${devDependencies.join(' ')}`, {
    stdio: 'inherit'
  })
  console.log(`✅ ${chalk.greenBright('typescript')} installed`)
  console.log(`✅ ${chalk.greenBright('ts-node')} installed`)
  console.log(`✅ ${chalk.greenBright('jest')} installed`)
  console.log(`✅ ${chalk.greenBright('@types/jest')} installed`)
  console.log(`✅ ${chalk.greenBright('@types/node')} installed`)
  console.log(`✅ ${chalk.greenBright('ts-jest')} installed`)
  console.log(`✅ ${chalk.greenBright('husky')} installed`)
  console.log(`✅ ${chalk.greenBright('lint-staged')} installed`)
  console.log(`✅ All dev dependencies installed`)
  console.log('')

  //copy all configuration files from template folder
  console.log('Copying configuration files...')
  const templatePath = path.join(__dirname, 'template')
  const files = fs.readdirSync(templatePath)
  files.forEach((file) => {
    fs.copyFileSync(path.join(templatePath, file), file)
    console.log(`✅ ${file} copied`)
  })

  //init git
  console.log('')
  console.log('Initializing git...')
  const gitIgnore = [
    'node_modules',
    'dist',
    '.DS_Store',
    '.env.local',
    '.env.development.local',
    '.env.test.local',
    '.env.production.local',
    'coverage',
    'build'
  ]
  fs.writeFileSync('.gitignore', gitIgnore.join('\n'))
  execSync('git init -b main', { stdio: 'inherit' })
  console.log('✅ git initialized')

  //init and config husky and lint-staged
  console.log('')
  console.log('Configuring husky...')
  execSync('npx husky init', { stdio: 'inherit' })
  execSync("echo npx lint-staged >> .husky/pre-commit", { stdio: 'inherit' })
  console.log('✅ husky configured')

  console.log('')
  console.log('✅ All done!')
  console.log('Happy coding! 🚀')
}

main()
