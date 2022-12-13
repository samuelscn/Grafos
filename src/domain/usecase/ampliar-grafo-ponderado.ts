import Grafo from "../entity/grafo";

export default class AmpliarGrafoPonderado {
  constructor () {}

  execute (request: any): Grafo {
    let novaLista: any = Object.assign([], request.lista)

    for (let i = 0; i < request.lista.length; i++) {
      for (let lista of request.lista.filter((elem: any) => elem.index_vertice !== i+1)) {
        if (lista.ligacao.some((elem: any) => elem.vertice == request.lista[i].index_vertice)) {
          if (!request.lista[i].ligacao.some((elem: any) => elem.vertice == lista.index_vertice)) {
            novaLista[i].ligacao.push({ vertice: lista.index_vertice, peso: 0 })
          }
        }
      }
    }

    for (let lista of request.lista) {
      for (let vertice of lista.ligacao) {
        if (!request.lista.some((elem: any) => elem.index_vertice == vertice.vertice)) {
          if (!novaLista.some((elem: any) => elem.index_vertice == vertice.vertice)) {
            novaLista.push({ index_vertice: vertice.vertice, ligacao: [] })
          }
        }
      }
    }

    for (let lista of novaLista.filter((elem: any) => elem.ligacao.length == 0)) {
      for (let vertice of request.lista) {
        if (vertice.ligacao.some((elem: any) => elem.vertice == lista.index_vertice)) {
          lista.ligacao.push({ vertice: vertice.index_vertice, peso: 0})
        }
      }
    }

    // for (let list of novaLista) {
    //   for (let i = 0; i< novaLista.ligacao.length; i++) {
    //     if (novaLista.ligacao[i].peso == 0) {
    //       if (novaLista.some((elem: any) => elem.index_vertice == novaLista.ligacao[i].vertice)) {
    //         novaLista.ligacao[]
    //       }
    //     }
    //   }
    // }

    const grafoAmpliado = new Grafo({
      n_vertices: request.n_vertices,
      lista: novaLista
    })

    return grafoAmpliado
  }
}