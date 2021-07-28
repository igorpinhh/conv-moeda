const url = "https://economia.awesomeapi.com.br/all";


const div = document.querySelector(".resultado");
const btn = document.querySelector("#btn");
const less = document.querySelector("#less");
const more = document.querySelector("#more");
const input = document.querySelector("input");
const reset = document.querySelector("#reset");
const dark = document.querySelector('#th1');
const light = document.querySelector('#th2');
const app = document.querySelector('#app');
const number = document.querySelector("#n");
const moeda = document.querySelector("#moeda");
const status = document.querySelector('#cotacao');

input.focus();

const calc = (value, moeda) => {
  let f = value / moeda;
  moeda = parseFloat(moeda);
  div.innerHTML = '$ ' + f.toFixed(2);
  status.innerHTML = '$ ' + moeda.toFixed(2);
};

const ajax = () => {
  
  let v = moeda.value;

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

      if (v === "dolar") {
        calc(number.value, dolar);
      } 

      else if (v === "") {
        status.innerHTML = '$ 0.00';
      } 
      
      else if (v === "euro") {
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
        div.innerHTML = "deu erro ai vacilao";
    }
  });
}

btn.addEventListener("click", () => {
  if(number.value >= 1) {
    ajax()
  }
});

less.addEventListener('click', ()=> {
  if(moeda.value !== "") {
    if (number.value >= 1) {
      number.value -=1;
      ajax();
    }
  }
});

more.addEventListener('click', ()=> {
  let v = document.querySelector("#n");

   if(v.value <= -1 || moeda.value != "") {
     v.value ++
     ajax();
   } else {
     alert('tu tem q escolher uma moeda ai vacilao')
    // document.querySelector('#error-target').classList.add('erro')
  }
})

input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    if(number.value >= 1) {
      ajax()
    }
  }
});


reset.addEventListener('click', ()=> {
  input.value = '';
  div.innerHTML = 0;
});

dark.addEventListener('click', ()=> {
  if( app.classList.contains('theme-2') == true ){
    app.classList.remove('theme-2');
    app.classList.add('theme-1');
  }
})

light.addEventListener('click', ()=> {
  if( app.classList.contains('theme-1') == true ){
    app.classList.remove('theme-1');
    app.classList.add('theme-2');
  }
})