var products = [{
	"id": "100",
	"name": "iPhone 4S",
	"brand": "Apple",
	"os": "iOS"
},
{
	"id": "101",
	"name": "Moto X",
	"brand": "Motorola",
	"os": "Android"
},
{
	"id": "102",
	"name": "iPhone 6",
	"brand": "Apple",
	"os": "iOS"
},
{
	"id": "103",
	"name": "Samsung Galaxy S",
	"brand": "Samsung",
	"os": "Android"
},
{
	"id": "104",
	"name": "Google Nexus",
	"brand": "ASUS",
	"os": "Android"
},
{
	"id": "105",
	"name": "Surface",
	"brand": "Microsoft",
	"os": "Windows"
}];
$(document).ready(function () {
	displayData();
})
//function for filing dynamic values of select filter
let os = [], brands = [];
products.forEach(element => {
	if (!(os.includes(element.os))) {
		os.push(element.os)
	}
	if (!(brands.includes(element.brand))) {
		brands.push(element.brand);
	}
});
let data = "<option>-Select Operating System-</option>";
os.forEach(element => {
	data += `<option>${element}</option>`;
});
$("#select_os").html(data);
data = "<option>-Select Brand-</option>";
brands.forEach(element => {
	data += `<option>${element}</option>`;
});
$("#select_brand").html(data);
//Generate dynamic table on the basis of os 
$("#select_os").on("change", function () {
	let data = "";
	products.forEach(element => {
		if ($(this).val() == element.os && $(this).next().val() == "-Select Brand-")
			data += `<tr><td>${element.id}</td><td>${element.name}</td><td>${element.brand}</td><td>${element.os}</td><td onclick=hide(this)>X</td></tr>`;
	});
	$(".table__body").html(data);
	selectBoth();
})
// Generate dynamic table on the basis of brand
$("#select_brand").on("change", function () {
	let data = "";
	let prev = ($(this).prev().val());
	products.forEach(element => {
		if ((prev == "-Select Operating System-" && $(this).val() == element.brand)) {
			data += `<tr><td>${element.id}</td><td>${element.name}</td><td>${element.brand}</td><td>${element.os}</td><td onclick=hide(this)>X</td></tr>`;
		}
	});
	$(".table__body").html(data);
	selectBoth();
})
// Generate dynamic table on the basis of os and brand
function selectBoth() {
	let data = "";
	if (($("#select_os").val() != "-Select Operating System-") && $("#select_brand").val() != "-Select Brand-") {
		products.forEach(element => {
			if (($("#select_os").val() == element.os && $("#select_brand").val() == element.brand)) {
				data += `<tr><td>${element.id}</td><td>${element.name}</td><td>${element.brand}</td><td>${element.os}</td><td onclick=hide(this)>X</td></tr>`;
			}
		});
		$(".table__body").html(data);
	}
	if (($("#select_os").val() == "-Select Operating System-") && $("#select_brand").val() == "-Select Brand-") {
		displayData();
	}
}
//code for display data
function displayData() {
	let data = "";
	products.forEach(element => {
		data += `<tr><td>${element.id}</td><td>${element.name}</td><td>${element.brand}</td><td>${element.os}</td><td onclick=hide(this)>X</td></tr>`
	});
	$(".table__body").html(data);
}
//code for search values
$("input").keyup(function () {
	let regex = "^[a-zA-Z0-9]*$";
	if (!($(this).val()).match(regex)) {
		$("#msg").text("Please fill correct value");
		return
	} else {
		$("#msg").text("");
	}
	let data = "";
	products.forEach(element => {
		if (element.id.includes($(this).val()) || element.name.includes($(this).val())) {
			data += `<tr><td>${element.id}</td><td>${element.name}</td><td>${element.brand}</td><td>${element.os}</td><td onclick=hide(this)>X</td></tr>`;
		}
	});
	$(".table__body").html(data);
})
// function for hide row
function hide(val) {
	$(val).parent().hide();
}
