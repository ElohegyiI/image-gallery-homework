
import Swiper from 'swiper';
import 'swiper/css';

async function parseJSON(url) {
    const response = await fetch(url);
    return response.json();
}

const swiperComponent = (data, component) => {

return `

    <div class="swiper">
        <div class="swiper-wrapper">      
          ${data.map(img => component(img)).join('')}  
    </div>
    
`};


const swiperSlideComponent = ({title, image_name}) => {

    return `
        <div class="swiper-slide">
            <h2>Title: ${title}</h2>
            <img src="upload/${image_name}">
        </div>
    `;

};

const loadEvent = async ()  => {

    const rootElement = document.getElementById('root');
    const result = await parseJSON('/images-list')
    
    rootElement.insertAdjacentHTML('beforeend', swiperComponent(result, swiperSlideComponent));

    const swiper = new Swiper('.swiper', {
        loop: true
    })
    console.log(swiper)
}
window.addEventListener('load', loadEvent)