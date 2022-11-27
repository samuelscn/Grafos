import Grafo from "../entity/grafo";

export default class RetornarOrdem {
  constructor () {}

  execute (request: Grafo): Number {
    return request.n_vertices
  }
}