import Grafo from "../entity/grafo";

export default class DeterminarExcentricidadeDadoVertice {
  constructor () {}

  search (
    grafo: Grafo,
    vizinho: number,
    numeroVertice: any,
    arrayVerticesVisitados: Array<any>,
  ): number {
    console.log({ grafo, vizinho, numeroVertice, arrayVerticesVisitados })
    const [vertice] = grafo.lista.filter((vert) => vert.index_vertice === numeroVertice)
    if (vertice.ligacao.some((elem) => elem.vertice === vizinho)) {
      return 1
    }

    for (let vert of vertice.ligacao) {
      if (!arrayVerticesVisitados.includes(vert)) {
        arrayVerticesVisitados.push(vert)
        let soma = this.search(grafo, vizinho, vert, arrayVerticesVisitados)
        return soma + 1
      }
    }
    return 1
  }

  execute (grafo: Grafo, numeroVertice: number) {
    let arrayDistancia: Array<number> = []
    let arrayVerticesVisitados: Array<number> = []
    let arrayPontosExcentricidade: Array<number> = []
    const [vertice] = grafo.lista.filter((vert) => vert.index_vertice === numeroVertice)
    for (let vert of grafo.lista) {
      if (vert.index_vertice == vertice.index_vertice) {
        arrayDistancia.push(0)
      }

      if (vertice.ligacao.some((elem) => elem.vertice === vert.index_vertice)) {
        arrayDistancia.push(1)
      }

      for (const vizinho of vertice.ligacao) {
        arrayVerticesVisitados.push(numeroVertice)
        let soma = this.search(grafo, vert.index_vertice, vizinho, arrayVerticesVisitados)
        arrayPontosExcentricidade.push(soma+1)
      }
      
      if (arrayPontosExcentricidade.length > 0) {
        arrayPontosExcentricidade = arrayPontosExcentricidade.sort((a, b) => a - b)
        arrayDistancia.push(arrayPontosExcentricidade[0])
        arrayPontosExcentricidade = []
      }
    }

    arrayDistancia = arrayDistancia.sort((a, b) => a - b)
    console.log('arrayDistancia', arrayDistancia)
    const excentricidade = arrayDistancia[arrayDistancia.length - 1]
    return excentricidade
  }
}