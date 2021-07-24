const url = "https://economia.awesomeapi.com.br/all";


const div = document.querySelector(".resultado");
const btn = document.querySelector("#btn");
const less = document.querySelector("#less");
const more = document.querySelector("#more");
const input = document.querySelector("input");
const reset = document.querySelector("#reset");

const ajax = () => {
  const number = document.querySelector("input").value;
  const moeda = document.querySelector("#moeda");
  const status = document.querySelector('#cotacao')

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      const api = data;
      let dolar = api.USD.high;
      let euro = api.EUR.high;
      let cad = api.CAD.high;
      let ltc = api.LTC.high;
      let chf = api.CHF.high
      let aud = api.AUD.high

      if (moeda.value === "dolar") {
        let f = number / dolar;
        dolar = parseFloat(dolar)
        div.innerHTML = '$ ' + f.toFixed(2);
        status.innerHTML = '$ ' + dolar.toFixed(2)
      } 

      else if (moeda.value === "") {
        status.innerHTML = '$ 0.00';
      } 
      
      else if (moeda.value === "euro") {
        let f = number / euro;
        euro = parseFloat(euro)
        div.innerHTML = '€ ' + f.toFixed(2);
        status.innerHTML = '$ ' + euro.toFixed(2);
      } 

      else if (moeda.value === "cad") {
        cad = parseFloat(cad)
        let f = number / cad;
        div.innerHTML = '€ ' + f.toFixed(2);
        status.innerHTML = '$ ' + cad.toFixed(2);
      }

      else if (moeda.value === "ltc") {
        let f = number / ltc;
        ltc = parseFloat(ltc)
        div.innerHTML = '€ ' + f.toFixed(2);
        status.innerHTML = '$ ' + ltc.toFixed(2);
      }

      else if (moeda.value === "aud") {
        aud = parseFloat(aud)
        let f = number / aud;
        div.innerHTML = '€ ' + f.toFixed(2);
        status.innerHTML = '$ ' + aud.toFixed(2);
      }

      else if (moeda.value === "chf") {
        chf = parseFloat(chf)
        let f = number / chf;
        div.innerHTML = '€ ' + f.toFixed(2);
        status.innerHTML = '$ ' + chf.toFixed(2);
      }
      
      else {
        div.innerHTML = "deu erro ai vacilao";
    }
  });
}

btn.addEventListener("click", () => {
  ajax()
});

less.addEventListener('click', ()=> {
  let a = document.querySelector("#n");
  if(a.value <= 0) {
    return 0
  } else {
    a.value -=1
  }
})

more.addEventListener('click', ()=> {
  let a = document.querySelector("#n");
  if(a.value <= -1) {
    return 0
  } else {
    a.value ++
  }
})

input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    ajax()
  }
});

input.focus()

reset.addEventListener('click', ()=> {
  input.value = '';
  div.innerHTML = 0;
});
