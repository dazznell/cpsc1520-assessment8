window.addEventListener("load", function (e) { 
    // console.log(e);
    const rentalRequest = fetch("./js/data.json"); 
    let store = [];

    // console.log(rentalRequest)

    // IMPORT JSON USING FETCH
    rentalRequest
        .then((response) => response.json()) 
        .then((data) => {
            store = [...data];
            const rentals = createMarkup();
            displayRentals(rentals);
        })
        .catch((error) => console.warn(`Error: ${error}`));
    });

    const displayRentals = function(elements){
        elements.forEach(function(rental){
            document.querySelector('.rentals').appendChild(rental)
        })
    }

    const createMarkup = function(){

        // CREATE TEMPLATE TO HOLD DATA USING HTML AND CSS
        const markup = store.map(function (rental) {
            const imagePath = `./img/thumbnail/${rental.thumnail}`;
            const template = `
                <aside class = "rental">
                    <header>
                        <img class="thumbnail" src="${imagePath}" width="290" height="168" alt="rental accommodation"/>
                    </header>

                    <ul class=-"details">
                        <li class="content">
                            <div>
                                <p class="type">${rental.rentalType}</p>
                                <h3 class="location">${rental.location}</h3>
                            </div>
                            
                            <div class="price">
                                <p><span>$${rental.dailyRate}</span><span>/${rental.currency}</span></p>
                            </div>
                        
                        </li>

                        <li class="rating">
                            <img class="star-icon" src="img/icons/rating.svg" alt="star rating" width="16px" height="16px"/>
                            
                            <span>${rental.rating}</span>
                            
                            <span>(${rental.reviews})</span>
                        </li>
                    </ul>
                </aside>
            `;

            return document.createRange().createContextualFragment(template).querySelector('aside');
        });
        
        return markup;
    };
