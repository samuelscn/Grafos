import Grafo from "../entity/grafo";
import DeterminarExcentricidadeDadoVertice from "./determinar-excentricidade-dado-vertice";

export default class DeterminarCentroDadoGrafo {
  constructor (
    private readonly determinarExcentricidadeDadoVertice: DeterminarExcentricidadeDadoVertice
  ) {}
  
  execute (request: Grafo): Array<number> {
    const { lista } = request
    let arrayCentro: Array<any> = []

    for (let vertice of lista) {
      arrayCentro.push({
        vertice: vertice.index_vertice,
        excentricidade: this.determinarExcentricidadeDadoVertice.execute(request, vertice.index_vertice)
      })
    }

    let arrayExcentricidade: Array<number> = []
    for (let vertice of arrayCentro) {
      arrayExcentricidade.push(vertice.excentricidade)
    }

    arrayExcentricidade = arrayExcentricidade.sort((a, b) => a - b)
    const menorExcentricidade = arrayExcentricidade[0]
    const centro = arrayCentro.map((elem) => {
      if (elem.excentricidade === menorExcentricidade) {
        return elem.vertice
      }
    })

    return centro
  }
}