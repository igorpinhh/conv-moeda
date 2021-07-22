const url = "https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL,BTC-BRL";

const div = document.querySelector(".resultado");
const btn = document.querySelector("#btn");
const less = document.querySelector("#less");
const more = document.querySelector("#more");
const input = document.querySelector("input");

const ajax = () => {
  const number = document.querySelector("input").value;
  const moeda = document.querySelector("#moeda");

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      const api = data;
      let dolar = api.USD.high;
      let euro = api.EUR.high;

      if (moeda.value === "dolar") {
        let x = parseFloat(dolar, 2).toFixed(2);
        let f = number * x;
        div.innerHTML = '$ ' + f.toFixed(2)
      } 
      
      else if (moeda.value === "euro") {
        let x = parseFloat(euro, 2).toFixed(2);
        let f = number * x;
        div.innerHTML = '€ ' + f.toFixed(2);
      } else {
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