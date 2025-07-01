const car_uri = `api/product`;
const finans_uri = `api/Money`;
const clien_uri = `api/Client`;
const typepayment_uri = `api/TypePayment`;
let cars = [];
let finans = [];
let searccars = [];
let Sellccars = [];
let clients = [];
let lowclients = [];
let paymentclient = [];
var car_id = 0;
var client_id = 0;

const engineType = {
    0: 'Бензиновый',
    1: 'Дизельный',
    2: 'Электрический',
    3: 'Гибридный'
};
const engineLocation = {
    0: 'Переднее',
    1: 'Заднее'
};
const availiability = {
    0: 'В наличие',
    1: 'Отсутствует',
    2: 'Ожидается в течение месяца',
    3: 'Дата пока не известна'
};
const typePayment = {
    0: "Переводом",
    1: "Наличными",
    2: "Кредитной картой",
    3: "В офисе"
};

function getCars() {
    fetch(car_uri)
        .then(response => response.json())
        .then(data => _displayCars(data))
        .catch(error => console.log(error));
}
function _displayCars(data) {
    
    const products = document.getElementById('products');
    products.innerHTML = ``;
    
    if (data == null) {
        products.innerHTML = '<h1>Данные не загрузились</h1>>';
    }
    data.forEach(car =>{
        const tehn = car.tehnicals[0];
        products.innerHTML += `
            <div class="car" data-id="1">
                <div class="car-header">
                    <div class="car-title">
                        <span>${car.markaCar} <span class="car-model">${car.modelCar}</span></span>
                        <span class="car-price">${Intl.NumberFormat("ru-Ru").format(car.price)} ₽</span>
                    </div>
                    <div class="car-manufacturer">${car.countyManufacturer}</div>
                    <span class="car-availability">${availiability[car.availability]}</span>
                </div>
                
                <div class="car-specs">
                    <div class="spec-item">
                        <div class="spec-label">Тип кузова</div>
                        <div class="spec-value">${tehn.typeBodywork}</div>
                    </div> 
                    <div class="spec-item">
                        <div class="spec-label">Двери</div>
                        <div class="spec-value">${tehn.numberDoor}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Места</div>
                        <div class="spec-value">${tehn.numberPlace}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Двигатель</div>
                        <div class="spec-value">${engineType[tehn.typeEngine]}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Расположение</div>
                        <div class="spec-value">${engineLocation[tehn.engineLocation]}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Объём (л)</div>
                        <div class="spec-value">${tehn.engineDisplacement}</div>
                    </div>
                </div>
                
                <div class="car-footer">
                    <button class="car-button edit-btn" onclick="UpdateProduct(${car.idProduct})">Изменить</button>
                    <button class="car-button delete-btn" onclick="deleteProduct(${car.idProduct})">Удалить</button>
                </div>
            </div>
        `;
    });
    console.log(data);
    cars = data;
}

function addProduct(){
    const Product = {
        countyManufacturer: document.getElementById('countyManufacturer').value,
        markaCar: document.getElementById('markaCar').value,
        modelCar: document.getElementById('modelCar').value,
        availability:parseInt(document.getElementById('availability').value),
        price: parseFloat(document.getElementById('price').value),
        typeBodywork: document.getElementById('typeBodywork').value,
        numberDoor: parseInt(document.getElementById('numberDoor').value),
        numberPlace: parseInt(document.getElementById('numberPlace').value),
        typeEngine: parseInt(document.getElementById('typeEngine').value),
        engineLocation: parseInt(document.getElementById('engineLocation').value),
        engineDisplacement: parseFloat(document.getElementById('engineDisplacement').value)
    };
    console.log(Product);
    fetch(`${car_uri}/Configuration`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Product)
    })
        .then(response => response.text())
        .then(() => {
            getCars();
            loadSalesByModel();
        })
        .catch(error => console.error(error));
}

function deleteProduct(id){
    fetch(`${car_uri}/${id}`, {
        method: 'DELETE',
    })
        .then(data => {
            getCars();
            loadSalesByModel();
        })
        //.catch(error => console.error(error));
}

function UpdateProduct(idProduct){
    car_id = idProduct;
    const Product = cars.find(Product => Product.idProduct === idProduct);
    const tehn = Product.tehnicals[0];
    console.log(tehn);
    console.log(Product);
        document.getElementById('updatecountyManufacturer').value = Product.countyManufacturer;
        document.getElementById('updatemarkaCar').value = Product.markaCar;
        document.getElementById('updatemodelCar').value = Product.modelCar;
        document.getElementById('updateavailability').value = Product.availability;
        document.getElementById('updateprice').value = Product.price;
        document.getElementById('updatetypeBodywork').value = tehn.typeBodywork;
        document.getElementById('updatenumberDoor').value = tehn.numberDoor;
        document.getElementById('updatenumberPlace').value = tehn.numberPlace;
        document.getElementById('updatetypeEngine').value = tehn.typeEngine;
        document.getElementById('updateengineLocation').value = tehn.engineLocation;
        document.getElementById('updateengineDisplacement').value = tehn.engineDisplacement;
}

function updateProduct(){
    const countyManufacturer = document.getElementById('updatecountyManufacturer').value;
    const markaCar = document.getElementById('updatemarkaCar').value;
    const modelCar = document.getElementById('updatemodelCar').value;
    const availability = parseInt(document.getElementById('updateavailability').value);
    const price = parseFloat(document.getElementById('updateprice').value);
    const typeBodywork = document.getElementById('updatetypeBodywork').value;
    const numberDoor = parseInt(document.getElementById('updatenumberDoor').value);
    const numberPlace = parseInt(document.getElementById('updatenumberPlace').value);
    const typeEngine = parseInt(document.getElementById('updatetypeEngine').value);
    const engineLocation = parseInt(document.getElementById('updateengineLocation').value);
    const engineDisplacement = parseFloat(document.getElementById('updateengineDisplacement').value);

    const product = {
        countyManufacturer: countyManufacturer,
        markaCar: markaCar,
        modelCar: modelCar,
        availability: availability,
        price: price,
        typeBodywork: typeBodywork,
        numberDoor: numberDoor,
        numberPlace: numberPlace,
        typeEngine: typeEngine,
        engineLocation: engineLocation,
        engineDisplacement: engineDisplacement,
    };
    
    console.log(car_id);
    console.log(product);
    
    fetch(`${car_uri}/${car_id}`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    })
        .then(()=> {
            getCars();
            loadSalesByModel();
        })
        .catch(error => console.error(error));    
}

function searchProduct(){

    const search = {
        MarkaCar: document.getElementById('searchMarka').value,
        ModelCar: document.getElementById('searchModel').value
    };
    
    fetch(`${car_uri}/CarFind`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(search)        
    })
        .then(response => response.json())
        .then(datas => {
            if (datas == null){
                const products = document.getElementById('searchResults');
                products.innerHTML = '<p style="font-size: 42px; display: flex; justify-content: center; align-items: center">Данные отсутствуют</p>';
            }
            _SearchCars(datas)  
        })
        .catch(error => console.error(error));
}
function _SearchCars(datas) {
    const products = document.getElementById('searchResults');
    products.innerHTML = ``;
    if (datas == null || !Array.isArray(datas)) {
        products.innerHTML = '<div><h1 style="text-align: center; color: white">Данные не загрузились<br>Возможно вы выбрали не правильный вариант</h1></div>';
        return;
    }
    if (datas.length === 0){
        products.innerHTML = '<div><h1 style="color: white">Такого типа марки и модели, пока не существует</h1></div>';
        return;
    }
    datas.forEach(car =>{
        const tehn = car.tehnicals[0];
        products.innerHTML += `
            <div class="car" data-id="1">
                <div class="car-header">
                    <div class="car-title">
                        <span>${car.markaCar} <span class="car-model">${car.modelCar}</span></span>
                        <span class="car-price">${Intl.NumberFormat("ru-Ru").format(car.price)} ₽</span>
                    </div>
                    <div class="car-manufacturer">${car.countyManufacturer}</div>
                    <span class="car-availability">${availiability[car.availability]}</span>
                </div>
                
                <div class="car-specs">
                    <div class="spec-item">
                        <div class="spec-label">Тип кузова</div>
                        <div class="spec-value">${tehn.typeBodywork}</div>
                    </div> 
                    <div class="spec-item">
                        <div class="spec-label">Двери</div>
                        <div class="spec-value">${tehn.numberDoor}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Места</div>
                        <div class="spec-value">${tehn.numberPlace}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Двигатель</div>
                        <div class="spec-value">${engineType[tehn.typeEngine]}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Расположение</div>
                        <div class="spec-value">${engineLocation[tehn.engineLocation]}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Объём (л)</div>
                        <div class="spec-value">${tehn.engineDisplacement}</div>
                    </div>
                </div>
                
                <div class="car-footer">
                    <button class="car-button edit-btn" onclick="UpdateProduct(${car.idProduct})">Изменить</button>
                    <button class="car-button delete-btn" onclick="deleteProduct(${car.idProduct})">Удалить</button>
                </div>
            </div>
        `;
    });
    console.log(datas);
    searccars = datas;
}

function searchByModel() {
    const modelCar = {
        ModelCar: document.getElementById('searchOnlyModel').value,
    }
    console.log(modelCar);
    fetch(`${car_uri}/TehnicalFind`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(modelCar)
    })
        .then(response => response.json())        
        .then(datas => {
        if (datas == null){
            const products = document.getElementById('searchModelResults');
            products.innerHTML = '<p style="font-size: 42px; display: flex; justify-content: center; align-items: center">Данные отсутствуют</p>';
        }
        _searchByModel(datas)
    })
        .catch(error => console.error(error));
}
function _searchByModel(datas) {
    const products = document.getElementById('searchModelResults');
    products.innerHTML = ``;
    if (datas == null || !Array.isArray(datas)) {
        products.innerHTML = '<div><h1 style="text-align: center; color: white">Данные не загрузились<br>Возможно вы выбрали не правильный вариант</h1></div>';
        return;
    }
    if (datas.length === 0){
        products.innerHTML = '<div><h1 style="color: white">Такого типа моделей, пока не существует</h1></div>';
        return;
    }
    datas.forEach(car => {
        const tehn = car.tehnicals?.[0];

        products.innerHTML += `
    
             <div class="car">
                <div class="car-header">
                    <div class="car-title">
                        <span>${car.markaCar} <span class="car-model">${car.modelCar}</span></span>
                    </div>
                </div>

                <div class="car-specs">
                    <div class="spec-item">
                        <div class="spec-label">Тип кузова</div>
                        <div class="spec-value">${tehn?.typeBodywork}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Двери</div>
                        <div class="spec-value">${tehn?.numberDoor}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Объём двигателя (л)</div>
                        <div class="spec-value">${tehn?.engineDisplacement}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Расположение двигателя</div>
                        <div class="spec-value">${engineLocation[tehn?.engineLocation]}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Количество мест</div>
                        <div class="spec-value">${tehn?.numberPlace}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Тип двигателя</div>
                        <div class="spec-value">${engineType[tehn?.typeEngine]}</div>
                    </div>
                </div>
            </div>
        `;
    });
    console.log(datas);
    searccars = datas;
}

function SellcarModel() {
    const markaCar = {
        MarkaCar: document.getElementById('SellOnlyModel').value,
    }
    console.log(modelCar);
    fetch(finans_uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(markaCar)
    })
        .then(response => response.json())
        .then(datas => {
            if (datas == null){
                const products = document.getElementById('SellModelResults');
                products.innerHTML = '<p style="font-size: 42px; display: flex; justify-content: center; align-items: center">Данные отсутствуют</p>';
            }
            _SellByModel(datas)
        })
        //.catch(error => console.error(error));
}
function _SellByModel(datas) {
    const products = document.getElementById('SellModelResults');
    products.innerHTML = ``;
    
    if (datas == null || !Array.isArray(datas)) {
        products.innerHTML = '<div><h1 style="text-align: center; color: white">Данные не загрузились<br>Возможно вы выбрали не правильный вариант</h1></div>';
        return;
    }
    if (datas.length === 0){
        products.innerHTML = '<div><h1 style="color: white">Такого типа моделей, пока не существует</h1></div>';
        return;
    }

    datas.forEach(item => {
        const client = item.clientList;
        const car = item.carInfo;
        const tehn = item.carInfo.tehnicalData[0];

        products.innerHTML += `
        <div class="car">
            <div class="car-header">
                <div class="car-title">
                    Клиент: ${client.lastName ?? ''} ${client.firstName} ${client.middleName} 
                </div>
                <div class="car-model">ID клиента: ${client.idClient}</div>
                <div class="car-manufacturer">Телефон: ${client.number}</div>
                <div class="car-availability">Серия: ${client.passportSeries} - Номер: ${client.passportNumber}</div>
            </div>

            <div class="car-specs">
                <div class="spec-item">
                    <div class="spec-label">Марка</div>
                    <div class="spec-value">${car.markaCar}</div>
                </div>
                <div class="spec-item">
                    <div class="spec-label">Модель</div>
                    <div class="spec-value">${car.modelCar}</div>
                </div>
                <div class="spec-item">
                    <div class="spec-label">Цена</div>
                    <div class="spec-value">${Intl.NumberFormat("ru-Ru").format(car.price)} ₽</div>
                </div>
                <div class="spec-item">
                    <div class="spec-label">Тип двигателя</div>
                    <div class="spec-value">${engineType[tehn.typeEngine]}</div>
                </div>
                <div class="spec-item">
                    <div class="spec-label">Объём двигателя (л)</div>
                    <div class="spec-value">${tehn.engineDisplacement}</div>
                </div>
                <div class="spec-item">
                    <div class="spec-label">Количество дверей</div>
                    <div class="spec-value">${tehn.numberDoor}</div>
                </div>
            </div>
        </div>
    `;
    });
    console.log(datas);
    Sellccars = datas;
}

function loadSalesByModel() {
    fetch(`${finans_uri}/sales_summary`)
        .then(response => response.json())
        .then(data => _displaySalesStats(data))
        .catch(error => console.log(error));
}
function _displaySalesStats(data) {
    const Sell = document.getElementById('salesStatistics');
    const totalSell = document.getElementById('totalSalesSummary');
    Sell.innerHTML = '';
    totalSell.innerHTML = '';
    
    if (data.length === 0){
        Sell.innerHTML = '<div><h1 style="color: white">Данные отсутствуют</h1></div>';
        return;
    }
    totalSell.innerHTML = `
        <div class="sales-summary">
            Общая сумма всех продаж: ${Intl.NumberFormat("ru-Ru").format(data.totalSumSell)} ₽
        </div>
    `;

    const salesList = data.sellModel;
    salesList.forEach(item => {
        Sell.innerHTML += `
            <div class="sales-card">
                <div class="sales-header">${item.marka} ${item.model}</div>
                <div class="statistic-item">
                    <span class="statistic-label">Количество продаж:</span> ${item.totalSales}
                </div>
                <div class="statistic-item">
                    <span class="statistic-label">Общая сумма:</span> 
                    ${Intl.NumberFormat("ru-Ru").format(item.sum)} ₽
                </div>
            </div>
        `;
    });
    finans = data
}

function fullInfo() {
    fetch(`${clien_uri}/FullInfo`)
        .then(response => response.json())
        .then(data => _fullInfo(data))
        .catch(error => console.log(error));
}
function _fullInfo(data) {
    const FullInfo = document.getElementById('FullInfo');
    FullInfo.innerHTML = '';
    
    if (data.length === 0){
        FullInfo.innerHTML = '<div><h1 style="color: white">Данные отсутствуют</h1></div>';
        return;
    }
    
    data.forEach(client => {
        
        const car = client.idProductNavigation;
        const tehn = client.idProductNavigation.tehnicals[0];
        
        FullInfo.innerHTML += `
            <div class="client-card">
                <div class="client-header">
                    <h3>Клиент: ${client.lastName ?? ""} ${client.firstName} ${client.middleName}</h3>
                    <p>ID: ${client.idClient}</p>
                </div>

                <div class="client-details">
                    <div class="detail-row">
                        <span class="label">Паспорт:</span>
                        <span class="value">Серия: ${client.passportSeries} - Номер: ${client.passportNumber}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Телефон:</span>
                        <span class="value">${client.number}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Адрес:</span>
                        <span class="value">${client.homeAddress}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Доставка:</span>
                        <span class="value">${client.delivery ? 'Да' : 'Нет'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Тип оплаты:</span>
                        <span class="value">${typePayment[client.typePayment]}</span>
                    </div>
                </div>

                <div class="car-info">
                    <h4>Автомобиль: ${car.markaCar} ${car.modelCar}</h4>
                    <div class="spec-row">
                        <span class="label">Производитель:</span>
                        <span class="value">${car.countyManufacturer}</span>
                    </div>
                    <div class="spec-row">
                        <span class="label">Цена:</span>
                        <span class="value">${Intl.NumberFormat("ru-Ru").format(car.price)} ₽</span>
                    </div>
                    <div class="spec-row">
                        <span class="label">Наличие:</span>
                        <span class="value">${availiability[car.availability]}</span>
                    </div>

                    <!-- Технические данные -->
                    ${tehn ? `
                        <div class="technical-specs">
                            <h5>Технические характеристики</h5>
                            <div class="spec-row">
                                <span class="label">Тип кузова:</span>
                                <span class="value">${tehn.typeBodywork}</span>
                            </div>
                            <div class="spec-row">
                                <span class="label">Объём двигателя:</span>
                                <span class="value">${tehn.engineDisplacement} л</span>
                            </div>
                            <div class="spec-row">
                                <span class="label">Двери:</span>
                                <span class="value">${tehn.numberDoor}</span>
                            </div>
                            <div class="spec-row">
                                <span class="label">Места:</span>
                                <span class="value">${tehn.numberPlace}</span>
                            </div>
                            <div class="spec-row">
                                <span class="label">Тип двигателя:</span>
                                <span class="value">${engineType[tehn.typeEngine]}</span>
                            </div>
                            <div class="spec-row">
                                <span class="label">Расположение двигателя:</span>
                                <span class="value">${engineLocation[tehn.engineLocation]}</span>
                            </div>
                            <div class="car-footer">
                                <button class="car-button edit-btn" onclick="FillUpdateClient(${client.idClient})">Изменить</button>
                                <button class="car-button delete-btn" onclick="deleteClient(${client.idClient})">Удалить</button>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    });
    clients = data
}

function lowInfo() {
    fetch(`${clien_uri}`)
        .then(response => response.json())
        .then(data => _lowInfo(data))
        .catch(error => console.log(error));
}
function _lowInfo(data) {
    const FullInfo = document.getElementById('FullInfo');
    FullInfo.innerHTML = '';
    if (data.length === 0){
        FullInfo.innerHTML = '<div><h1 style="color: white">Данные отсутствуют</h1></div>';
        return;
    }
    data.forEach(client => {
        FullInfo.innerHTML += `
            <div class="client-card">
                <div class="client-header">
                    <h3>Клиент: ${client.lastName ?? ""} ${client.firstName} ${client.middleName}</h3>
                    <p>ID: ${client.idClient}</p>
                </div>

                <div class="client-details">
                    <div class="detail-row">
                        <span class="label">Паспорт:</span>
                        <span class="value">Серия: ${client.passportSeries} - Номер: ${client.passportNumber}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Телефон:</span>
                        <span class="value">${client.number}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Адрес:</span>
                        <span class="value">${client.homeAddress}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Доставка:</span>
                        <span class="value">${client.delivery ? 'Да' : 'Нет'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Тип оплаты:</span>
                        <span class="value">${typePayment[client.typePayment]}</span>
                    </div>
                </div>
            </div>
        `;
    });
    lowclients = data
}

function TypePaymentClient() {
    const typePaymentss = {
        TypePaymentId: parseInt(document.getElementById('typePayment').value),
    }
    
    console.log(typePaymentss);
    fetch(`${typepayment_uri}/TypePaymentClientAndCar`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(typePaymentss)
    })
        .then(response => response.json())
        .then(datas => {
            if (datas == null){
                const products = document.getElementById('searchModelResults');
                products.innerHTML = '<p style="font-size: 42px; display: flex; justify-content: center; align-items: center">Данные отсутствуют</p>';
            }
            _typePaymentClient(datas)
        })
        .catch(error => console.error(error));
}
function _typePaymentClient(datas) {
    const infoclient = document.getElementById('TypePaymentClientList');
    infoclient.innerHTML = ``;
    if (datas == null || !Array.isArray(datas)) {
        infoclient.innerHTML = '<div><h1 style="text-align: center; color: white">Данные не загрузились<br>Возможно вы выбрали не правильный вариант</h1></div>';
        return;
    }
    if (datas.length === 0){
        infoclient.innerHTML = '<div><h1 style="color: white">Клиентов с таким типом оплаты еще нет</h1></div>';
        return;
    }
    
    datas.forEach(item => {
        const client = item.client;
        const car = item.car;
        
        infoclient.innerHTML += `
            <div class="client-card">
                <div class="client-header">
                    <h3>Клиент: ${client.lastName ?? ""} ${client.firstName} ${client.middleName}</h3>
                    <p>ID: ${client.idClient}</p>
                </div>

                <div class="client-details">
                    <div class="detail-row">
                        <span class="label">Паспорт:</span>
                        <span class="value">Серия: ${client.passportSeries} - Номер: ${client.passportNumber}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Телефон:</span>
                        <span class="value">${client.number}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Адрес:</span>
                        <span class="value">${client.homeAddress}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Доставка:</span>
                        <span class="value">${client.delivery ? 'Да' : 'Нет'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Тип оплаты:</span>
                        <span class="value">${typePayment[client.typePayment]}</span>
                    </div>
                </div>

                <div class="car-info">
                    <h4>Автомобиль: ${car.markaCar} ${car.modelCar}</h4>
                    <div class="spec-row">
                        <span class="label">Производитель:</span>
                        <span class="value">${car.countyManufacturer}</span>
                    </div>
                    <div class="spec-row">
                        <span class="label">Цена:</span>
                        <span class="value">${Intl.NumberFormat("ru-Ru").format(car.price)} ₽</span>
                    </div>
                    <div class="spec-row">
                        <span class="label">Наличие:</span>
                        <span class="value">${availiability[car.availability]}</span>
                    </div>
                </div>
            </div>
        `;
    });
    console.log(datas);
    paymentclient = datas;
}

function addClient(){
    const Delivety = document.getElementById('delivery').value;
    let Delivetys = true;
    
    if (Delivety === "true"){
        Delivetys = true;
    }
    else if (Delivety === "false"){
        Delivetys = false;
    }
    const Client = {
        FirstName: document.getElementById('firstName').value,
        MiddleName: document.getElementById('middleName').value,
        LastName: document.getElementById('lastName').value,
        PassportSeries:parseInt(document.getElementById('passportSeries').value),
        PassportNumber: parseInt(document.getElementById('passportNumber').value),
        HomeAddress: document.getElementById('homeAddress').value,
        Number: document.getElementById('number').value,
        Delivery: Delivetys,
        TypePayment: parseInt(document.getElementById('typePaymentClient').value),
        IdProduct: parseInt(document.getElementById('idProduct').value),
    };
    
    console.log(Client);
    fetch(`${clien_uri}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Client)
    })
        .then(response => response.text())
        .then(() => {
            getCars();
            loadSalesByModel();
        })
        .catch(error => console.error(error));
}

function deleteClient(id){
    fetch(`${clien_uri}/${id}`, {
        method: 'DELETE',
    })
        .then(data => {
            lowInfo();
            loadSalesByModel();
            fullInfo();
        })
    //.catch(error => console.error(error));
}

function FillUpdateClient(idClient) {
    client_id = idClient;
    const client = clients.find(c => c.idClient === idClient);
    console.log(client);
    document.getElementById('updatefirstName').value = client.firstName;
    document.getElementById('updatelastName').value = client.lastName;
    document.getElementById('updatemiddleName').value = client.middleName;
    document.getElementById('updatenumber').value = client.number;
    document.getElementById('updatepassportSeries').value = client.passportSeries;
    document.getElementById('updatepassportNumber').value = client.passportNumber;
    document.getElementById('updatehomeAddress').value = client.homeAddress;
    document.getElementById('updatedelivery').value = client.delivery;
    document.getElementById('updatetypePayment').value = client.typePayment;
    document.getElementById('updateidProduct').value = client.idProductNavigation.idProduct;
}

function updateClient(){
    const firstName = document.getElementById('updatefirstName').value;
    const lastName = document.getElementById('updatelastName').value;
    const middleName = document.getElementById('updatemiddleName').value;
    const number = document.getElementById('updatenumber').value;
    const passportSeries = parseInt(document.getElementById('updatepassportSeries').value);
    const passportNumber = parseInt(document.getElementById('updatepassportNumber').value);
    const homeAddress = document.getElementById('updatehomeAddress').value;
    const delivery = document.getElementById('updatedelivery').value;
    const typePayment = parseInt(document.getElementById('updatetypePayment').value);
    const idProduct = parseInt(document.getElementById('updateidProduct').value);

    
    let Delivetys = true;

    if (delivery === "true"){
        Delivetys = true;
    }
    else if (delivery === "false"){
        Delivetys = false;
    }
    const client = {
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        number: number,
        passportSeries: passportSeries,
        passportNumber: passportNumber,
        homeAddress: homeAddress,
        delivery: Delivetys,
        typePayment: typePayment,
        idProduct: idProduct
    };
    console.log(client);

    fetch(`${clien_uri}/${client_id}`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(client)
    })
        .then(()=> {
            getCars();
            loadSalesByModel();
            fullInfo();
        })
        .catch(error => console.error(error));
}

function loadCarsForSelect(selectId) {
    fetch(car_uri)
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">Выберите автомобиль</option>';

            data.forEach(car => {
                select.innerHTML += `
                    <option value="${car.idProduct}">${car.markaCar} ${car.modelCar}</option>`;
            });
        })
        .catch(error => console.error(error));
}


//Frontend
const v1 = document.getElementById('v1');
v1.addEventListener('mouseover', funchoveerV1_On);
v1.addEventListener('mouseout', funchoveerV1_Off);
const descAdvant1 = document.getElementById('descAdvant1');
function funchoveerV1_On(){
    descAdvant1.classList.add('act');
}
function funchoveerV1_Off(){
    descAdvant1.classList.remove('act');
}

const v2 = document.getElementById('v2');
v2.addEventListener('mouseover', funchoveerV2_On);
v2.addEventListener('mouseout', funchoveerV2_Off);
const descAdvant2 = document.getElementById('descAdvant2');
function funchoveerV2_On(){
    descAdvant2.classList.add('act');
}
function funchoveerV2_Off(){
    descAdvant2.classList.remove('act');
}

const v3 = document.getElementById('v3');
v3.addEventListener('mouseover', funchoveerV3_On);
v3.addEventListener('mouseout', funchoveerV3_Off);
const descAdvant3 = document.getElementById('descAdvant3');
function funchoveerV3_On(){
    descAdvant3.classList.add('act');
}
function funchoveerV3_Off(){
    descAdvant3.classList.remove('act');
}