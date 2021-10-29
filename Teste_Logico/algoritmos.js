// Método que cria um novo array baseado nos valores passados

function metodoUm(vezes, valor) {
	const novoArray = [];
	let i = 0;
	while (i < vezes) {
		novoArray.push(valor);
		i++;
	}
	console.log(novoArray);
	return novoArray;
}

// Método que inverte um array
function metodoDois(array) {
  const novoArray2 = [];
	for (let i = array.length - 1; i >= 0; i--) {
    novoArray2.push(array[i]);
  }
	console.log(novoArray2);
  return novoArray2;
}

// Método que limpa os itens desnecessários (falsy) de um array
function metodoTres(array1) {
  const novoArray3 = array1.filter(Boolean);

  console.log(novoArray3);
  return novoArray3;
}

/* Método que a partir de um array de arrays, converte em 
um objeto com chave e valor*/
function metodoQuatro(array2) {
	const novoArray4 = Object.fromEntries(array2);

  console.log(novoArray4);
  return novoArray4;
}

/* Método que retorne um array, sem os itens passados 
por parâmetro depois do array de entrada*/
function metodoCinco(array3, ...args) {
	let i = 0, j = 0;

	const aux = [...args];
  while (i < array3.length || j < aux.length) {

    let index = array3.indexOf(aux[j]);

    if (index > -1) {
      array3.splice(index, 1);
      i++;
    } else {
      j++;
    }
  }
  console.log(array3);
  return array3;
}

// Método que retorne um array, sem valores duplicados
function metodoSeis(array4) {
  const novoArray5 = [];

  for (let i = 0; i < array4.length; i++) {
		let unique = array4[i];
    if (novoArray5.indexOf(unique) === -1) {
      novoArray5.push(unique);
    }
  }
  console.log(novoArray5);
  return novoArray5;
}

// Método que compara a igualdade de dois arrays e retorne um booleano
function metodoSete(arrayAux1, arrayAux2) {
  const resultado = (
		arrayAux1.length == arrayAux2.length && 
		arrayAux1.every(function(valor, index) {
    	return valor === arrayAux2[index];
  	})
	);
  console.log(resultado);
  return resultado;
}

// Método que remove os aninhamentos de um array de arrays para um array unique
function metodoOito(array5) {
  const novoArray6 = [];

  const resultado = array5.map(num3 => novoArray6.push(num3));

  console.log(resultado);
  return resultado;
}

// Método que divide um array por uma quantidade passada por parâmetro
function metodoNove(array6, num2) {
  const novoArray7 = [];

  for (let i = 0; i < array6.length; i += num2) {

    novoArray7.push(array6.slice(i, i + num2));
  }
	console.log(novoArray7);
  return novoArray7;
}

// Método que encontra os valores comuns entre dois arrays
function metodoDez(array7, array8) {
  const novoArray8 = array7.filter(num3 => array8.includes(num3));

  console.log(novoArray8);
  return novoArray8;
}

console.log('Resultado do método 1');
metodoUm(3,'a');

console.log('Resultado do método 2');
metodoDois([1,2,3,4]);

console.log('Resultado do método 3');
metodoTres([1,2,'', undefined]);

console.log('Resultado do método 4');
metodoQuatro([['c',2],['d',4]]);

console.log('Resultado do método 5');
metodoCinco([5,4,3,2,5], 5,3);

console.log('Resultado do método 6');
metodoSeis([1,2,3,3,2,4,5,4,7,3]);

console.log('Resultado do método 7');
metodoSete([1,2,3,4],[1,2,3,4]);

console.log('Resultado do método 8');
metodoOito([1, 2, [3], [4, 5]]);

console.log('Resultado do método 9');
metodoNove([1, 2, 3, 4, 5], 2);

console.log('Resultado do método 10');
metodoDez([6, 8], [8, 9]);
