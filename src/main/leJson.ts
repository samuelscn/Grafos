import { exit } from "process"
import axios from "axios"
import AmpliarGrafo from "../domain/usecase/ampliar-grafo"
import CriarGrafo from "../domain/usecase/criar-grafo"
import DeterminarArvoreGeradoraMinimaDadoMatrizPeso from "../domain/usecase/determinar-arvore-geradora-minima-dado-matriz-peso"
import DeterminarCentroDadoGrafo from "../domain/usecase/determinar-centro-dado-grafo"
import DeterminarCicloDadoGrafo from "../domain/usecase/determinar-ciclo-dado-grafo"
import DeterminarCoberturaDadoGrafo from "../domain/usecase/determinar-cobertura-dado-grafo"
import DeterminarDiametroDadoGrafo from "../domain/usecase/determinar-diametro-dado-grafo"
import DeterminarExcentricidadeDadoVertice from "../domain/usecase/determinar-excentricidade-dado-vertice"
import DeterminarGrauDadoVertice from "../domain/usecase/determinar-grau-dado-vertice"
import DeterminarRaioDadoGrafo from "../domain/usecase/determinar-raio-dado-grafo"
import RetornarOrdem from "../domain/usecase/retornar-ordem"
import RetornarSequenciaGrausDadoGrafo from "../domain/usecase/retornar-sequencia-graus-dado-grafo"
import RetornarTamanho from "../domain/usecase/retornar-tamanho"
import RetornarVizinhoDadoVertice from "../domain/usecase/retornar-vizinho-dado-vertice"
import CriarMatrizPesos from "./helpers/criar-matriz-pesos"
import AmpliarGrafoPonderado from "../domain/usecase/ampliar-grafo-ponderado"
import BuscaEmProfundidadeDadoGrafo from "../domain/usecase/busca-em-profundidade-dado-grafo"

const readline = require('readline')

const grafo = require('./Grafo')

let grafoNaoPonderado: any
axios.get('http://localhost:5000/api/buscarGrafoNaoPonderado')
  .then((value: any) => {
    grafoNaoPonderado = value.data
  })

let grafoPonderado: any
axios.get('http://localhost:5000/api/buscarGrafoPonderado')
  .then((value: any) => {
    grafoPonderado = value.data
  })

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
console.log('grafoSemExtensao', grafoSemExtensao.lista)

for (let data of grafoData.lista) {
  data.ligacao.sort((a: any, b: any) => a - b)
}

const leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// const ampliarGrafo = new AmpliarGrafo()
// const grafoAmpliado = ampliarGrafo.execute(grafoSemExtensao)
// console.log('GRAFO AMPLIADO', grafoAmpliado.lista)

const criarGrafo = new CriarGrafo()
const novoGrafo = criarGrafo.execute(grafoSemExtensao)
console.log('NOVO GRAFO', novoGrafo.lista)

const menuHome = `Bem vindo ao trabalho de grafos!\n
  Digite os números a seguir para executar o caso de uso desejado:\n
  1 - Ler de um Arquivo TXT (Não esqueça de iniciar o Servidor Python como descrito na documentação)\n
  2 - Ler de um Arquivo JSON\n`

leitor.question(menuHome, (resposta: any) => {
  if (resposta == 1) {
    const menu = `Digite os números a seguir para executar o caso de uso desejado:\n
      1 - Retornar a ordem do grafo\n
      2 - Retornar o tamanho do grafo\n
      3 - Retornar os vizinhos de um vértice fornecido\n
      4 - Determinar o grau de um vértice fornecido\n
      5 - Retornar a sequência de graus do grafo\n
      6 - Determinar a excentricidade de um vértice\n
      7 - Determinar o raio do grafo\n
      8 - Determinar o diâmetro do grafo\n
      9 - Determinar o centro do grafo\n
      10 - Verificar se um grafo possui ciclo\n
      11 - Determinar arvore geradora minima\n
      12 - Determinar cobertura minima atráves do Algoritmo Aproximado\n`

    leitor.question(menu, (res: any) => {
      if (res == 1) {
        const retornarOrdem = new RetornarOrdem()
        console.log('Ordem:', retornarOrdem.execute(grafoNaoPonderado))
        exit(1)
      }

      if (res == 2) {
        const retornarTamanho = new RetornarTamanho()
        console.log('Tamanho:', retornarTamanho.execute(grafoNaoPonderado))
        exit(1)
      }

      if (res == 3) {
        const ampliarGrafo = new AmpliarGrafo()
        const grafoAmpliado = ampliarGrafo.execute(grafoNaoPonderado)
        const retonarVizinhoDadoVertice = new RetornarVizinhoDadoVertice()
        console.log('Vizinhos:', retonarVizinhoDadoVertice.execute(grafoAmpliado, 2))
        exit(1)
      }

      if (res == 4) { 
        const ampliarGrafo = new AmpliarGrafo()
        const grafoAmpliado = ampliarGrafo.execute(grafoNaoPonderado)
        const determinarGrauDadoVertice = new DeterminarGrauDadoVertice()
        console.log('Grau:', determinarGrauDadoVertice.execute(grafoAmpliado, 1))
        exit(1)
      }

      if (res == 5) {
        const ampliarGrafo = new AmpliarGrafo()
        const grafoAmpliado = ampliarGrafo.execute(grafoNaoPonderado)
        const determinarGrauDadoVertice = new DeterminarGrauDadoVertice()
        const retornarSequenciaGrausDadoGrafo = new RetornarSequenciaGrausDadoGrafo(determinarGrauDadoVertice)
        console.log(retornarSequenciaGrausDadoGrafo.execute(grafoAmpliado))
        exit(1)
      }

      if (res == 6) {
        const ampliarGrafo = new AmpliarGrafo()
        const grafoAmpliado = ampliarGrafo.execute(grafoNaoPonderado)
        const determinarExcentricidadeDadoVertice = new DeterminarExcentricidadeDadoVertice()
        console.log(determinarExcentricidadeDadoVertice.execute(grafoAmpliado, 1))
        exit(1)
      }

      if (res == 7) {
        const ampliarGrafo = new AmpliarGrafo()
        const grafoAmpliado = ampliarGrafo.execute(grafoNaoPonderado)
        const determinarExcentricidadeDadoVertice = new DeterminarExcentricidadeDadoVertice()
        const determinarRaioDadoGrafo = new DeterminarRaioDadoGrafo(determinarExcentricidadeDadoVertice)
        console.log(determinarRaioDadoGrafo.execute(grafoAmpliado))
        exit(1)
      }

      if (res == 8) {
        const ampliarGrafo = new AmpliarGrafo()
        const grafoAmpliado = ampliarGrafo.execute(grafoNaoPonderado)
        const determinarExcentricidadeDadoVertice = new DeterminarExcentricidadeDadoVertice()
        const determinarDiametroDadoGrafo = new DeterminarDiametroDadoGrafo(determinarExcentricidadeDadoVertice)
        console.log(determinarDiametroDadoGrafo.execute(grafoAmpliado))
        exit(1)
      }
      
      if (res == 9) {
        const ampliarGrafo = new AmpliarGrafo()
        const grafoAmpliado = ampliarGrafo.execute(grafoNaoPonderado)
        const determinarExcentricidadeDadoVertice = new DeterminarExcentricidadeDadoVertice()
        const determinarCentroDadoGrafo = new DeterminarCentroDadoGrafo(determinarExcentricidadeDadoVertice)
        console.log(determinarCentroDadoGrafo.execute(grafoAmpliado))
        exit(1)
      }

      if (res == 10) {
        const ampliarGrafo = new AmpliarGrafo()
        const grafoAmpliado = ampliarGrafo.execute(grafoNaoPonderado)
        const determinarCicloDadoGrafo = new DeterminarCicloDadoGrafo()
        console.log(determinarCicloDadoGrafo.execute(grafoAmpliado))
        exit(1)
      }

      if (res == 11) {
        let grafo = {
          n_vertices: 5,
          lista: [
            { index_vertice: 1, ligacao: [{ vertice: 3, peso: 10 }, { vertice: 2, peso: 5 }] },
            { index_vertice: 2, ligacao: [{ vertice: 1, peso: 5 }, { vertice: 4, peso: 10 }, { vertice: 5, peso: 5 }] },
            { index_vertice: 3, ligacao: [{ vertice: 1, peso: 10 }] },
            { index_vertice: 4, ligacao: [{ vertice: 2, peso: 5 }] },
            { index_vertice: 5, ligacao: [{ vertice: 2, peso: 5 }] }
          ]
        }

        const ampliarGrafoPonderado = new AmpliarGrafoPonderado()
        const grafoPonderadoAmpliado = ampliarGrafoPonderado.execute(grafoPonderado)
        const criarMatrizPesos = new CriarMatrizPesos()
        const matrizPesos = criarMatrizPesos.execute(grafoPonderadoAmpliado)
        console.log('matrizPesos', matrizPesos)
        const determinarArvoreGeradoraMinimaDadoMatrizPeso = new DeterminarArvoreGeradoraMinimaDadoMatrizPeso()
        determinarArvoreGeradoraMinimaDadoMatrizPeso.execute(matrizPesos, grafo.n_vertices)
        exit(1)
      }

      if (res == 12) {
        const ampliarGrafo = new AmpliarGrafo()
        const grafoAmpliado = ampliarGrafo.execute(grafoNaoPonderado)
        const determinarCoberturaDadoGrafo = new DeterminarCoberturaDadoGrafo()
        determinarCoberturaDadoGrafo.execute(grafoAmpliado)
        exit(1)
      }

      if (res == 13) {
        const ampliarGrafo = new AmpliarGrafo()
        const grafoAmpliado = ampliarGrafo.execute(grafoNaoPonderado)
        console.log('grafoAmpliado', grafoAmpliado.lista)
        const buscaEmProfundidadeDadoGrafo = new BuscaEmProfundidadeDadoGrafo()
        buscaEmProfundidadeDadoGrafo.execute(grafoAmpliado)
        exit(1)
      }
    })
  }

  if (resposta == 2) {
    const menu = `Digite os números a seguir para executar o caso de uso desejado:\n
      1 - Retornar a ordem do grafo\n
      2 - Retornar o tamanho do grafo\n
      3 - Retornar os vizinhos de um vértice fornecido\n
      4 - Determinar o grau de um vértice fornecido\n
      5 - Retornar a sequência de graus do grafo\n
      6 - Determinar a excentricidade de um vértice\n
      7 - Determinar o raio do grafo\n
      8 - Determinar o diâmetro do grafo\n
      9 - Determinar o centro do grafo\n
      10 - Verificar se um grafo possui ciclo\n
      11 - Determinar arvore geradora minima\n
      12 - Determinar cobertura minima através do Algoritmo Aproximado\n`
    leitor.question(menu, (res: any) => {
      if (res == 1) {
        const retornarOrdem = new RetornarOrdem()
        console.log('Ordem:', retornarOrdem.execute(novoGrafo))
        exit(1)
      }
    
      if (res == 2) {
        const retornarTamanho = new RetornarTamanho()
        console.log('Tamanho:', retornarTamanho.execute(novoGrafo))
        exit(1)
      }
    
      if (res == 3) {
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
    
      if (res == 4) {
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
    
      if (res == 5) {
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
    
      if (res == 6) {
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
    
      if (res == 7) {
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
    
      if (res == 8) {
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
    
      if (res == 9) {
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

      if (res == 10) {
        const ampliarGrafo = new AmpliarGrafo()
        const grafoAmpliado = ampliarGrafo.execute(grafoSemExtensao)
        const determinarCicloDadoGrafo = new DeterminarCicloDadoGrafo()
        console.log(determinarCicloDadoGrafo.execute(grafoAmpliado))
        exit(1)
      }

      if (res == 11) {
        let grafo = {
          n_vertices: 5,
          lista: [
            { index_vertice: 1, ligacao: [{ vertice: 3, peso: 10 }, { vertice: 2, peso: 5 }] },
            { index_vertice: 2, ligacao: [{ vertice: 1, peso: 5 }, { vertice: 4, peso: 10 }, { vertice: 5, peso: 5 }] },
            { index_vertice: 3, ligacao: [{ vertice: 1, peso: 10 }] },
            { index_vertice: 4, ligacao: [{ vertice: 2, peso: 5 }] },
            { index_vertice: 5, ligacao: [{ vertice: 2, peso: 5 }] }
          ]
        }

        const criarMatrizPesos = new CriarMatrizPesos()
        const matrizPesos = criarMatrizPesos.execute(grafo)
        const determinarArvoreGeradoraMinimaDadoMatrizPeso = new DeterminarArvoreGeradoraMinimaDadoMatrizPeso()
        determinarArvoreGeradoraMinimaDadoMatrizPeso.execute(matrizPesos, grafo.n_vertices)
        exit(1)
      }

      if (res == 12) {
        const ampliarGrafo = new AmpliarGrafo()
        const grafoAmpliado = ampliarGrafo.execute(grafoSemExtensao)
        const determinarCoberturaDadoGrafo = new DeterminarCoberturaDadoGrafo()
        determinarCoberturaDadoGrafo.execute(grafoAmpliado)
        exit(1)
      }
    })
  }
})
