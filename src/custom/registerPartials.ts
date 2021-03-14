import {expandNsAbbreviations} from './expandNsbbreviations'

const path = require('path')
const fs = require('fs-extra')

export async function registerPartial(path: string, name: string, Handlebars: any) {
  let templateString = ''
  try {
    templateString = await fs.readFile(path, 'utf-8')
  } catch (error) {
    throw new Error(`couldn't read the partial file '${path}'`)
  }

  templateString = expandNsAbbreviations(templateString)
  Handlebars.registerPartial(name, templateString)
}

export async function registerPartials(dir: string, Handlebars: any) {
  // console.log(`about to list partials in ${dir}`)
  if (!await fs.pathExists(dir)) return
  const partials: [string] = await fs.readdir(dir)
  await Promise.all(partials.map(async fileName => {
    const filePath = `${dir}/${fileName}`
    const fileType = path.parse(filePath).ext

    if (fs.lstatSync(filePath).isDirectory()) {
      await registerPartials(filePath, Handlebars)
      return
    }

    if (fileType === '.hbs' || fileType === '.handlebars') {
      const partialName = path.parse(filePath).name
      await registerPartial(filePath, partialName, Handlebars)
    }
  },))
}
