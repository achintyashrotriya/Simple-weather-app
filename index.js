
/*
const image = document.querySelector('img');
const btn = document.querySelector('button');
function imgResponse() {
    fetch('https://api.giphy.com/v1/gifs/translate?api_key=m0ZpYInAsWAfXrhoHx51Mg8FF9KsRzEU&s=dogs', {
        mode: 'cors'
    }).then((response) => {
        return response.json();
    }).then((response) => {
        image.srcset = response.data.images.original.url;
    }).catch((error) => console.log(error))
}; 
console.log(imgResponse());
btn.addEventListener('click', imgResponse); 
 
let submitBtn = document.querySelector('submit')
submitBtn.addEventListener('click',) */


const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const image = document.querySelector('img');

form.addEventListener("submit", e => {
  e.preventDefault();
  const listItems = list.querySelectorAll(".ajax-section .city");
  const inputVal = input.value;

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${inputVal}&APPID=process.env.api_key&units=metric`;

  fetch(url, { mode: 'cors' })
    .then((response) => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]
        }@2x.png`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      <div class="city-humidity">Humidity : ${main.humidity}<sup>%</sup></div>
      <figure>
        <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
        <figcaption>${weather[0]["description"]}</figcaption>
      </figure>
    `;
      li.innerHTML = markup;
      list.appendChild(li);

      fetch(`https://g.tenor.com/v1/random?q=${weather[0]['description']} weather&key=${process.env.gifApiKey}&locale=en_IN`).then((response) => {
        return response.json();
      }).then((response) => {
        image.srcset = response.results[0]["media"][0]["tinygif"]["url"];
      }).catch((error) => console.log(error))

    })
    .catch(() => msg.textContent = "Please search for a valid city 😩")


  msg.textContent = "";
  form.reset();
  input.focus();
})
