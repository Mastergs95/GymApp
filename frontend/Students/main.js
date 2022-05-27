
function doGet(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}


data = doGet("https://rest-api-gym.herokuapp.com/api/students/get")
const users = JSON.parse(data)

var users_name=[]
const users_id=[]

users.forEach(element => {
	users_name.push(element.name)
	users_id.push(element._id)
});

const list_items = users_name;

const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
let rows = 5;


function DisplayList (items, wrapper, rows_per_page, page) {
	wrapper.innerHTML = "";
	page--;

	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginatedItems = items.slice(start, end);

	for (let i = 0; i < paginatedItems.length; i++) {
		let item = paginatedItems[i];

		let item_element = document.createElement('div');
		item_element.setAttribute("id",users_id[i])
		item_element.classList.add('item');
		item_element.innerText = item;
		wrapper.appendChild(item_element);
		item_element.onclick=listenClick()
	}
}

function listenClick(){
	var descendentes = document.querySelectorAll(".item");
	for (var i = 0; i < descendentes.length; i++) {
    descendentes[i].addEventListener("click", function (e) {

		data = doGet("https://rest-api-gym.herokuapp.com/api/students/get/"+ this.id)
    	const user = JSON.parse(data)

		localStorage.setItem('stId',user._id)
		localStorage.setItem('stIdTrainer',user.PersonalTrainers)
		window.location=("./data.html")
    })
}
}


function SetupPagination (items, wrapper, rows_per_page) {
	wrapper.innerHTML = "";

	let page_count = Math.ceil(items.length / rows_per_page);
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items);
		wrapper.appendChild(btn);
	}
}

function PaginationButton (page, items) {
	let button = document.createElement('button');
	button.innerText = page;

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {
		current_page = page;
		DisplayList(items, list_element, rows, current_page);

		let current_btn = document.querySelector('.pagenumbers button.active');
		current_btn.classList.remove('active');

		button.classList.add('active');
	});

	return button;
}

DisplayList(list_items, list_element, rows, current_page);
SetupPagination(list_items, pagination_element, rows);