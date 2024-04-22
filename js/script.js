'use strict';

const CLIENT_ID = 'D2wL3HINqJeYBuZueBqRmTiBeBdWggg-wW1SdampYT0'
const slider = document.getElementById('slider');

let state = [];
let currentSlide;

async function fetchPhotos() {
	try {
		const url = `https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}&count=4&query=food`;
		const response = await fetch(url);
		const data = await response.json();

		if (response.ok && data.length) {
			state = data;
			currentSlide = data[0].id
			setPhotos();
		}
	} catch (error) {
		throw new Error(error);
	}
}

function renderItem() {
	return state.map(({ urls: { regular }, user: { name }, id }) => {
		const isActive = currentSlide === id ? 'active' : '';
		return `<div class="slide ${isActive}" data-id=${id} style="background-image: url(${regular})">
					<div class="slide-text">
						<span>photo by</span>
						${name}
					</div>
				</div>
		`;
	}).join('');
}

function handleClick(event) {
	const currentItem = event.currentTarget;
	const { id } = currentItem.dataset;
	const slides = document.querySelectorAll('.slide');

	if (id === currentSlide) return;

	slides.forEach(item => item.classList.remove('active'));

	currentItem.classList.add('active');

	currentSlide = id;
}

function setPhotos() {
	slider.innerHTML = renderItem();

	const slides = document.querySelectorAll('.slide');
	slides.forEach(slide => {
		slide.addEventListener('click', handleClick);
	});
}

fetchPhotos();
