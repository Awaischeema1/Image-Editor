const fileInput = document.querySelector('.file-input'),
filterOptions = document.querySelectorAll('.filter button'),
filpOptions = document.querySelectorAll('.rotate button'),
filterName = document.querySelector('.filter-info .name'),
filterValue = document.querySelector('.filter-info .value'),
filterSlider = document.querySelector('.slider input'),
previewImg = document.querySelector('.preview-image img'),
resetFilterBtn = document.querySelector('.reset-filter'),
chooseImgBtn = document.querySelector('.choose-img');

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, filpHorizontal = 1,filpVertical = 1;
const applyFilter = ()=>{
    previewImg.style.transform = `rotate(${rotate}deg) scale(${filpHorizontal},${filpVertical})`
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

const loadImage = ()=>{
let file = fileInput.files[0];
if(!file) return;
previewImg.src = URL.createObjectURL(file);
previewImg.addEventListener('load',()=>{
    document.querySelector('.container').classList.remove('disable')
})
}
filterOptions.forEach(option => {
    option.addEventListener('click',()=>{
        document.querySelector('.filter .active').classList.remove('active')
        option.classList.add('active')
        filterName.innerText = option.innerText
        if(option.id === 'brightness'){
            filterSlider.max = '200'
            filterSlider.value = brightness
            filterValue.innerText = `${brightness}%`
        }else if(option.id === 'saturation'){
            filterSlider.max = '200'
            filterSlider.value = saturation
            filterValue.innerText = `${saturation}%`
        }else if(option.id === 'inversion'){
            filterSlider.max = '100'
            filterSlider.value = inversion
            filterValue.innerText = `${inversion}%`
        }else if(option.id === 'grayscale'){
            filterSlider.max = '100'
            filterSlider.value = grayscale
            filterValue.innerText = `${grayscale}%`
        }
    })
});
const updateFilter = ()=>{
filterValue.innerText = `${filterSlider.value}%`
const selectedFilter = document.querySelector('.filter .active')
if(selectedFilter.id === 'brightness'){
    brightness = filterSlider.value
}else if(selectedFilter.id === 'saturation'){
    saturation = filterSlider.value
}else if(selectedFilter.id === 'inversion'){
    inversion = filterSlider.value
}else if(selectedFilter.id === 'grayscale'){
    grayscale = filterSlider.value
}
applyFilter();

}
filpOptions.forEach(option =>{
    option.addEventListener('click',()=>{
       if(option.id === 'left'){
        rotate -= 90;
       }else if(option.id === 'right'){
        rotate += 90
       }else if(option.id === 'vertical'){
        filpVertical = filpVertical === 1? -1:1;
       }else if(option.id === 'horizontal'){
        filpHorizontal = filpHorizontal === 1? -1:1;
       }
       applyFilter();
    })
})
const resetFilters = ()=>{
     brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
     rotate = 0, filpHorizontal = 1,filpVertical = 1;
     filpOptions[0].click();
    applyFilter();

}
fileInput.addEventListener('change',loadImage);
filterSlider.addEventListener('input',updateFilter)
resetFilterBtn.addEventListener('click',resetFilters)
chooseImgBtn.addEventListener('click',()=> fileInput.click());