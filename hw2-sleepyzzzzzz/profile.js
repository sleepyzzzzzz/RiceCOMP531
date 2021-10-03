'use strict';

let new_displayname = document.getElementById("display_name");
let new_email = document.getElementById("email");
let new_phone = document.getElementById("phone");
let new_zipcode = document.getElementById("zipcode");
let new_password = document.getElementById("password");
let new_passwordconfirm = document.getElementById("passwordconfirm");

let displayname = document.getElementById("display_name_field");
let email = document.getElementById("email_field");
let phone = document.getElementById("phone_field");
let zipcode = document.getElementById("zipcode_field");
let password = document.getElementById("password_field");
let passwordconfirm = document.getElementById("passwordconfirm_field");

let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1");
let btn_update = document.getElementById("update");

let updates = [];
let validate = [];
let clear = [];

let oldpassword = "***";

btn_update.addEventListener("click", validation);

function validation() {
	updates = [];
	validate = [];
	clear = [];
	validatedisplayname();
	validateemail();
	validatephone();
	validatezipcode();
	validatepassword();
	if (updates.length != 0) {
		updates.forEach(function(element) {
			var key = element[0];
			var updatevalue = element[1];
			var field = document.getElementById(key);
			var oldvalue = field.innerHTML;
			key = key.split("_field")[0];
			var input_field = document.getElementById(key);
			input_field.setCustomValidity("");
			input_field.reportValidity();
			if (key == "password") {
				oldvalue = oldpassword;
			}
			msg.style.visibility = "visible";
			if (oldvalue != updatevalue) {
				if (key == "password") {
					oldpassword = updatevalue;
					oldvalue = "*".repeat(oldvalue.length);
					updatevalue = "*".repeat(updatevalue.length);
					passwordconfirm.innerHTML = updatevalue;
					new_passwordconfirm.value = "";
				}
				field.innerHTML = updatevalue;
				msg.innerHTML += "<br>update " + key + " from " + oldvalue + " to " + updatevalue;
			}
			else {
				msg.innerHTML += "<br>Same value with the old one for " + key + " has entered";
			}
		});
	}
	if (validate.length != 0) {
		msg1.style.visibility = "visible";
		validate.forEach(function(element) {
			var key = element[0];
			var format = element[1];
			key = key.split("_field")[0];
			var field = document.getElementById(key);
			field.setCustomValidity(format);
			field.reportValidity();
			if (key == "password") {
				msg1.innerHTML += "<br>" + format;
				new_passwordconfirm.value = "";
			}
			else {
				msg1.innerHTML += "<br>input value for " + key + " is not valid: " + format;
			}
		});
	}
	clear.forEach(function(element) {
		document.getElementById(element).value = "";
	});
}

function validatedisplayname() {
	var reg = /(^[A-Za-z]+[A-Za-z0-9]+$)|(^[A-Za-z]+$)/;
	var updatevalue = new_displayname.value;
	if (updatevalue != "") {
		if (updatevalue.match(reg)) {
			updates.push(["display_name_field", updatevalue]);
			clear.push("display_name");
		}
		else {
			validate.push(["display_name_field", "should only contain upper, lower letters and numbers; maynot start with a number"]);
		}
	}
}

function validateemail() {
	var reg = /^[^@]*@[^@]*\.[^@]*$/;
	var updatevalue = unescape(new_email.value);
	if (updatevalue != "") {
		if (updatevalue.match(reg)) {
			updates.push(["email_field", updatevalue]);
			clear.push("email");
		}
		else {
			validate.push(["email_field", "proper format is ###@##.##"]);
		}
	}
}

function validatephone() {
	var reg = /^\d{3}-\d{3}-\d{4}$/;
	var updatevalue = new_phone.value;
	if (updatevalue != "") {
		if (updatevalue.match(reg)) {
			updates.push(["phone_field", updatevalue]);
			clear.push("phone");
		}
		else {
			validate.push(["phone_field", "proper format is 123-123-1234"]);
		}
	}
}

function validatezipcode() {
	var reg = /^\d{5}$/;
	var updatevalue = new_zipcode.value;
	if (updatevalue != "") {
		if (updatevalue.match(reg)) {
			updates.push(["zipcode_field", updatevalue]);
			clear.push("zipcode");
		}
		else {
			validate.push(["zipcode_field", "zipcode should be 5 numbers. Proper format is 12345"]);
		}
	}
}

function validatepassword() {
	var pwd1 = new_password.value;
	var pwd2 = new_passwordconfirm.value;
	if (pwd1 != "" || pwd2 != "") {
		if (pwd1 != pwd2) {
			validate.push(["password_field", "Password Comfirmation does not match with password"]);
		}
		else {
			updates.push(["password_field", pwd1]);
			clear.push("password");
			clear.push("passwordconfirm");
		}
	}
}

function link() {
	location.href = "main.html";
}