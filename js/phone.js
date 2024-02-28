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
    // console.log(phones)
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

    // console.log('is show all', isShowAll)

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
        <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `

        //step-4: appendChild
        phoneContainer.appendChild(phoneCard)
    });

    //hide loading spinner
    toggleLoadingSpinner(false)
}

//
const handleShowDetails = async (id) => {
    // console.log('click', id)
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await (res.json());
    const phone = data.data;
    // console.log(data)

    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone)

    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
    
    <img src="${phone.image}" alt="" />
    <p class="mt-5"><span>Brand Name : </span>${phone?.brand}</p>

   
    <p class="mt-5"><span>Storage : </span>${phone?.mainFeatures?.storage}</p>

    <p class="mt-3"><span>Chip Set : </span>${phone?.mainFeatures?.chipSet}</p>

    <p class="mt-3"><span>Display Size : </span>${phone?.mainFeatures?.
            displaySize}</p>

    <p class="mt-3"><span>Memory : </span>${phone?.mainFeatures?.
            memory}</p>

    <p class="mt-3"><span>Memory : </span>${phone?.ohters?.
            GPS || 'No GPS Available in this Device'}</p>
    
    `

    //show the modal
    show_details_modal.showModal()
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    // console.log('click handler done')
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText)
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