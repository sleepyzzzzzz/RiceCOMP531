'use strict';

let imageset = [["https://moody.rice.edu/sites/default/files/styles/hero/public/art/Dashwood_8532.jpg?itok=dVWTuSm2",
				"https://moody.rice.edu/sites/default/files/styles/hero/public/art/Dashwood_8618.jpg?itok=Ioz1Uhqi",
				"https://s.hdnux.com/photos/01/03/25/67/17653235/7/gallery_xlarge.jpg"],
				["https://kinder.rice.edu/sites/default/files/styles/half/public/images/16058871391_a4d6a1a77c_k.jpg?itok=tbY_c-_e",
				"https://kinder.rice.edu/sites/default/files/styles/half/public/images/1Coletta_1.jpg?itok=DvXlHQq1",
				"https://kinder.rice.edu/sites/default/files/styles/half/public/images/5618058528_65bc1f7ce3_b.jpg?itok=an7TrqGJ"],
				["https://kinder.rice.edu/sites/default/files/styles/half/public/images/Downtown%20Skyline%20and%20Buffalo%20Bayou%20Sabine%20to%20Bagby%20Promenade_0.jpg?itok=-EbMNRul",
				"https://kinder.rice.edu/sites/default/files/styles/half/public/images/Hermann%20Park%20Looking%20South.jpg?itok=croKMs4e",
				"https://kinder.rice.edu/sites/default/files/styles/half/public/images/Teo-Chew%20Temple.jpg?itok=HuF1wljF"],
				["https://kinder.rice.edu/sites/default/files/styles/full/public/images/14326800977_ee8b1a1ec5_o_0.jpg?itok=M5Y2x9aJ",
				"https://kinder.rice.edu/sites/default/files/styles/full/public/images/Avenida%20Houston%20Campus%20Elevated.jpg?itok=XU0OMp0C",
				"https://kinder.rice.edu/sites/default/files/styles/full/public/images/_DSC8489_2.jpg?itok=mH3Ay7wd"],
				["https://kinder.rice.edu/sites/default/files/styles/full_freeform/public/images/00000IMG_00000_BURST20190521103435830_COVER_1.jpg?itok=8ike_moJ",
				"https://kinder.rice.edu/sites/default/files/styles/full_freeform/public/images/00000IMG_00000_BURST20190521103435830_COVER_2.jpg?itok=o-MkTVwQ",
				"https://kinder.rice.edu/sites/default/files/styles/full_freeform/public/images/00000IMG_00000_BURST20190521103435830_COVER_4.jpg?itok=Ljat4Sxs"]
				];

let imagesrc = document.getElementsByTagName("img");
let imagenum = imagesrc.length;
let images = [];
for (var i = 0; i < imagenum; i++) {
	images.push(imagesrc[i].getAttribute("id"));
}
let curidx = new Array(imagenum).fill(0);

let interval = [];

images.forEach(function(element) {
	var idx = element.charAt(element.length - 1);
	var time = Math.floor(Math.random()*5 + 1);
	var inter = setInterval(function() {updateimage(idx)}, time * 1000);
	interval.push(inter);
});

function imagecycle(idx) {
	var btn = document.getElementById("btn" + idx);
	if (btn.innerHTML == "Stop") {
		btn.innerHTML = "Start";
		stopInterval(idx);
	}
	else if (btn.innerHTML == "Start") {
		btn.innerHTML = "Stop";
		startInterval(idx);
	}
}

function updateimage(idx) {
	var len = imageset[idx].length;
	var nextidx = (curidx[idx] + 1) % len;
	document.getElementById("img" + idx).src = imageset[idx][curidx[idx]];
	curidx[idx] = nextidx;
}

function startInterval(idx) {
	clearInterval(interval[idx]);
	var time = Math.floor(Math.random()*5 + 1);
	var inter = setInterval(function() {updateimage(idx)}, time * 1000);
	interval[idx] = inter;
}

function stopInterval(idx) {
	clearInterval(interval[idx]);
}

function link() {
	location.href = "profile.html";
}