const dogsURL = 'http://localhost:3000/dogs'
const tableBody = document.querySelector('#table-body')
const form = document.querySelector('#dog-form')

document.addEventListener('DOMContentLoaded', () => {
    renderAllDogsToTable()
    
    form.addEventListener('submit', event => {
        event.preventDefault()
        patchDog(event.target)
    })
})

const renderAllDogsToTable = () => {
    fetch(dogsURL)
        .then(resp => resp.json())
        .then(json => {
            appendDogsToTable(json)
        })
}

const appendDogsToTable = (dogsCollection) => {
    for (const dog of dogsCollection) {
        const dogTableRow = createDogTableRowFromObject(dog)
        tableBody.appendChild(dogTableRow)
    }
}

const createDogTableRowFromObject = (dogObject) => {
    const tableRow = document.createElement('tr')
    tableRow.dataset.dogId = dogObject.id
    
    const name = document.createElement('td')
    name.textContent = dogObject.name
    
    const breed = document.createElement('td')
    breed.textContent = dogObject.breed
    
    const sex = document.createElement('td')
    sex.textContent = dogObject.sex
    
    const button = document.createElement('button')
    button.textContent = 'Edit'
    
    const buttonTd = document.createElement('td')
    buttonTd.appendChild(button)
    
    button.addEventListener('click', () => {
        populateFormWithDogInfo(dogObject)
    })
    tableRow.append(name, breed, sex, buttonTd)
    
    return tableRow
}

const populateFormWithDogInfo = (dogObject) => {
    form.dataset.dogId = dogObject.id
    form.name.value = dogObject.name
    form.breed.value = dogObject.breed
    form.sex.value = dogObject.sex
}

const patchDog = (form) => {
    // send patch request to database with form info
    configObject = generatePatchObject(form)
    
    fetch(dogsURL+'/'+form.dataset.dogId, configObject)
    .then(resp => resp.json())
    .then(json => {
        // console.log(json);
        // tableBody.innerHTML = ""
        // renderAllDogsToTable()
        modifyDogInfo(json)
    })
}

const generatePatchObject = (form) => {
    const objectBody = JSON.stringify({
        "name": form.name.value,
        "breed": form.breed.value,
        "sex": form.sex.value
    })
    
    return {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: objectBody
    }
}

const modifyDogInfo = (jsonObject) => {
    const dogRow = findRowWithDogById(jsonObject.id.toString())
    dogRow.innerHTML = ""
    appendInformationToDogObject(dogRow, jsonObject)
    
}

const findRowWithDogById = (dogId) => {
    for (const row of tableBody.children) {
        if (row.dataset.dogId === dogId) {return row}
    }
}

const appendInformationToDogObject = (tableRow, dogObject) => {    
    const name = document.createElement('td')
    name.textContent = dogObject.name
    
    const breed = document.createElement('td')
    breed.textContent = dogObject.breed
    
    const sex = document.createElement('td')
    sex.textContent = dogObject.sex
    
    const button = document.createElement('button')
    button.textContent = 'Edit'
    
    const buttonTd = document.createElement('td')
    buttonTd.appendChild(button)
    
    button.addEventListener('click', () => {
        populateFormWithDogInfo(dogObject)
    })
    tableRow.append(name, breed, sex, buttonTd)
}