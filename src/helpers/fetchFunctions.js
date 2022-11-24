const itemsAPI = 'https://api.mercadolibre.com/items'; // API com endpoint do produto/ID

export const fetchProduct = async (id) => {
  if (!id) {
    throw new Error('ID não informado'); // Se o ID não for encontrado vai retornar um erro
  }
  const response = await fetch(`${itemsAPI}/${id}`);
  const data = await response.json();
  // console.log(data);
  return data;
};

const API = 'https://api.mercadolibre.com/sites/MLB/search?q='; // API com endpoint de busca

export const fetchProductsList = async (busca) => { // Se a busca não existir vai retornar um erro
  if (!busca) {
    throw new Error('Termo de busca não informado');
  }
  const response = await fetch(`${API}${busca}`);
  const data = await response.json();
  // console.log(data);
  return data.results;
};
