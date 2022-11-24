import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('Verifica se "fetchProduct" é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });
  it('Verifica o argumento da função "fetchProduct" e se o fetch foi chamado ', async () => {
    await fetchProduct('MLB1405519561');

    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se o fetch é chamado com o endpoint correto ao executar "fetchProducts"', async () => {
    await fetchProduct('MLB1405519561');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1405519561';

    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Teste se o retorno da função "fetchProduct" com argumento, é uma estrutura de dados igual ao objeto "produto" ', async () => {
    const response = await fetchProduct('MLB1405519561');

    expect(response).toEqual(product);
  });
  it('Teste se, ao chamar a função "fetchProduct" sem argumento, retornar uma mensagem de erro', () => {
    const message = 'ID não informado';

    expect(() => fetchProduct()).rejects.toThrowError(message);
  });
});
