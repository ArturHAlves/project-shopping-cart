import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import {
  createProductElement,
  createCartProductElement,
  totalPrice,
} from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';

// buscar elementos:
const sectionProducts = document.querySelector('.products'); // section que vai aparecer os produtos
document.querySelector('.cep-button').addEventListener('click', searchCep); // Função CEP
const olCartProducts = document.querySelector('.cart__products'); // Lista que vai aparecer no carrinho
const seachInput = document.querySelector('.seach-input'); // Input de busca
const btnSeach = document.querySelector('.btn-seach'); // Botão que vai dar o evento da busca

// funções:

// Função para mostrar o erro na tela quando não for carregado
function showError() {
  const createH3 = document.createElement('h3');
  createH3.className = 'error';
  createH3.innerText =
    'Algum erro ocorreu, recarregue a página e tente novamente';
  sectionProducts.appendChild(createH3);
}

function showLoading(){
  const createParagraph = document.createElement('p'); // criar o elemento p
  createParagraph.innerText = 'carregando...';
  createParagraph.className = 'loading';
  sectionProducts.appendChild(createParagraph);
}

function removeLoading(){
  document.querySelector('.loading').remove();
};

// Função para mostrar os produtos na tela
async function showProductList(param) {
  try {
    showLoading(); // Vai mostrar uma mensagem de loading
    const fetch = await fetchProductsList(param); // vai pegar os dados da API
    removeLoading() // Quando aparecer os produtos, vai remover a msg de loading 
    fetch.forEach((produto) => {
      
      // Vai percorrer todos os elementos
      sectionProducts.appendChild(createProductElement(produto));
    });
  } catch (error) {
    showError(); // Vai mostrar o erro na tela
  }
}

// FUnção para salvar os itens dentro do carrinho de compra
async function saveProductCart() {
  const save = getSavedCartIDs(); // É um array de IDS (Consigo usar HOF)
  const getIDS = save.map(async (id) => {
    // É possível colocar async dentro de hof
    const fetch = fetchProduct(id);
    // console.log(fetch);
    return fetch;
  });
  const response = await Promise.all(getIDS);
  // console.log(response) // Está retornando um array
  response.forEach((productCart) => {
    totalPrice(productCart.price);
    // ForEach não retorna nada
    olCartProducts.appendChild(createCartProductElement(productCart));
  });
}

btnSeach.addEventListener('click', seach);

async function seach() {
  const produtosList = document.querySelector('.products');
  while (produtosList.firstChild) {
    produtosList.removeChild(produtosList.firstChild);
  }

  await showProductList(seachInput.value);
}

saveProductCart();
seach();
// showProductList(); // substituido pelo seach
