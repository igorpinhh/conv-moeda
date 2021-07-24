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
      // console.log(dolar);

      if (moeda.value === "dolar") {
        let f = number / dolar;
        div.innerHTML = '$ ' + f.toFixed(2);
        // console.log();
        status.innerHTML = '$ ' + dolar
      } 

      else if (moeda.value === "") {
        status.innerHTML = '';
      } 
      
      else if (moeda.value === "euro") {
        let f = number / euro;
        div.innerHTML = '€ ' + f.toFixed(2);
        status.innerHTML = '$ ' + euro;
      } 

      else if (moeda.value === "cad") {
        let x = parseFloat(cad, 2).toFixed(2);
        let f = number / x;
        div.innerHTML = '€ ' + f.toFixed(2);
        status.innerHTML = '$ ' + cad;
      }

      else if (moeda.value === "ltc") {
        let f = number / ltc;
        div.innerHTML = '€ ' + f.toFixed(2);
        status.innerHTML = '$ ' + ltc;
      }

      else if (moeda.value === "aud") {
        let x = parseFloat(aud, 2).toFixed(2);
        let f = number / x;
        div.innerHTML = '€ ' + f.toFixed(2);
        status.innerHTML = '$ ' + aud;
      }

      else if (moeda.value === "chf") {
        let x = parseFloat(chf, 2).toFixed(2);
        let f = number / x;
        div.innerHTML = '€ ' + f.toFixed(2);
        status.innerHTML = '$ ' + chf;
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
