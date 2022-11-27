type PropsGrafo = {
  n_vertices: number,
  lista: Array<Vertice>
}

interface Vertice {
  index_vertice: number,
  ligacao: Array<ListaEncadeada>
}

interface ListaEncadeada {
  vertice: number,
  peso: number
}

export default class Grafo {
  private props: PropsGrafo
  constructor (props: PropsGrafo) {
    this.props = props
  }

  set n_vertices (n_vertices) {
    this.props.n_vertices = n_vertices
  }

  set lista (lista) {
    this.props.lista = lista
  }

  get n_vertices () {
    return this.props.n_vertices
  }

  get lista () {
    return this.props.lista
  }
}