document.addEventListener('DOMContentLoaded', function() {
    const categoryList = document.getElementById('categoryList');
const foodList = document.getElementById('foodList');

    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');

    // Ruokalajit ja ruoat
    const menu = {
        "Kasvisruoat": [
            { name: "Hapanimelätofua", price: 15.50 },
            { name: "Wokki -vihanneksia", price: 13.50 },
            { name: "Tofua vihreässä curryssa", price: 15.50 },
            { name: "Tofua punaisessa curryssa", price: 15.50 },
            { name: "Savu Tofua masman curryssa", price: 16.50 },
            { name: "Chili-Tofua", price: 15.50 },

        ],
        "Erikoisuuksia riisistä": [
            { name: "Khau Phat Kai", price: 15.50 },
            { name: "Khau Phat Muu", price: 15.50 },
            { name: "Paistettua riisiä jättikatkaravuilla", price: 18.00 },
            { name: "Kanaa chilillä ja paistetulla munalla", price: 20.00 },
            { name: "Paistettua riisiä tofulla", price: 15.50 }
        ],
        "Nuudeliruoat": [
            { name: "Phat Ba Mii", price: 15.00 },
            { name: "Phat Sii lu Kai", price: 16.50 },
            { name: "Phat Thai", price: 16.50 },
            { name: "Phat Sii lu Muu", price: 16.50 },
            { name: "Phat Thai Kai", price: 16.50 },
        ],
        "Friteeratut": [
            { name: "Friteerattua lohta", price: 21.50 },
            { name: "Friteerattua kanaa", price: 20.00 },
            { name: "Friteerattuja jättikatkarapuja", price: 22.00 },
            { name: "Friteerattu MIX", price: 30.00 }
        ],
        "Porsasruoat": [
            { name: "Hapanimeläporsasta", price: 19.50 },
            { name: "Valkosipuliporsasta", price: 19.50 },
            { name: "Inkivääriporsasta", price: 19.50 },
            { name: "Chiliporsasta", price: 19.50 },
            { name: "Porsasta punaisessa curryssa", price: 19.50 },
        ],
        "Kanaruoat": [
            { name: "Hapanimeläkanaa", price: 19.50 },
            { name: "Valkosipulikanaa", price: 19.50 },
            { name: "Chilikanaa", price: 19.50 },
            { name: "Inkiväärikanaa", price: 19.50 },
            { name: "Kanaa masman curryssa", price: 19.50 },
            { name: "Kanaa punaisessa curryssa", price: 19.50 },
            { name: "Kanaa vihreässä curryssa", price: 19.50 },
            { name: "Cashewpähkinäkanaa", price: 19.50 },
            { name: "Kanaa keltaisessa curryssa", price: 19.50 },
            { name: "Satay-kanaa", price: 19.50 }
        ],
        "Härkäruoat": [
            { name: "Valkosipulihärkää", price: 25.00 },
            { name: "Härkää osterikastikkeessa", price: 25.00 },
            { name: "Chilihärkää", price: 25.00 },
            { name: "Härkää punaisessa curryssa", price: 25.50 },
            { name: "Härkää masman curryssa", price: 25.50 },
            { name: "Häänjauhelihaa chilillä", price: 16.50 }        
        ],        
        "Merellisiä ruokia": [
            { name: "Äyriäisiä vihreässä curryssa", price: 20.00 },
            { name: "Chili äyriäisiä", price: 20.00 },
            { name: "Jättikatkaravut hapanimeläkastikkeessa", price: 22.00 },
            { name: "Valkosipuliset jättikatkaravut", price: 22.00 },
            { name: "Jättikatkaravut cashew-pähkinöillä", price: 22.00 }        
        ],
        "Kalaruoat": [
            { name: "Chililohta", price: 21.50 },
            { name: "Hapanimelälohta", price: 21.50 },
            { name: "Lohta punaisessa curryssa", price: 21.50 }
        ],

        };

    // Täytä ruokalajit nappeina
    for (let category in menu) {
        let button = document.createElement('button');
        button.textContent = category;
        button.addEventListener('click', () => showFoods(category));
        categoryList.appendChild(button);
    }

    // Näytä ruokalajin ruoat
    function showFoods(category) {
        foodList.innerHTML = '';
        foodList.classList.add('active');

        menu[category].forEach(food => {
            let foodDiv = document.createElement('div');
            foodDiv.classList.add('food-item');

            let foodName = document.createElement('span');
            foodName.textContent = `${food.name} - ${food.price} €`;

            let quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = 1;
            quantityInput.min = 1;

            let minusButton = document.createElement('button');
            minusButton.textContent = '-';
            minusButton.addEventListener('click', () => {
                if (quantityInput.value > 1) quantityInput.value--;
            });

            let plusButton = document.createElement('button');
            plusButton.textContent = '+';
            plusButton.addEventListener('click', () => quantityInput.value++);

            let addButton = document.createElement('button');
            addButton.textContent = 'Lisää koriin';
            addButton.addEventListener('click', () => addToCart(food, parseInt(quantityInput.value)));

            foodDiv.appendChild(foodName);
            foodDiv.appendChild(minusButton);
            foodDiv.appendChild(quantityInput);
            foodDiv.appendChild(plusButton);
            foodDiv.appendChild(addButton);

            foodList.appendChild(foodDiv);
        });
    }

    // Lisää ruoka koriin
    function addToCart(food, quantity) {
        // Tarkista, onko tuote jo korissa
        let existingCartItem = Array.from(cartItems.children).find(li => li.dataset.foodName === food.name);
        
        if (existingCartItem) {
            let existingQuantityInput = existingCartItem.querySelector('.quantity');
            existingQuantityInput.value = parseInt(existingQuantityInput.value) + quantity;
            updateCart(food, existingCartItem, existingQuantityInput.value);
        } else {
            let li = document.createElement('li');
            li.dataset.foodName = food.name;
            li.textContent = `${food.name} - ${food.price * quantity} €`;

            let quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = quantity;
            quantityInput.min = 1;
            quantityInput.classList.add('quantity');
            quantityInput.addEventListener('input', () => updateCart(food, li, quantityInput.value));

            let removeButton = document.createElement('button');
            removeButton.textContent = 'Poista';
            removeButton.classList.add('remove-button');
            removeButton.addEventListener('click', () => removeFromCart(food, li));

            li.appendChild(quantityInput);
            li.appendChild(removeButton);
            cartItems.appendChild(li);
        }

        // Päivitä kokonaishinta
        updateTotalPrice();
    }

    // Päivitä korissa olevan tuotteen määrä
    function updateCart(food, li, newQuantity) {
        li.childNodes[0].textContent = `${food.name} - ${food.price * newQuantity} €`;

        // Päivitä kokonaishinta
        updateTotalPrice();
    }

    // Poista tuote korista
    function removeFromCart(food, li) {
        cartItems.removeChild(li);

        // Päivitä kokonaishinta
        updateTotalPrice();
    }

    // Päivitä kokonaishinta
    function updateTotalPrice() {
        let total = 0;
        cartItems.querySelectorAll('li').forEach(li => {
            let quantity = parseInt(li.querySelector('input').value);
            let itemName = li.dataset.foodName;
            let itemPrice = menu[getCategory(itemName)].find(food => food.name === itemName).price;
            total += itemPrice * quantity;
        });
        totalPrice.textContent = total.toFixed(2);
    }

    // Etsi ruokalajin nimi ruoan nimen perusteella
    function getCategory(foodName) {
        for (let category in menu) {
            if (menu[category].some(food => food.name === foodName)) {
                return category;
            }
        }
        return null;
    }

    
});
