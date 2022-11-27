import Grafo from "../entity/grafo";

export default class CriarGrafo {
  constructor () {}

  execute (request: any): Grafo {
    const grafo = new Grafo({
      n_vertices: request.n_vertices,
      lista: request.lista
    })

    return grafo
  }
}