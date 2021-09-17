export default () => {
  const req = require.context('@/assets/ico', false, /\.svg$/)
  const requireAll = requireContext => requireContext.keys().map(requireContext)
  const svgContent = requireAll(req)

  let symbolContent = ''

  svgContent.map(item => {
    symbolContent = symbolContent + item.default.content
  })

  const pageContent =
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0" id="__SVG_SPRITE_NODE__">
          ${symbolContent}
      </svg>`
  // console.log(pageContent)
  return pageContent
}
