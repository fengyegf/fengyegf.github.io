/* This is a script to create a new project markdown file with front-matter */

import fs from "fs"
import path from "path"

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error(`Error: No filename argument provided
Usage: npm run new-project -- <filename>`)
  process.exit(1) // Terminate the script and return error code 1
}

let fileName = args[0]

// Add .md extension if not present
const fileExtensionRegex = /\.(md|mdx)$/i
if (!fileExtensionRegex.test(fileName)) {
  fileName += ".md"
}

const targetDir = "./src/content/projects/"
const fullPath = path.join(targetDir, fileName)

if (fs.existsSync(fullPath)) {
  console.error(`Error：File ${fullPath} already exists `)
  process.exit(1)
}

const content = `---
title: ${args[0]}
description: ''
image: ''
url: ''
status: developing
tags: []
---
`

fs.writeFileSync(path.join(targetDir, fileName), content)

console.log(`Project ${fullPath} created`)
