/* ns__file unit: standard, comp: src/index.ts */
/* ns__custom_start beginning */
import {temp} from './custom/temp'

const {loadFileTemplate} = require('./custom/loadFileTemplate')
const {prepareHandlebars} = require('./custom/prepareHandlebars')
/* ns__custom_end beginning */

/* types */
temp()
    /* ns__custom_start export */
module.exports = {
    loadFileTemplate,
    prepareHandlebars,
}
    /* ns__custom_end export */
/* constants */
