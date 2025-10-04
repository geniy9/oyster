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

    input: {
      slots: {
        root: 'relative inline-flex items-center',
        base: [
          'placeholder:text-center placeholder:text-base placeholder:capitalize placeholder:text-dimmed',
        ],
        leading: 'absolute inset-y-0 start-0 flex items-center',
      },
      variants: {
        variant: {
          custom: 'text-center text-black bg-none focus:bg-none border-b border-black rounded-none'
        },
        size: {
          xxl: {
            base: 'px-3 py-2 text-2xl uppercase gap-2',
            leading: 'ps-3',
          }
        },
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
