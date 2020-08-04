const restCountriesApi = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2/name/'
})

async function getCountryInfo(theName) {
    try {
        const {
            data
        } = await restCountriesApi.get(theName)
        removeErrDiv()
        const countryName = data[0].name
        const countryCapital = data[0].capital
        document.querySelector('#countryName').innerHTML = countryName
        document.querySelector('#countryCapital').innerHTML = `Capital: ${countryCapital}`


    } catch (err) {
        if (err.response.status === 404) {
            removeCountryInfo();
            createDiv();
            const theErr = document.createTextNode(`What the heck is ${theName}? 🤭`);
            errDiv.appendChild(theErr);
        } else {
            console.log('err => ', err)
        }
    }
}

function createDiv() {
    errDiv = document.createElement("div");
    errDiv.setAttribute("id", "error");
    document.body.appendChild(errDiv);
}

function removeErrDiv() {
    if (document.getElementById("error")) {
        const error = document.getElementById("error");
        error.parentNode.removeChild(error);
    }
}

function removeCountryInfo() {
    document.getElementById("countryName").innerHTML = "";
    document.getElementById("countryCapital").innerHTML = "";
}

function checkInput() {
    removeErrDiv();
    if (document.getElementById("theInput").value === "") {
        document.getElementById('theButton').disabled = true;
        removeCountryInfo();
        createDiv();
        const theErr = document.createTextNode(`Wanna input something? 🤪`);
        errDiv.appendChild(theErr);
    } else {
        document.getElementById('theButton').disabled = false;
    }
}

document.getElementById("theButton").onclick = () => {
    const country = document.getElementById("theInput").value;
    getCountryInfo(country);
}