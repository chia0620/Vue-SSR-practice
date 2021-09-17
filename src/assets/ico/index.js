const useIcon = () => {
  const requireAll = requireContext => requireContext.keys().map(requireContext)
  const req = require.context('@/assets/ico', false, /\.svg$/)
  requireAll(req)

  console.log(req)
}

export {
  useIcon
}
