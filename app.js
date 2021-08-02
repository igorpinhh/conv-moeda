const url = "https://economia.awesomeapi.com.br/all";
const div = document.querySelector(".resultado");
const btn = document.querySelector("#btn");
const less = document.querySelector("#less");
const more = document.querySelector("#more");
const input = document.querySelector("input");
const reset = document.querySelector("#reset");
const app = document.querySelector('#app');
const number = document.querySelector("#n");
const option = document.querySelector('#esc');
const op = document.querySelectorAll('.option');
const darkmode = document.querySelector('#toggle');
const drop = document.querySelector('#drop')
const status = document.querySelector('#cotacao');
const b = document.querySelector('#b');


(function(){

  fetch(url)
  .then((resp) => resp.json())
  .then((data) => {
    const lo = Object.values(data)

    lo.forEach(item => {
      const coin = document.createElement('div');
      let pc = item.name.indexOf('/');
      coin.innerHTML = item.name.slice(0, pc);
      coin.id = item.code;
      coin.classList.add('option', 'p-2');
      let price = parseFloat(item.high)
      coin.setAttribute('price', price);
      b.appendChild(coin);
      let sign = item.code;

      coin.addEventListener('click', ()=> {
        togCl(b, 'dropon', 'dropoff');
        option.innerHTML = coin.innerHTML;
        option.id = item.code;
        option.setAttribute('price', price);
        option.setAttribute('value', sign);
        updateStatus();   
      })
    })
  });
})();


const convert = () => {  
  let priceVal = option.getAttribute('price');
  let res = number.value / priceVal;
  if (option.innerHTML === "Moeda") {
    return 0
  }
  else {
    div.innerHTML = `$ ${res.toFixed(2)}`;
  }
}

const updateStatus = ()=> {
  let price = option.getAttribute('price');
  status.innerHTML = '$ ' + parseFloat(price).toFixed(2);
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

more.addEventListener('click', ()=> {
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

reset.addEventListener('click', ()=> {
  input.value = '';
  div.innerHTML = '$ 0.00';
  option.innerHTML = 'Moeda';
  option.value = '';
  status.innerHTML = '$ 0.00';
});

drop.addEventListener('click', ()=> {
  b.classList.toggle('dropon');
  b.classList.toggle('dropoff');
});

const togCl = (obj, c1, c2) => {
  obj.classList.toggle(c1);
  obj.classList.toggle(c2);
}

darkmode.addEventListener('click', ()=> {
  togCl(app, 'theme-1', 'theme-2');
});

input.focus();
