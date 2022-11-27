export default class GrafoSemExtensao {
  constructor () {}

  execute (request: any) {
    const grafoData: any = {
      n_vertices: null,
      lista: []
    }
    
    let indice = -1
    
    grafoData.n_vertices = request.data.nodes.length
    const vertices = request.data.edges._data
    for (let vert in vertices) {
      if (grafoData.lista.length > 0) {
        if (grafoData.lista.some((elem: any) => elem.index_vertice === vertices[vert].from)) {
          for (let i = 0; i < grafoData.lista.length; i++) {
            if (grafoData.lista[i].index_vertice === vertices[vert].from) {
              indice = i
            }
          }
    
          grafoData.lista[indice].ligacao.push(vertices[vert].to)
        } else {
          grafoData.lista.push({
            index_vertice: vertices[vert].from,
            ligacao: [vertices[vert].to]
          })
        }
      } else {
        grafoData.lista.push({
          index_vertice: vertices[vert].from,
          ligacao: [vertices[vert].to]
        })
      }
    }

    return grafoData
  }
}