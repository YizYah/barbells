import test from 'ava';

import { prepareHandlebars } from '../../src/custom/prepareHandlebars'
import { loadFileTemplate } from '../../src/custom/loadFileTemplate'

test('creates error for nonexistent projectDir', async t => {
  const projectDir = '~/temp/nonexistent';

  const error = await t.throwsAsync(async () => {
    await prepareHandlebars(projectDir);
  }, undefined);

  t.regex(error.message, /error registering the partials at/);
});

test('creates a Handlebars', async t => {
  const projectDir = __dirname + '/template';
  const Handlebars = await prepareHandlebars(projectDir)
  t.deepEqual(Handlebars.JavaScriptCompiler.RESERVED_WORDS.abstract, true);
  }
);


test('registers handlebars curly helper', async t => {
    const projectDir = __dirname + '/template';
    const Handlebars = await prepareHandlebars(projectDir)
    t.deepEqual(Handlebars.helpers.curly(), '}');
  }
);


test('loadFileTemplate runs', async t => {
    const projectDir = __dirname + '/template';
    const Handlebars = await prepareHandlebars(projectDir)
  const pathString = projectDir + '/START_OF_FILE.hbs'
  const loadedTemplate = loadFileTemplate(pathString, Handlebars, null)
    t.deepEqual(loadedTemplate({}), '}');
  }
);
