import path from 'path'

const rootPath = path.resolve(__dirname)
const publicPath = path.join(rootPath, 'public')
const srcPath = path.join(rootPath, 'src')
const controllersPath = path.join(srcPath, 'controllers')

export { rootPath, publicPath, srcPath, controllersPath }
