export default () => {
  const config = useRuntimeConfig()
  const originUrl = config.public.ORIGIN
  const shifterBg = useState('backgroundImage', () => '/img/bg-1.jpg')
  return {
    originUrl,
    truncate: (str, value = 100, ends = '...') => { 
      return `${(str || '').substring(0, value)}${str?.length > value ? ends : ''}`
    },
    shifterBg
  }
}