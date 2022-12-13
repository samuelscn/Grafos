

export default class DeterminarCicloDadoGrafo {
  constructor () {}

  naoTemCiclo (grafo: any, nVertices: number) {
    let arrayVertices =  []
    let visitados: Array<Boolean> = Array(nVertices).fill(false)
    for (let vertice of grafo) {
      arrayVertices.push(vertice.ligacao)
    }
  
    for (let i = 0; i < nVertices; i++) {
      if (!visitados[i] && this.temCicloConectado(arrayVertices, i, nVertices, visitados)) {
        return true
      }
    }
    return false
  }

  temCicloConectado (arrayVertices: any, indice: number, nVertices: number, visitados: Array<Boolean>) {
    let vizinho = Array(nVertices).fill(-1)
  
    let q = []
  
    visitados[indice] = true
    q.push(indice)
    while (q.length !== 0) {
      let u: any = q.shift()
  
      for (let i = 0; i < arrayVertices[u].length; i++) {
        let v = arrayVertices[u][i]
        if (!visitados[v]) {
          visitados[v] = true
          q.push(v)
          vizinho[v] = u
        } else if (vizinho[u] !== v) {
          return true
        }
      }
    }
    return false
  }

  execute (grafo: any): string {
    if (this.naoTemCiclo(grafo.lista, grafo.n_vertices)) {
      return 'Tem Ciclo'
    }
    return 'Não tem Ciclo'
  }
}