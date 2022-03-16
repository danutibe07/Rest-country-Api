let app_countries = document.querySelector(".countries")
let filterbyregion= document.querySelector(".filterbyregion")
let filteroptionsELem = document.querySelector(".filteroptions")
let sort = document.querySelectorAll(".sort")
let input = document.querySelector(".input")
let toggle = document.querySelector(".toggle")
let sky = document.querySelector(".sky")
async function getCountry(){
    let url = await fetch ("https://restcountries.com/v2/all");
    let res = await url.json();
    console.log(res);
    
    res.forEach(element => {
        displayCountries(element)
    });
}
getCountry()
function displayCountries(data){
    let country = document.createElement("div")
    country.classList.add("country")
    country.innerHTML = `
    <div class="flag"> <img src="${data.flag}" alt=""></div>
    <div class="details">
        <h4 class="Nameofcountry">${data.name}</h4>
        <p><strong>Population:</strong>  ${data.population}</p>
        <p class="Region"><strong>Region:</strong>  ${data.region}</p>
        <p class="last"><strong>Capital:</strong>  ${data.capital}</p>
    </div>`
    app_countries.appendChild(country)
    country.addEventListener("click", ()=>{
        displayCountryinfo(data)
        
        
    })
}

filterbyregion.addEventListener("click",()=>{
    filteroptionsELem.classList.toggle("showfilter")
});

let Region = document.getElementsByClassName("Region")
let Nameofcountry = document.getElementsByClassName("Nameofcountry")
sort.forEach(element => {
    element.addEventListener("click" , ()=>{
        Array.from(Region).forEach(elem=> {
            console.log(element.innerText);
            if(elem.innerText.includes(element.innerText) || element.innerText=="All"){
                elem.parentElement.parentElement.style.display="grid"
        } else{
            elem.parentElement.parentElement.style.display="none"
        }
        });
    })
}); 

input.addEventListener("input", ()=>{
    Array.from(Nameofcountry).forEach(elem=> {
        if(elem.innerText.toLowerCase().includes(input.value.toLowerCase())){
            elem.parentElement.parentElement.style.display="grid"
    } else{
        elem.parentElement.parentElement.style.display="none"
    }
    });
})

toggle.addEventListener("click" , ()=>{
    document.body.classList.toggle("dark")
    sky.classList.toggle("fas")
})

let moreinfo = document.querySelector(".moreinfo")
function  displayCountryinfo(data){
    moreinfo.classList.toggle("show")
    moreinfo.innerHTML = `
    <button class="back">back</button>
    <div class="info">
        <div class="leftinfo">
            <img src="${data.flag}" alt="">
        </div>
        <div class="rightinfo">
            <h1>${data.name}</h1>
            <div class="details">
                <div class="leftofrightinfo">
                    <p><strong>Native Name:</strong>  ${data.nativeName}</p>
                    <p><strong>Population:</strong>  ${data.population}</p>
                    <p class="Region"><strong>Region:</strong>  ${data.region}</p>
                    <p><strong>Sub Region</strong>  ${data.subregion}</p>
                    <p><strong>Capital:</strong>  ${data.capital}</p>
                </div>
                <div class="rightofrightinfo">
                    <p><strong>Top Level Domain:</strong>  ${data.topLevelDomain}</p>
                    <p><strong>Currencies:</strong> ${data.currencies.map(elem=>elem.name)}</p>
                    <p><strong>languages</strong> ${data.languages.map(elem=>elem.name)}</p>
                </div>
            </div>
        </div>
    </div>
    `
    let back = moreinfo.querySelector(".back")
    back.addEventListener("click", ()=>{
    moreinfo.classList.toggle("show")
})
}
