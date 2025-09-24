export const useSmoother = () => {
  const smoother = useState('smoother', () => null)
  return smoother
}
