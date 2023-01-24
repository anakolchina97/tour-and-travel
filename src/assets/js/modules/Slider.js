import Swiper from 'swiper';

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
	}
}

export default new Slider();
