import Grafo from "../entity/grafo";

export default class RetornarTamanho {
  constructor () {}

  execute (request: Grafo): number {
    const { n_vertices, lista } = request
    let somaAresta = 0
    lista.forEach((vertice) => {
      somaAresta += vertice.ligacao.length
    })
    return n_vertices + somaAresta
  }
}