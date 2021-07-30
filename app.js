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

input.focus();

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

      let dolar = api.USD.high;
      let euro = api.EUR.high;
      let cad = api.CAD.high;
      let ltc = api.LTC.high;
      let chf = api.CHF.high;
      let aud = api.AUD.high;

      if (v === "dol") {
        calc(number.value, dolar);
      } 

      else if (v === "") {
        status.innerHTML = '$ 0.00';
      } 
      
      else if (v === "eur") {
        calc(number.value, euro);
      } 

      else if (v === "cad") {
        calc(number.value, cad);
      }

      else if (v === "ltc") {
        calc(number.value, ltc);
      }

      else if (v === "aud") {
        calc(number.value, aud);
      }

      else if (v === "chf") {
        calc(number.value, chf);
      }
      
      else {
        return 0
    }
  });
}

const updateStatus = ()=> {

  let c = option.value;
  const status = document.querySelector('#cotacao');

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {

      const api = data;

      let dolar = api.USD.high;
      let euro = api.EUR.high;
      let cad = api.CAD.high;
      let ltc = api.LTC.high;
      let chf = api.CHF.high;
      let aud = api.AUD.high;

      if (c === 'dol') {
        const d = parseFloat(dolar)
        status.innerHTML = `$  ${d.toFixed(2)}`;
      }

      if (c === 'eur') {
        const d = parseFloat(euro)
        status.innerHTML = `$  ${d.toFixed(2)}`;
      }

      if (c === 'cad') {
        const d = parseFloat(cad)
        status.innerHTML = `$  ${d.toFixed(2)}`;
      }

      if (c === 'ltc') {
        const d = parseFloat(ltc)
        status.innerHTML = `$  ${d.toFixed(2)}`;
      }

      if (c === 'chf') {
        const d = parseFloat(chf)
        status.innerHTML = `$  ${d.toFixed(2)}`;
      }

      if (c === 'aud') {
        const d = parseFloat(aud)
        status.innerHTML = `$  ${d.toFixed(2)}`;
      }
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
     number.value ++
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
});

const dropAnim = (val)=> {
  val.classList.toggle('dropoff');
  val.classList.toggle('dropon');
}


drop.addEventListener('click', ()=> {
  dropAnim(document.querySelector('#b'));
})

op.forEach(item => {
  item.addEventListener('click', ()=> {
    dropAnim(document.querySelector('#b'));
    option.innerHTML = item.innerHTML;
    option.value = item.id;
    updateStatus();
  })
})

darkmode.addEventListener('click', ()=> {
  app.classList.toggle('theme-2')
  app.classList.toggle('theme-1')
})