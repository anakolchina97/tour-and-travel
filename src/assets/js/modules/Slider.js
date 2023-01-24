import Swiper, { Navigation } from 'swiper';
Swiper.use(Navigation);

class Slider {
	constructor() {
		this.init();
	}
	init() {
		new Swiper('[data-benefits]', {
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
		});

		new Swiper('[data-photos]', {
			slidesPerView: 1,
			spaceBetween: 30,
		});

		new Swiper('[data-staff]', {
			slidesPerView: 1,
			spaceBetween: 30,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}
}

export default new Slider();
