import test from 'ava'

import {loadFileTemplate} from '../../src/custom/loadFileTemplate'
import {prepareHandlebars} from '../../src/custom/prepareHandlebars'

test('loadFileTemplate generates file info', async t => {
    const projectDir = __dirname + '/template'
    const Handlebars = await prepareHandlebars(projectDir)
    const pathString = projectDir + '/standard/src/custom/test.js.hbs'
  const fileFilter = '+(*.{js,jsx,ts,tsx,md,yml}|.gitignore)'
    const loadedTemplate = await loadFileTemplate(pathString, Handlebars, fileFilter)
    t.regex(await loadedTemplate({fileInfo: 'abc file'}), /__NS_OPEN__ ns__file abc file __NS_CLOSE__/)
  },
)


test('loadFileTemplate catches errors', async t => {
  const projectDir = __dirname + '/template'
  const Handlebars = await prepareHandlebars(projectDir)
  const pathString = projectDir + '/standard/src/notThere/nonexistent.js.hbs'
  const fileFilter = '+(*.{js,jsx,ts,tsx,md,yml}|.gitignore)'
  const error = await t.throwsAsync(async () => {
    await loadFileTemplate(pathString, Handlebars, fileFilter)
  })
  console.log (`error =${JSON.stringify(error)}`)
  t.regex(error.message, /no such file/)
})
