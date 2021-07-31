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

const calc = (value, coin) => {
  let f = value / coin;
  coin = parseFloat(coin);
  div.innerHTML = '$ ' + f.toFixed(2);
};

const convert = () => {
  
  let v = option.value;

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {

      const api = data;

      const coins = [
        [`${api.USD.high}`, "dol"], 
        [`${api.EUR.high}`, "eur"], 
        [`${api.CAD.high}`, "cad"], 
        [`${api.LTC.high}`, "ltc"],
        [`${api.CHF.high}`, "chf"], 
        [`${api.AUD.high}`, "aud"]
      ];

      coins.forEach(c => {
        if (v === c[1]) {
          calc(number.value, c[0])
        }
      })
  });
}

const updateStatus = ()=> {

  let val = option.value;
  const status = document.querySelector('#cotacao');

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {

      const api = data;

      const coins = [
        [`${api.USD.high}`, "dol"], 
        [`${api.EUR.high}`, "eur"], 
        [`${api.CAD.high}`, "cad"], 
        [`${api.LTC.high}`, "ltc"],
        [`${api.CHF.high}`, "chf"], 
        [`${api.AUD.high}`, "aud"]
      ];

      coins.forEach(c => {
        if (val === c[1]) {
          let stts = parseFloat(c[0]);
          status.innerHTML = `$ ${stts.toFixed(2)}`;
        }
      })
  })
}

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

const dropAnim = (val)=> {
  val.classList.toggle('dropoff');
  val.classList.toggle('dropon');
}

drop.addEventListener('click', ()=> {
  dropAnim(document.querySelector('#b'));
});

op.forEach(item => {
  item.addEventListener('click', ()=> {
    dropAnim(document.querySelector('#b'));
    option.innerHTML = item.innerHTML;
    option.value = item.id;
    updateStatus();
  })
})

darkmode.addEventListener('click', ()=> {
  app.classList.toggle('theme-2');
  app.classList.toggle('theme-1');
});

input.focus();