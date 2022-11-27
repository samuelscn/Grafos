import Grafo from "../entity/grafo";
import DeterminarGrauDadoVertice from "./determinar-grau-dado-vertice";

export default class RetornarSequenciaGrausDadoGrafo {
  constructor (
    private readonly determinarGrauDadoVertice: DeterminarGrauDadoVertice
  ) {}

  execute (request: Grafo): Array<number> {
    const { lista } = request
    let sequencia: Array<any> = []
    lista.forEach((vertice) => {
      sequencia.push(this.determinarGrauDadoVertice.execute(request, vertice.index_vertice))
    })
    return sequencia.sort((b, a) => a - b)
  }
}