const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const overlay = document.querySelector('.overlay');
const btn = document.querySelector('#image-darken');

btn.addEventListener('click', (e) => {
    if (btn.getAttribute('class') === 'dark') {
        btn.setAttribute("class", 'light');
        btn.textContent = '开灯';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    } else {
        btn.setAttribute("class", 'dark');
        btn.textContent = '关灯';
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    }
});

/* Declaring the array of image filenames */
const images = ['images/pic1.jpg', 'images/pic2.jpg', 'images/pic3.jpg', 'images/pic4.jpg', 'images/pic5.jpg'];

/* Declaring the alternative text for each image file */
const alternativeTexts = ['1', '2', '3', '4', '5'];

/* Looping through images */

for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const alternativeText = alternativeTexts[i];
    const newImage = document.createElement('img');
    newImage.setAttribute('src', img);
    newImage.setAttribute('alt', alternativeText);
    thumbBar.appendChild(newImage);
}

thumbBar.addEventListener('click', (e) => {
    const img = e.target.getAttribute('src');
    const alt = e.target.getAttribute('alt');
    displayedImage.setAttribute('src', img);
    displayedImage.setAttribute('alt', alt);
});

/* Wiring up the Darken/Lighten button */
