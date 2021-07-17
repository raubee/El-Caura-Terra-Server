import {Slider} from './js/slider';
import css from './scss/style.scss';

var tempSlider = new Slider('temp_slider', 0, 50);
var humSlider = new Slider('hum_slider', 0, 100);

function handleSlider(){
    tempSlider.render();
    humSlider.render();
    requestAnimationFrame(handleSlider);
}

handleSlider();