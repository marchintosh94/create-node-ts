#!/usr/bin/env node
import { input, select } from '@inquirer/prompts'
import * as logo from 'asciiart-logo'
import { getPackageJson } from './packageJson'
import { tsconfigJson } from './tsconfigJson'
import * as fs from 'fs'
import { execSync } from 'child_process'

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
  fs.writeFileSync('src/index.ts', '')
  console.log('✅ src/index.ts created')

  //install dev dependencies
  console.log('Installing dev dependencies...')
  execSync('npm install --save-dev typescript', { stdio: 'inherit' })
  console.log('✅ typescript installed')
  execSync('npm install --save-dev ts-node', { stdio: 'inherit' })
  console.log('✅ ts-node installed')
  execSync('npm install --save-dev jest', { stdio: 'inherit' })
  console.log('✅ jest installed')
  execSync('npm install --save-dev @types/jest', { stdio: 'inherit' })
  console.log('✅ @types/jest installed')
  execSync('npm install --save-dev @types/node', { stdio: 'inherit' })
  console.log('✅ @types/node installed')
  execSync('npm install --save-dev ts-jest', { stdio: 'inherit' })
  console.log('✅ ts-jest installed')
  execSync('npm install --save-dev husky', { stdio: 'inherit' })
  console.log('✅ husky installed')
  execSync('npm install --save-dev lint-staged', { stdio: 'inherit' })
  console.log('✅ lint-staged installed')
  console.log('✅ All dev dependencies installed')

  //copy all configuration files from template folder
  console.log('Copying configuration files...')
  fs.copyFileSync('../template/jest.config.ts', 'jest.config.ts')
  console.log('✅ jest.config.ts copied')
  fs.copyFileSync('../template/.gitignore', '.gitignore')
  console.log('✅ .gitignore copied')
  fs.copyFileSync('../template/.prettierrc', '.prettierrc')
  console.log('✅ .prettierrc copied')
  fs.copyFileSync('../template/.prettierignore', '.prettierignore')
  console.log('✅ .prettierignore copied')

  //init and config husky and lint-staged
  console.log('Configuring husky...')
  execSync('npx husky init', { stdio: 'inherit' })
  execSync("echo 'npm test' >> .husky/pre-commit", { stdio: 'inherit' })
  execSync("echo 'npx lint-staged' >> .husky/pre-commit", { stdio: 'inherit' })
  console.log('✅ husky configured')

  //init git
  console.log('Initializing git...')
  execSync('git init -b main', { stdio: 'inherit' })

  console.log('✅ All done!')
  console.log('Happy coding! 🚀')
}

main()
