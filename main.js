import menu from "./db.js";
import { buttonsData } from "./db.js";

const menuContainer = document.getElementById("menu-container")
const buttonsArea = document.getElementById("buttons-area")

//sayfa yüklendiği anda elemanları listeleyen fonks.
document.addEventListener("DOMContentLoaded", () => { 
displayMenuItems(menu)
showButtons('all')
});

// ekrana menü elemanlarını listeleyecek fonks.
function displayMenuItems(menuItems){
    console.log(menuItems);
// dizideki her bir obje için bir 
// menüü elemanını temsil eden html oluştur
// ve yeni diziye aktar
let displayMenu = menuItems.map((item)=>`
        <a href="/product-detail.html?id=${item.id}" id="card" class="d-flex gap-3 flex-column flex-md-row text-decoration-none text-dark">
            <img class="rounded shadow" src="${item.img}">
            <div>
                <div class="d-flex justify-content-between">
                    <h5>${item.title}</h5>
                    <p class="text-success">$ ${item.price}</p>
                </div>

                <p class="lead">${item.desc}</p>
            </div>
        </a>
`
);

displayMenu = displayMenu.join('');
// oluşan menü elemanlarını html'e gönderme
menuContainer.innerHTML = displayMenu;
}

// butonları htmlden getirme
buttonsArea.addEventListener("click", searchCategory);

// tıklanılan butona göre ekrana o kategorinin elemanlarını basmakla görevli fonks.
function searchCategory(e){
    const category = e.target.dataset.category;
    console.log(category , menu);
    // tüm dizideki elemanlardan yalnızca ketegori değeri tıkladığımız butonun
    // kategori değeriyle aynı olanları bir diziye aktarma
    const filteredMenu = menu.filter(
        (menuItem) => menuItem.category === category
        );

        // eğer ki hepsi seçildiyse bütün menüyü ekrana bas
        if(category === "all"){
            displayMenuItems(menu);

            return;
        }
        // filtrelenmiş diziyi ekrana basma
        displayMenuItems(filteredMenu);

        //butonları güncelle
        showButtons(category);
}

// ekrana menü butonlarını basacak fonks.
function showButtons(active){
    buttonsArea.innerHTML = "";
    buttonsData.forEach((btn) => {
        // html butonu oluşturma
        const buttonElement = document.createElement("button");
        
        // gerekli classları verme
        buttonElement.className = 'btn btn-outline-dark filter-btn';

        // yazıyı değiştirme
        buttonElement.innerText = btn.text;

        // datasını tanımlama
        buttonElement.dataset.category = btn.data;

        // active olana ayrıca class verme
        if(buttonElement.dataset.category === active){
            buttonElement.classList.add("bg-dark");
            buttonElement.classList.add("text-light");
        }
        // htmle gönderme
        buttonsArea.appendChild(buttonElement);

    });
}
