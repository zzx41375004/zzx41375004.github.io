const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

// let storyText = 'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';

let storyText =
'外面华氏94度，所以:insertx:去散步了。当他看到:inserty:时，他惊恐地盯了一会儿，然后:insertz:。张三看到了这一切，但并不感到惊讶——:insertx:重300英镑，而且天气很热。';

let insertX = [
    '灰太狼',
    '小妖精威利',
    '练习两年半的鲲',]


let insertY = [
    '疯人院',
    '迪斯尼乐园',
    '白宫']

let insertZ = [
    '不由自主地燃烧了起来',
    '融化成了人行道上的一个小水洼',
    '变成鼻涕虫爬走了']

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);
    newStory = newStory.replaceAll(':insertx:', xItem);
    newStory = newStory.replaceAll(':inserty:', yItem);
    newStory = newStory.replaceAll(':insertz:', zItem);

    if (customName.value !== '') {
        const name = customName.value;
        newStory = newStory.replace('张三', name);
    }

    if (document.getElementById("uk").checked) {
        let origin_weight = 300;
        const weight = Math.round(origin_weight * 0.07142857);
        newStory = newStory.replace('300英镑', weight + '英石');
        let origin_temperature = 94;
        const temperature =  Math.round((origin_temperature - 32) * (5/9));
        newStory = newStory.replace('华氏94', temperature + '摄氏');
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
}
