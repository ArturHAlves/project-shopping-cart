const awesomeAPI = 'https://cep.awesomeapi.com.br/json';
const brasilAPI = 'https://brasilapi.com.br/api/cep/v2';

export const getAddress = async (CEP) => { // Pega os dados da API de CEP
  const cepAwesome = await fetch(`${awesomeAPI}/${CEP}`);
  const cepBrasil = await fetch(`${brasilAPI}/${CEP}`);
  const response = await Promise.any([cepAwesome, cepBrasil]); // Promise.any se algum não funcionar vai outro
  const data = await response.json();
  // console.log(data);
  return data;
};

// CEP = 01001000

// Elementos HTML
const inputCep = document.querySelector('.cep-input'); // Vai ser o input do cep
const spanCartAddress = document.querySelector('.cart__address'); // Vai aparecer o endereço

export const searchCep = async () => {
  const getValueInput = inputCep.value;
  const CEP = 8; // cep contém 8 digitos
  if (getValueInput.length !== CEP || !Number(getValueInput)) {
    spanCartAddress.textContent = 'CEP não encontrado';
    return;
  }
  const data = await getAddress(getValueInput);
  const { city, state } = data;
  const street = data.street || data.address; // palavras diferente com o mesmo sentido: rua
  const district = data.district || data.neighborhood; // palavras diferente com o mesmo sentido: bairro
  spanCartAddress.textContent = `${street} - ${district} - ${city} - ${state}`;
};
