import Grafo from "../entity/grafo";
import Vertice from "../entity/vertice";

export default class DeterminarGrauDadoVertice {
  constructor () {}

  execute (grafo: Grafo, vertice: number): number | string {
    const [vert] = grafo.lista.filter((vert) => vert.index_vertice === vertice)
    if (vert) {
      const grau = vert.ligacao.length
      return grau
    }
    return 'Vertice não existe!'
  }
}