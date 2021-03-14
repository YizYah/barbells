import {registerPartials} from './registerPartials'
import {registerHelpers} from './registerHelpers'
import {createHandlebars} from './createHandlebars'
const fs = require('fs-extra')

export async function prepareHandlebars(projectDir: string) {
  if (!await fs.pathExists(projectDir)) throw new Error(`projectDir not found: ${projectDir}`)
  const Handlebars = createHandlebars()

  // I used to have these in try statements, but I can't find a way to get them to throw an error
  await registerPartials(`${projectDir}/partials`, Handlebars)
  await registerHelpers(`${projectDir}/helpers`, Handlebars)

  return Handlebars
}
