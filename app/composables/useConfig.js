export default () => {
  const config = useRuntimeConfig()
  const originUrl = config.public.ORIGIN
  const shifterBg = useState('backgroundImage', () => '/img/bg-1.jpg')
  const bgVisible = useState('backgroundVisible', () => true)
  return {
    originUrl,
    shifterBg,
    bgVisible
  }
}