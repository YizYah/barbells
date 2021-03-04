import {expandNsAbbreviations} from './expandNsbbreviations'
// const {fileMatchesCustomFileFilter} = require('magicalstrings').fileMatchesCustomFileFilter
// import {Configuration}  from 'magicalstrings'
const minimatch = require('minimatch')
const fs = require('fs-extra')

export async function loadFileTemplate(
  pathString: string, Handlebars: any, fileFilter: string|null, noFileInfo = false
) {
  // noFileInfo suppresses generation of a file info tag at the beginning of the template.
  let template = ''

  try {
    template = await fs.readFile(pathString, 'utf-8')
    if (!noFileInfo &&
      fileFilter &&
      minimatch(
        pathString.slice(0, -4), fileFilter, {dot: true, matchBase: true}
      )
    ) {
      template = '{{nsFile}}\n' + template // add file info automatically.
    }

    template = expandNsAbbreviations(template)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    throw new Error(`error finding the file ${pathString}.
It may be that the template location is faulty, or that the template is not
correctly specified:
${error}`)
  }

  return Handlebars.compile(template)
}
