let grafoSemExtensao = {
  n_vertices: 5,
  lista: [
    { index_vertice: 1, ligacao: [{ vertice: 3, peso: 10 }, { vertice: 2, peso: 5 }] },
    { index_vertice: 2, ligacao: [{ vertice: 1, peso: 5 }, { vertice: 4, peso: 10 }, { vertice: 5, peso: 5 }] },
    { index_vertice: 3, ligacao: [{ vertice: 1, peso: 10 }] },
    { index_vertice: 4, ligacao: [{ vertice: 2, peso: 5 }] },
    { index_vertice: 5, ligacao: [{ vertice: 2, peso: 5 }] }
  ]
}

const arrayVertices = [ [ 1, 2 ], [ 0, 2 ], [ 1, 0, 3 ], [ 2 ] ]
const nVertices = 4

function printVertexCover(arrayVertices: any, nVertices: number) {

  let visitados = new Array(nVertices)
  for (let i = 0; i < nVertices; i++) {
    visitados[i] = false;
  }

  for (let u = 0; u < nVertices; u++) {
    if (visitados[u] == false) {
      for (let i = 0; i < arrayVertices[u].length; i++) {
        let v = arrayVertices[u][i];
          if (visitados[v] == false) {
              visitados[v] = true;
              visitados[u]  = true;
              break;
          }
      }
    }
  }

  for (let j = 0; j < nVertices; j++) {
    if (visitados[j]) {
      console.log(j+" ");
    }
  }
}

printVertexCover(arrayVertices, nVertices)

// var V = 5;
// var parent = Array(V).fill(0);
 
// // Find set of vertex i
// function find(i) {
//   while (parent[i] != i)
//     i = parent[i];
//   return i;
// }
 
// Does union of i and j. It returns
// false if i and j are already in same
// set.
// function union1(i, j) {
//   var a = find(i);
//   var b = find(j);
//   parent[a] = b;
// }

// Finds MST using Kruskal's algorithm
// function kruskalMST(cost) {
//   var mincost = 0; // Cost of min MST.

//   // Initialize sets of disjoint sets.
//   for (var i = 0; i < V; i++)
//       parent[i] = i;

//   // Include minimum weight edges one by one
//   var edge_count = 0;
//   while (edge_count < V - 1) {
//     var min = INF, a = -1, b = -1;
//     for (var i = 0; i < V; i++) {
//       for (var j = 0; j < V; j++) {
//         if (find(i) != find(j) && cost[i][j] < min) {
//           min = cost[i][j];
//           a = i;
//           b = j;
//         }
//       }
//     }

//     union1(a, b);
//     document.write(`Edge ${edge_count++}:(${a},
//     ${b}) cost:${min} <br>`);
//     mincost += min;
//   }
//   document.write(`<br> Minimum cost= ${mincost} <br>`);
// }
 
// Driver code
 
/* Let us create the following graph
        2 3
    (0)--(1)--(2)
    | / \ |
    6| 8/ \5 |7
    | /     \ |
    (3)-------(4)
            9         */
// var cost = [
//   [INF, 2, INF, 6, INF],
//   [2, INF, 3, 8, 5],
//   [INF, 3, INF, INF, 7],
//   [6, 8, INF, INF, 9],
//   [INF, 5, 7, 9, INF]
// ];
// // Print the solution
// kruskalMST(cost);


// for (let lista of grafoSemExtensao.lista) {
//   for (let ligacao of lista.ligacao) {

//   }
// }

// NOVO GRAFO [
//   { index_vertice: 1, ligacao: [ 2, 3 ] },
//   { index_vertice: 2, ligacao: [ 4, 5 ] }
// ]

// [ [ 1, 2 ], [ 0, 2 ], [ 1, 0, 3 ], [ 2 ] ]

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
