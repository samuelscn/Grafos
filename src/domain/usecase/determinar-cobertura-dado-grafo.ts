export default class DeterminarCoberturaDadoGrafo {
  constructor () {}

  algoritmoAproximado(arrayVertices: any, nVertices: number) {
    let visitados = new Array(nVertices)
    for (let i = 0; i < nVertices; i++) {
      visitados[i] = false;
    }
  
    for (let u = 0; u < nVertices; u++) {
      if (visitados[u] == false) {
        for (let i = 0; i < arrayVertices[u].length; i++) {
          let v = arrayVertices[u][i];
            if (visitados[v] == false) {
                visitados[v] = true;
                visitados[u]  = true;
                break;
            }
        }
      }
    }
  
    for (let j = 0; j < nVertices; j++) {
      if (visitados[j]) {
        console.log(j+" ");
      }
    }
  }

  execute (grafo: any): void {
    let arrayVertices =  []
    for (let vertice of grafo.lista) {
      arrayVertices.push(vertice.ligacao)
    }
    this.algoritmoAproximado(arrayVertices, grafo.n_vertices)
  }
}