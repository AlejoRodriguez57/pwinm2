export default function paginarArrey(arrey, itemsPorPagina) {
  const paginas = [];

  for (let i = 0; i < arrey.length; i += itemsPorPagina) {
    paginas.push(
      arrey.slice(i, i + itemsPorPagina)
    );
  }
  return paginas;
}