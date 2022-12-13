export default class DeterminarArvoreGeradoraMinimaDadoMatrizPeso {
  constructor () {}

  procurar (i: number, parente: any) {
    while (parente[i] != i)
      i = parente[i];
    return i;
  }

  unir (i: number, j: number, parente: any) {
      let a = this.procurar(i, parente);
      let b = this.procurar(j, parente);
      parente[a] = b;
  }

  kruskal (matrizPesos: any, n_vertices: number, parente: any) {
    let custoMinimo = 0;
  
    for (let i = 0; i < n_vertices; i++) {
      parente[i] = i;
    }
  
    let contadoVertice = 0;
    while (contadoVertice < n_vertices - 1) {
      let min = 99999
      let a = -1
      let b = -1
      for (let i = 0; i < n_vertices; i++) {
        for (let j = 0; j < n_vertices; j++) {
          if (this.procurar(i, parente) != this.procurar(j, parente) && matrizPesos[i][j] < min) {
            min = matrizPesos[i][j];
            a = i;
            b = j;
          }
        }
      }
  
      this.unir(a, b, parente);
      console.log(`Vertice ${contadoVertice++}:(${a}, ${b}) Custo:${min}\n`);
      custoMinimo += min;
    }
    console.log(`Custo minimo = ${custoMinimo}`)
  }

  execute (matrizPesos: any, nVertices: number): void {
    let parente = Array(nVertices).fill(0);
    this.kruskal(matrizPesos, nVertices, parente)
  }
}