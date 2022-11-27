import Grafo from "../entity/grafo";
import DeterminarExcentricidadeDadoVertice from "./determinar-excentricidade-dado-vertice";

export default class DeterminarDiametroDadoGrafo {
  constructor (
    private readonly determinarExcentricidadeDadoVertice: DeterminarExcentricidadeDadoVertice
  ) {}

  execute (request: Grafo) {
    const { lista } = request
    let arrayDiametro: Array<number> = []

    for (let vertice of lista) {
      arrayDiametro.push(this.determinarExcentricidadeDadoVertice.execute(request, vertice.index_vertice))
    }

    arrayDiametro = arrayDiametro.sort((a, b) => a - b)
    const diametro = arrayDiametro[arrayDiametro.length - 1]
    return diametro
  }
}