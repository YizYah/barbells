import test from 'ava'

import {prepareHandlebars} from '../../src/custom/prepareHandlebars'
import {registerPartial} from '../../src/custom/registerPartials'

test('test error reading partial file', async t => {
    const pathString = '/nonexistent'
    const projectDir = __dirname + '/template'

    const Handlebars = await prepareHandlebars(projectDir)
    const error = await t.throwsAsync(async () => {
      await registerPartial(pathString, 'nonexistent', Handlebars)
    })
    t.is(error.message, 'couldn\'t read the partial file \'/nonexistent\'')
  },
)
