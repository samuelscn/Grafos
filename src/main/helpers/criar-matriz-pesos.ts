export default class CriarMatrizPesos {
  constructor () {}

  execute (grafo: any) {
    const matrizPesos = []
    console.log(grafo.lista)

    let INF = 99999;
    for (let i = 0; i < grafo.n_vertices; i++) {
      let matAux = []
      for (let j = 0; j < grafo.n_vertices; j++) {
        if (grafo.lista[j].ligacao.some((elem: any) => elem.vertice == grafo.lista[i].index_vertice)) {
          let vert: any = grafo.lista[i].ligacao.find((elem: any) => elem.vertice == grafo.lista[j].index_vertice) 
          matAux.push(vert.peso)
        } else {
          matAux.push(INF)
        }
      }
      matrizPesos.push(matAux)
    }

    return matrizPesos
  }
}