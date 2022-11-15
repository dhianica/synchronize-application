import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()
let configPath
let parameterPath
const jsonConfig = 'config.json'
if (fs.existsSync(path.dirname(jsonConfig)) || fs.existsSync(path.dirname('parameter.json'))) {
  configPath = JSON.parse(fs.readFileSync(path.resolve('config', jsonConfig)))
  parameterPath = JSON.parse(fs.readFileSync(path.resolve('config', 'parameter.json')))

  if (!fs.existsSync(configPath.path_logs)) {
    fs.mkdirSync(configPath.path_logs)
  }
  if (!fs.existsSync(configPath.path_info)) {
    fs.mkdirSync(configPath.path_info)
  }
} else {
  console.log('Missing file config.json or parameter.json')
  process.exit(1)
}

const config = {
  env: configPath,
  params: parameterPath,
  logs: configPath.path_logs,
  info: configPath.path_info,
}

export default config
