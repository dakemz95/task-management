import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.indigo.darken1,
          secondary: colors.red.lighten4,
          danger: colors.red.darken1,
        }
      },
    },
  },
})

export default vuetify