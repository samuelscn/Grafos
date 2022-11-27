import Grafo from "../entity/grafo";
import DeterminarExcentricidadeDadoVertice from "./determinar-excentricidade-dado-vertice";

export default class DeterminarRaioDadoGrafo {
  constructor (
    private readonly determinarExcentricidadeDadoVertice: DeterminarExcentricidadeDadoVertice
  ) {}

  execute (request: Grafo) {
    const { lista } = request
    let arrayRaio: Array<number> = []

    for (let vertice of lista) {
      arrayRaio.push(this.determinarExcentricidadeDadoVertice.execute(request, vertice.index_vertice))
    }

    arrayRaio = arrayRaio.sort((a, b) => a - b)
    const raio = arrayRaio[0]
    return raio
  }
}