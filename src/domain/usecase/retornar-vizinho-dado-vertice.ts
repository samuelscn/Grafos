import Grafo from "../entity/grafo";
import Vertice from "../entity/vertice";

export default class RetornarVizinhoDadoVertice {
  constructor () {}

  execute (grafo: Grafo, vertice: number): Array<any> | string {
    const [vert] = grafo.lista.filter((vert) => vert.index_vertice === vertice)
    if (vert) {
      return vert.ligacao
    }
    return 'Vertice não existe!'
  }
}