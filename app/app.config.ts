export default defineAppConfig({
  ui: {

    icons: {
      loading: 'line-md:loading-loop'
    },

    button: {
      slots: {
        base: [
          'cursor-pointer',
        ]
      }
    },

    card: {
      slots: {
        root: [
          'rounded-none',
        ]
      }
    },

  }
})
