// way-1

// fetch(' https://openapi.programming-hero.com/api/phones?search=iphone')
//     .then(res => res.json())
//     .then(data => console.log(data))


// way-2
const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
    console.log(phones)
    //jeheto ekhan theke data niye onno kuthaw dekhabo na tai forEach mara hoise

    //step-1:
    const phoneContainer = document.getElementById('phone-container')
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // console.log(phones.length)


    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 10 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }

    console.log('is show all', isShowAll)

    // display only first 10 phones **if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 10)
    }



    phones.forEach(phone => {
        // console.log(phone)
        // step-2: create a div
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;

        // step-3: set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
        alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
           <p>If a dog chews shoes whose shoes does he  choose?</p>
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
        </div>
        </div>
        `

        //step-4: appendChild
        phoneContainer.appendChild(phoneCard)
    });

    //hide loading spinner
    toggleLoadingSpinner(false)
}



// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    // console.log('click handler done')
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText, isShowAll)
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner-1');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}


// handle show all
const handleShowAll = () => {
    handleSearch(true)
}

// loadPhone()