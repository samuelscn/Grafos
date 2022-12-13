import Grafo from "../entity/grafo";

export default class BuscaEmProfundidadeDadoGrafo {
  constructor () {}

  busca (grafo: Array<any>, vertice: any, visitados: Array<number>) {
    visitados.push(vertice+1)
    for (let vizinho of grafo[vertice]) {
      if (!visitados.includes(vizinho)) {
        this.busca(grafo, vizinho-1, visitados)
      }
    }
  }

  execute (grafo: Grafo) {
    const matrizVertices = []
    let visitados: Array<number> = []
    for (let lista of grafo.lista) {
      matrizVertices.push(lista.ligacao.map((elem: any) => parseInt(elem, 10)).sort((a, b) => a - b))
      // matrizVertices.push(lista.ligacao.map((elem: any) => elem.vertice))
    }
    this.busca(matrizVertices, 0, visitados)
    console.log('Vertices visitados', visitados)
  }
}