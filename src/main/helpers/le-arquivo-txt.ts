import { readFileSync } from 'fs'

export default class LeArquivoTxt {
  constructor () {}

  execute () {
    try {
      const data = readFileSync('../arquivo.txt', 'utf8')
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }
}