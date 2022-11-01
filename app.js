const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL,USDT-BRL,CAD-BRL,AUD-BRL,EUR-BRL,GBP-BRL,ARS-BRL,JPY-BRL,CHF-BRL,BTC-BRL,LTC-BRL,CNY-BRL,ILS-BRL";
const result = document.querySelector("#result");
const btn = document.querySelector("#btnResult");
const less = document.querySelector("#less");
const plus = document.querySelector("#plus");
const input = document.querySelector("input");
const resetBtn = document.querySelector("#resetBtn");
const app = document.querySelector('#app');
const number = document.querySelector("#n");
const option = document.querySelector('#selectedCoin');
const darkmode = document.querySelector('#toggle');
const dropBtn = document.querySelector('#dropBtn');
const status = document.querySelector('#quotation');
const dropdown = document.querySelector('#dropdown');


(function(){

  fetch(url)
  .then((resp) => resp.json())
  .then((data) => {

    let coins = Array.from(Object.values(data).slice(1));

    coins.forEach(item => {

      const coin = document.createElement('div');
      let price = parseFloat(item.low);

      coin.innerHTML = item.name.slice(0, item.name.indexOf('/'));
      coin.setAttribute('class', 'py-3 option');coin.setAttribute('price', price);
      dropdown.appendChild(coin);
      let sign = item.code;
      
      coin.addEventListener('click', ()=> {
        switchClass(dropdown, 'dropon', 'dropoff');
        option.innerHTML = coin.innerHTML;
        option.setAttribute('price', price);option.setAttribute('value', sign);
        updateStatus();   
      });

    });


  });
})();

const convert = () => {  
  let convValue = option.getAttribute('price');
  convValue = number.value / convValue;
  if (option.innerHTML === "Moeda") {
    return 0;
  }
  else {
    result.innerHTML = `$ ${convValue.toFixed(2)}`;
  }
}

const updateStatus = ()=> {
  let statusValue = option.getAttribute('price');
  status.innerHTML = '$ ' + parseFloat(statusValue).toFixed(2);
};

btn.addEventListener("click", () => {
  if(number.value >= 1) {
    convert();
  }
});

less.addEventListener('click', ()=> {
  if (number.value >= 1) {
    number.value -=1;
    convert();
  }
});

plus.addEventListener('click', ()=> {
   if(number.value >= 0) {
     number.value ++;
     convert();
   }
});

input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    if(number.value >= 1) {
      convert();
    }
  }
});

resetBtn.addEventListener('click', ()=> {
  input.value = '';
  option.value = '';
  result.innerHTML = '$ 0.00';
  option.innerHTML = 'Moeda';
  status.innerHTML = '$ 0.00';
});

dropBtn.addEventListener('click', ()=> {
  switchClass(dropdown, 'dropon', 'dropoff');
});

const switchClass = (obj, c1, c2) => {
  obj.classList.toggle(c1);
  obj.classList.toggle(c2);
}

darkmode.addEventListener('click', ()=> {
  switchClass(app, 'theme-1', 'theme-2');
});

input.focus();
