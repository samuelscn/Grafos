// const fs = require('fs')


// fs.readFile('./src/main/arquivo.txt', 'utf8' , (err: any, data: any) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   let index = 0
//   let idxLinha = 1
//   let grafo: any = {}
//   let texto = JSON.stringify(data)
//   for (let dado of texto) {
//     if (index === 0) {
//         grafo.n_vertices = dado
//     }
//     if (dado !== '' && dado !== "", )
//   }
//   return
//   console.log(texto)
//   return
//   for (let linha of data) {
//     if (linha === '') {
//         console.log('entrei')
//     }
//     return
//     console.log(linha)
//     if (index === 0) {
//       teste.n_vertices = linha
//     }
//     if (linha !== null && index !== 0) {
//       if (idxLinha === 1) {
//         if (teste.lista && teste.lista.some((elem: any) => elem.index_vertice !== linha)) {
//           teste.lista.push({
//             index_vertice: linha,
//             ligacao: []
//           })
//         }
//       }

//       if (idxLinha === 2) {
//         const indice = teste.lista.indexOf((elem: any) => elem.index_vertice === linha)
//         if (indice === -1) {
//           teste.lista[index-1].ligacao.push({
//             vertice: linha
//           })
//         } else {
//           teste.lista[indice].ligacao.push({
//             vertice: linha
//           })
//         }
//       }

//       if (idxLinha === 3) {
//         const indice = teste.lista.indexOf((elem: any) => elem.index_vertice === linha)
//         if (indice === -1) {
//           const ultimaPosicao = teste.lista[index-1].ligacao.length - 1
//           teste.lista[index-1].ligacao[ultimaPosicao].peso = linha
//         } else {
//           const ultimaPosicao = teste.lista[indice].ligacao.length - 1
//           teste.lista[indice].ligacao[ultimaPosicao].peso = linha
//         }
//         index++
//         idxLinha = 1
//       }
//     }
//     if (index === 0) {
//         index++
//     }
//   }
//   console.log(teste)
//   // console.log(data)
// })
