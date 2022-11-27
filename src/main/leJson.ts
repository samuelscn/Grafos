import { exit } from "process"
import CriarGrafo from "../domain/usecase/criar-grafo"
import DeterminarCentroDadoGrafo from "../domain/usecase/determinar-centro-dado-grafo"
import DeterminarDiametroDadoGrafo from "../domain/usecase/determinar-diametro-dado-grafo"
import DeterminarExcentricidadeDadoVertice from "../domain/usecase/determinar-excentricidade-dado-vertice"
import DeterminarGrauDadoVertice from "../domain/usecase/determinar-grau-dado-vertice"
import DeterminarRaioDadoGrafo from "../domain/usecase/determinar-raio-dado-grafo"
import RetornarOrdem from "../domain/usecase/retornar-ordem"
import RetornarSequenciaGrausDadoGrafo from "../domain/usecase/retornar-sequencia-graus-dado-grafo"
import RetornarTamanho from "../domain/usecase/retornar-tamanho"
import RetornarVizinhoDadoVertice from "../domain/usecase/retornar-vizinho-dado-vertice"

const readline = require('readline')

const grafo = require('./Grafo')

const grafoData: any = {
  n_vertices: null,
  lista: []
}

let indice = -1

grafoData.n_vertices = grafo.data.nodes.length
const vertices = grafo.data.edges._data
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

const grafoSemExtensao = Object.assign({}, grafoData)
console.log('grafoSemExtensao', grafoSemExtensao)


for (let data of grafoData.lista) {
  data.ligacao.sort((a: any, b: any) => a - b)
}

const leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const criarGrafo = new CriarGrafo()
const novoGrafo = criarGrafo.execute(grafoSemExtensao)

const menu = `Bem vindo ao trabalho de grafos!\n
  Digite os números a seguir para executar o caso de uso desejado:\n
  1 - Retornar a ordem do grafo\n
  2 - Retornar o tamanho do grafo\n
  3 - Retornar os vizinhos de um vértice fornecido\n
  4 - Determinar o grau de um vértice fornecido\n
  5 - Retornar a sequência de graus do grafo\n
  6 - Determinar a excentricidade de um vértice\n
  7 - Determinar o raio do grafo\n
  8 - Determinar o diâmetro do grafo\n
  9 - Determinar o centro do grafo\n`

leitor.question(menu, (resposta: any) => {
  console.log(resposta)
  if (resposta == 1) {
    const retornarOrdem = new RetornarOrdem()
    console.log('Ordem:', retornarOrdem.execute(novoGrafo))
    exit(1)
  }

  if (resposta == 2) {
    const retornarTamanho = new RetornarTamanho()
    console.log('Tamanho:', retornarTamanho.execute(novoGrafo))
    exit(1)
  }

  if (resposta == 3) {
    let has = false

    for (let data of grafoData.lista) {
      for (let vertice of data.ligacao) {
        grafoData.lista.forEach((elem: any) => {
          if (elem.index_vertice === vertice) {
            has = true
          }
        })  
        if (!has) {
          grafoData.lista.push({
            index_vertice: vertice,
            ligacao: [data.index_vertice]
          })
        } else {
          for (let i = 0; i < grafoData.lista.length; i++) {
            if (grafoData.lista[i].index_vertice === vertice) {
              if (!grafoData.lista[i].ligacao.includes(data.index_vertice)) {
                grafoData.lista[i].ligacao.push(data.index_vertice)
              }
            }
          }
        }
        has = false
      }
    }
    const retonarVizinhoDadoVertice = new RetornarVizinhoDadoVertice()
    console.log('Vizinhos:', retonarVizinhoDadoVertice.execute(novoGrafo, 2))
    exit(1)
  }

  if (resposta == 4) {
    let has = false

    for (let data of grafoData.lista) {
      for (let vertice of data.ligacao) {
        grafoData.lista.forEach((elem: any) => {
          if (elem.index_vertice === vertice) {
            has = true
          }
        })  
        if (!has) {
          grafoData.lista.push({
            index_vertice: vertice,
            ligacao: [data.index_vertice]
          })
        } else {
          for (let i = 0; i < grafoData.lista.length; i++) {
            if (grafoData.lista[i].index_vertice === vertice) {
              if (!grafoData.lista[i].ligacao.includes(data.index_vertice)) {
                grafoData.lista[i].ligacao.push(data.index_vertice)
              }
            }
          }
        }
        has = false
      }
    }
    const determinarGrauDadoVertice = new DeterminarGrauDadoVertice()
    console.log('Grau:', determinarGrauDadoVertice.execute(novoGrafo, 1))
    exit(1)
  }

  if (resposta == 5) {
    let has = false

    for (let data of grafoData.lista) {
      for (let vertice of data.ligacao) {
        grafoData.lista.forEach((elem: any) => {
          if (elem.index_vertice === vertice) {
            has = true
          }
        })  
        if (!has) {
          grafoData.lista.push({
            index_vertice: vertice,
            ligacao: [data.index_vertice]
          })
        } else {
          for (let i = 0; i < grafoData.lista.length; i++) {
            if (grafoData.lista[i].index_vertice === vertice) {
              if (!grafoData.lista[i].ligacao.includes(data.index_vertice)) {
                grafoData.lista[i].ligacao.push(data.index_vertice)
              }
            }
          }
        }
        has = false
      }
    }
    const determinarGrauDadoVertice = new DeterminarGrauDadoVertice()
    const retornarSequenciaGrausDadoGrafo = new RetornarSequenciaGrausDadoGrafo(determinarGrauDadoVertice)
    console.log(retornarSequenciaGrausDadoGrafo.execute(novoGrafo))
    exit(1)
  }

  if (resposta == 6) {
    let has = false

    for (let data of grafoData.lista) {
      for (let vertice of data.ligacao) {
        grafoData.lista.forEach((elem: any) => {
          if (elem.index_vertice === vertice) {
            has = true
          }
        })  
        if (!has) {
          grafoData.lista.push({
            index_vertice: vertice,
            ligacao: [data.index_vertice]
          })
        } else {
          for (let i = 0; i < grafoData.lista.length; i++) {
            if (grafoData.lista[i].index_vertice === vertice) {
              if (!grafoData.lista[i].ligacao.includes(data.index_vertice)) {
                grafoData.lista[i].ligacao.push(data.index_vertice)
              }
            }
          }
        }
        has = false
      }
    }
    console.log(grafoData.lista)
    const determinarExcentricidadeDadoVertice = new DeterminarExcentricidadeDadoVertice()
    console.log(determinarExcentricidadeDadoVertice.execute(novoGrafo, 1))
    exit(1)
  }

  if (resposta == 7) {
    let has = false

    for (let data of grafoData.lista) {
      for (let vertice of data.ligacao) {
        grafoData.lista.forEach((elem: any) => {
          if (elem.index_vertice === vertice) {
            has = true
          }
        })  
        if (!has) {
          grafoData.lista.push({
            index_vertice: vertice,
            ligacao: [data.index_vertice]
          })
        } else {
          for (let i = 0; i < grafoData.lista.length; i++) {
            if (grafoData.lista[i].index_vertice === vertice) {
              if (!grafoData.lista[i].ligacao.includes(data.index_vertice)) {
                grafoData.lista[i].ligacao.push(data.index_vertice)
              }
            }
          }
        }
        has = false
      }
    }

    const determinarExcentricidadeDadoVertice = new DeterminarExcentricidadeDadoVertice()
    const determinarRaioDadoGrafo = new DeterminarRaioDadoGrafo(determinarExcentricidadeDadoVertice)
    console.log(determinarRaioDadoGrafo.execute(novoGrafo))
    exit(1)
  }

  if (resposta == 8) {
    let has = false

    for (let data of grafoData.lista) {
      for (let vertice of data.ligacao) {
        grafoData.lista.forEach((elem: any) => {
          if (elem.index_vertice === vertice) {
            has = true
          }
        })  
        if (!has) {
          grafoData.lista.push({
            index_vertice: vertice,
            ligacao: [data.index_vertice]
          })
        } else {
          for (let i = 0; i < grafoData.lista.length; i++) {
            if (grafoData.lista[i].index_vertice === vertice) {
              if (!grafoData.lista[i].ligacao.includes(data.index_vertice)) {
                grafoData.lista[i].ligacao.push(data.index_vertice)
              }
            }
          }
        }
        has = false
      }
    }

    const determinarExcentricidadeDadoVertice = new DeterminarExcentricidadeDadoVertice()
    const determinarDiametroDadoGrafo = new DeterminarDiametroDadoGrafo(determinarExcentricidadeDadoVertice)
    console.log(determinarDiametroDadoGrafo.execute(novoGrafo))
    exit(1)
  }

  if (resposta == 9) {
    let has = false

    for (let data of grafoData.lista) {
      for (let vertice of data.ligacao) {
        grafoData.lista.forEach((elem: any) => {
          if (elem.index_vertice === vertice) {
            has = true
          }
        })  
        if (!has) {
          grafoData.lista.push({
            index_vertice: vertice,
            ligacao: [data.index_vertice]
          })
        } else {
          for (let i = 0; i < grafoData.lista.length; i++) {
            if (grafoData.lista[i].index_vertice === vertice) {
              if (!grafoData.lista[i].ligacao.includes(data.index_vertice)) {
                grafoData.lista[i].ligacao.push(data.index_vertice)
              }
            }
          }
        }
        has = false
      }
    }

    const determinarExcentricidadeDadoVertice = new DeterminarExcentricidadeDadoVertice()
    const determinarCentroDadoGrafo = new DeterminarCentroDadoGrafo(determinarExcentricidadeDadoVertice)
    console.log(determinarCentroDadoGrafo.execute(novoGrafo))
    exit(1)
  }
})