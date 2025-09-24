export default () => {
  const config = useRuntimeConfig()
  const originUrl = config.public.ORIGIN
  return {
    originUrl,
    truncate: (str, value = 100, ends = '...') => { 
      return `${(str || '').substring(0, value)}${str?.length > value ? ends : ''}`
    },
  }
}