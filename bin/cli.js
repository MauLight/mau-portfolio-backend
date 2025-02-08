#!/usr/bin/env node

const { execSync } = require('child_process')
const { existsSync, mkdirSync } = require('fs')
const ora = require('ora')

const projectName = process.argv[2] || 'symetria-back-app'
const spinner = ora(`Execution of new project: ${projectName}...`).start()

try {
    if (!existsSync(projectName)) {
        mkdirSync(projectName)
    }

    execSync(`npx degit MauLight/symetria-backend ${projectName}`, { stdio: 'inherit' })
    spinner.text = 'Installing dependencies...'
    execSync(`cd ${projectName} && npm install`, { stdio: 'inherit' })
    spinner.succeed('Done! Symetria is ready.')
} catch (error) {
    spinner.fail('An error ocurred.')
    console.log(error)
}