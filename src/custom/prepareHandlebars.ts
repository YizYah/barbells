import {registerPartials} from './registerPartials'
import {registerHelpers} from './registerHelpers'
import {createHandlebars} from './createHandlebars'

export async function prepareHandlebars(projectDir: string) {

  const Handlebars = createHandlebars()

  try {
    await registerPartials(`${projectDir}/partials`)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    throw new Error(`error registering the partials at ${projectDir}.
It may be that the template location is faulty, or that the template is not
correctly specified:
${error}`)
  }

  try {
    await registerHelpers(`${projectDir}/helpers`)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    throw new Error(`error registering the helpers at ${projectDir}.
It may be that the template location is faulty, or that the template is not
correctly specified:
${error}`)
  }

  return Handlebars
}
