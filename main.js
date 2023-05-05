let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let tbody = document.getElementById('tbody');
let deleteAll = document.getElementById('btn-deleteAll');
let search = document.getElementById('search');
let mood = 'create';
let tmp;

// get total
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "rgb(35, 206, 35)";
    } else {
        total.innerHTML = 'total:';
        total.style.backgroundColor = "red";
    }
}
// clear input
function clearDataInput() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = ''
}
// create data 
    let arrData;
if (localStorage.product != null) {
        arrData = JSON.parse(localStorage.product)
} else {
    arrData = [];
    }
create.onclick = function () {
    let objData = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (mood === 'create') {
            for (let i = 0; i < count.value;i++){
        if (price.value != '' && title.value != '' && count.value != '' && category != '') {
            arrData.push(objData);
            localStorage.setItem("product", JSON.stringify(arrData))
        }
    }
    } else {
        arrData[tmp] = objData;
        mood = 'create';
        count.style.display = 'block';
        create.innerHTML = 'create';
        create.style.backgroundColor = "orangered";
    }
    clearDataInput();
    getTotal();
    showData();
}
// show data 
function showData() {
    let table;
    for (let i = 0; i < arrData.length;i++){
        table += `
        <tr>
            <td>${i}</td>
            <td>${arrData[i].title}</td>
            <td>${arrData[i].price}</td>
            <td>${arrData[i].taxes}</td>
            <td>${arrData[i].ads}</td>
            <td>${arrData[i].discount}</td>
            <td>${arrData[i].total}</td>
            <td>${arrData[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="btnDelete(${i})" id="delete">delete</button></td>
        </tr>
`
    }
    document.getElementById('tbody').innerHTML = table;
    if (arrData.length>0) {
        deleteAll.innerHTML = `<button onclick="deleteAllProduct()">DeleteAll(${arrData.length})</button>`;
    } else {
        deleteAll.innerHTML = '';
    }
}
showData();
// DELETE on click btn-delete
function btnDelete(i) {
    arrData.splice(i, 1);
    localStorage.product = JSON.stringify(arrData);
    showData();
}
// Delete allProduct
function deleteAllProduct() {
    localStorage.clear();
    arrData.splice(0);
    showData();
}
// btn update
function updateData(i) {
    title.value = arrData[i].title;
    price.value = arrData[i].price;
    ads.value = arrData[i].ads;
    taxes.value = arrData[i].taxes;
    discount.value = arrData[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = arrData[i].category;
    create.innerHTML = 'update';
    create.style.backgroundColor = "rgb(35, 206, 35)";
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}
// search
let searchMood = 'title';
function getSearchMood(id) {
    if (id==='searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.focus(); 
}
function searchData(value) {
    let table = '';
    if (searchMood=='title') {
        for (let i = 0; i < arrData.length;i++){
            if (arrData[i].title.includes(value.toLowerCase())) {
                table += `
                        <tr>
                            <td>${i}</td>
                            <td>${arrData[i].title}</td>
                            <td>${arrData[i].price}</td>
                            <td>${arrData[i].taxes}</td>
                            <td>${arrData[i].ads}</td>
                            <td>${arrData[i].discount}</td>
                            <td>${arrData[i].total}</td>
                            <td>${arrData[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="btnDelete(${i})" id="delete">delete</button></td>
                        </tr>
                `
            }
        }
    }else {
                for (let i = 0; i < arrData.length;i++){
            if (arrData[i].category.includes(value.toLowerCase())) {
                table += `
                        <tr>
                            <td>${i}</td>
                            <td>${arrData[i].title}</td>
                            <td>${arrData[i].price}</td>
                            <td>${arrData[i].taxes}</td>
                            <td>${arrData[i].ads}</td>
                            <td>${arrData[i].discount}</td>
                            <td>${arrData[i].total}</td>
                            <td>${arrData[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="btnDelete(${i})" id="delete">delete</button></td>
                        </tr>
                `
            }
        }
    }
        document.getElementById('tbody').innerHTML = table;
}