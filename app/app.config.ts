export default defineAppConfig({
  ui: {

    colors: {
      primary: '#47E29F',
      secondary: '#003D99',
      accent: '#359F71'
    },

    icons: {
      loading: 'line-md:loading-loop',
      check: 'material-symbols:check-rounded'
    },

    button: {
      slots: {
        base: [
          'cursor-pointer',
        ]
      }
    },

    formField: {
      slots: {
        error: 'italic',
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

    slideover: {
      slots: {
        overlay: 'bg-primary/10 backdrop-blur-xs',
      }
    },

    checkbox: {
      variants: {
        color: {
          primary: {
            base: 'focus-visible:outline-primary',
            indicator: 'bg-primary ring ring-inset ring-black rounded-sm '
          },
        },
        size: {
          xxl: {
            base: 'size-5.5',
            container: 'h-6',
            wrapper: 'text-base'
          }
        }
      }
    }
    

  }
})
