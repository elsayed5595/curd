let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let priceInput = document.querySelectorAll('.price input');
let mode = 'create';
let tmb;

// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "yellow";
        total.style.color = 'black';
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = "red";
        total.style.color = 'white';
    }
}

// start create data
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}

submit.onclick = function () {
    let newpro = {
        id: datapro.length > 0 ? datapro[datapro.length - 1].id + 1 : 1,
        title: title.value.toLowerCase(), 
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase() 
    };
   if(title.value !='' && price.value !=''){
    if (mode === 'create') {
        if (newpro.count > 1) {
            for (let i = 0; i < count.value; i++) {
                datapro.push({ ...newpro, id: datapro.length > 0 ? datapro[datapro.length - 1].id + 1 : 1 });
            }
        } else {
            datapro.push(newpro);
        }
    } else {
        datapro[tmb] = newpro;
        mode = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    };

   };
   
    localStorage.setItem('product', JSON.stringify(datapro));
    cleardata();
    showData();
};

// clear input
function cleardata() {
    title.value = '';
    priceInput.forEach(input => {
        input.value = '';
    });
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read product
function showData() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        if (datapro[i] && datapro[i].id != null) {
            table += `
                <tr>
                    <td>${datapro[i].id}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
            `;
        } else {
            console.error(`Invalid data at index ${i}:`, datapro[i]);
        }
    }

    const tbody = document.getElementById('tbody');
    if (tbody) {
        tbody.innerHTML = table;
    } else {
        console.error("Element with id 'tbody' not found.");
    }

    const deleteAllButton = document.getElementById('deleteAll');
    if (deleteAllButton) {
        if (datapro.length > 0) {
            deleteAllButton.style.display = "block";
            deleteAllButton.innerHTML = `Delete All (${datapro.length})`;
        } else {
            deleteAllButton.style.display = "none";
        }
    };
    getTotal();
}

deleteAll.onclick = function deleteAllData() {
    localStorage.clear();
    datapro.splice(0, datapro.length);
    showData();
}

function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showData();
}

window.onload = function () {
    showData();
}

function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Update';
    mode = 'update';
    tmb = i;
    scrollTo({
        top: 0,
        behavior: "smooth",
    })
}

// SEARCH
let searchmood = 'title';
function getsearchmood(id) {
    let inputsearch = document.getElementById('search');
    if (id === 'search-title') {
        searchmood = 'title';

    } else {
        searchmood = 'category';
  
    }
            inputsearch.placeholder = 'search By  '+ searchmood;
    inputsearch.focus();
    search.value='';
    showData();
}

function searchData(value) {
    let table = '';
    value = value.toLowerCase();
    for (let i = 0; i < datapro.length; i++) {
        if (searchmood === 'title' && datapro[i].title.toLowerCase().includes(value)) {
            table += `
                <tr>
                    <td>${datapro[i].id}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
            `;
        } else if (searchmood === 'category' && datapro[i].category.toLowerCase().includes(value)) {
            table += `
                <tr>
                    <td>${datapro[i].id}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
            `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
