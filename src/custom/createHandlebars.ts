const {placeholders} = require('magicalstrings').constants

export function createHandlebars() {
  const Handlebars = require('handlebars')
  require('handlebars-helpers')({
    handlebars: Handlebars,
  })
  Handlebars.registerHelper('curly', function (object: any, open: any) {
    return open ? '{' : '}'
  })

  Handlebars.registerHelper('safe', function (text: string) {
    return new Handlebars.SafeString(text)
  })

  Handlebars.registerHelper('start', function (locationName: string) {
    return new Handlebars.SafeString(placeholders.OPEN_COMMENT +
      ` ns__start_section ${locationName} ` +
      placeholders.CLOSE_COMMENT)
  })

  Handlebars.registerHelper('end', function (locationName: string) {
    return new Handlebars.SafeString(placeholders.OPEN_COMMENT +
      ` ns__end_section ${locationName} ` +
      placeholders.CLOSE_COMMENT)
  })

  Handlebars.registerHelper('custom', function (locationName: string) {
    return new Handlebars.SafeString(placeholders.OPEN_COMMENT +
      ` ns__custom_start ${locationName} ` +
      placeholders.CLOSE_COMMENT + '\n' +
      placeholders.OPEN_COMMENT +
      ` ns__custom_end ${locationName} ` +
      placeholders.CLOSE_COMMENT)
  })

  Handlebars.registerHelper('customStart', function (locationName: string) {
    return new Handlebars.SafeString(placeholders.OPEN_COMMENT +
      ` ns__custom_start ${locationName} ` +
      placeholders.CLOSE_COMMENT)
  })

  Handlebars.registerHelper('customEnd', function (locationName: string) {
    return new Handlebars.SafeString(placeholders.OPEN_COMMENT +
      ` ns__custom_end ${locationName} ` +
      placeholders.CLOSE_COMMENT)
  })
  return Handlebars
}
