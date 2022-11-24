import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('Verifica se "fetchProductsList" é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('Verifica se o fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador')

    expect(fetch).toHaveBeenCalled()
  });

  it('Verifica se o fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador')
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toHaveBeenCalledWith(endpoint)
  });
  it('Teste se a função fetchProductsList tem como retorno uma estrutura de dados igual ao objeto "computadorSearch"' , async () => {
    const response = await fetchProductsList('computador')

    expect(response).toEqual(computadorSearch)
  })
  it('Teste se ao passar a função fetchProductsList sem argumentos, retorna um erro com a mensagem "Termo de busca não informado"', async () => {
    const response = await fetchProductsList();
    expect(response).rejects.toThrowError('Termo de busca não informado');
  })
  
});
