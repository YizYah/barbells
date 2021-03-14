import test from 'ava'

import {prepareHandlebars} from '../../src/custom/prepareHandlebars'
import {loadFileTemplate} from '../../src/custom/loadFileTemplate'

test('creates error for nonexistent projectDir' +
  '', async t => {
  const projectDir = '~/temp/nonexistent'

  const error = await t.throwsAsync(async () => {
    await prepareHandlebars(projectDir)
  }, undefined)

  t.is(error.message, 'projectDir not found: ~/temp/nonexistent')
})


test('does not create error when partials or helpers do not exist.' +
  '', async t => {
  const projectDir = __dirname + '/template/general' // the dir exists but contains no helpers or partials
  const Handlebars = await prepareHandlebars(projectDir)
  t.deepEqual(Handlebars.JavaScriptCompiler.RESERVED_WORDS.abstract, true)
})


test('creates a Handlebars', async t => {
    const projectDir = __dirname + '/template'
    const Handlebars = await prepareHandlebars(projectDir)
    t.deepEqual(Handlebars.JavaScriptCompiler.RESERVED_WORDS.abstract, true)
  },
)

test('registers handlebars curly helper', async t => {
    const projectDir = __dirname + '/template'
    const Handlebars = await prepareHandlebars(projectDir)
    t.deepEqual(Handlebars.helpers.curly(), '}')
  },
)

test('test safe helpers', async t => {
    const projectDir = __dirname + '/template'
    const Handlebars = await prepareHandlebars(projectDir)
    const myFunc = Handlebars.compile('{{start startName}}' +
      '{{safe escaped}}bar' +
      '{{start startName}}' +
      '{{customStart customStarting}}' +
      'middle ' + '{{curly open}}test{{curly}}' +
      '{{customEnd customEnding}}' +
      '{{custom customLocation}}' +
      '{{help someone}}' +
      '{{end ending}}')

    t.deepEqual(myFunc({
      startName: 'startName', escaped: '<foo>', customStarting: 'customStarting',
      middle: 'middle of the road', customEnding: 'customEnding', customLocation: 'customLocation',
      ending: 'ending', someone: 'someone',
    }), '__NS_OPEN__ ns__start_section startName __NS_CLOSE__' +
      '<foo>bar' +
      '__NS_OPEN__ ns__start_section startName __NS_CLOSE__' +
      '__NS_OPEN__ ns__custom_start customStarting __NS_CLOSE__' +
      'middle {test}' +
      '__NS_OPEN__ ns__custom_end customEnding __NS_CLOSE__' +
      `__NS_OPEN__ ns__custom_start customLocation __NS_CLOSE__\n` +
      '__NS_OPEN__ ns__custom_end customLocation __NS_CLOSE__' +
      'help someone' +
      '__NS_OPEN__ ns__end_section ending __NS_CLOSE__')
  },
)

test('loadFileTemplate runs', async t => {
    const projectDir = __dirname + '/template'
    const Handlebars = await prepareHandlebars(projectDir)
    const pathString = projectDir + '/partials/START_OF_FILE.hbs'
    const loadedTemplate = await loadFileTemplate(pathString, Handlebars, null)
    t.regex(await loadedTemplate({}), /This file has been partially generated/)
  },
)
