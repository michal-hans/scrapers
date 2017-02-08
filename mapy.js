// Imports
var Xray = require('x-ray'),
    Nightmare = require('nightmare'),
    moment = require('moment');

// Initialize xray and nightmare
var x = Xray(),
    nightmare = Nightmare({
        show: true
    });

// // My config
var config = {
    id: 'map',
    url: 'https://www.google.pl/maps/dir/Wroclaw+Technology+Park,+Kleci%C5%84ska+123,+54-413+Wroc%C5%82aw/Osiedle+Butterfly+-+budynek+A1,+Daktylowa+10,+Wroc%C5%82aw/@51.1308511,16.8982508,13z/data=!4m14!4m13!1m5!1m1!1s0x470fc1eebfbd0185:0x4ee66ba0c8b2a879!2m2!1d16.9713316!2d51.1062049!1m5!1m1!1s0x470f95353b64debf:0x81e879ebcf0e1fa0!2m2!1d16.8961512!2d51.1556169!3e0',
    selector: '.section-listbox',
    pagination: false,
    paginationLimit: 3,
    props: {
        title: 'H1.section-directions-trip-title > SPAN',
        distance: '.section-directions-trip-distance',
        duration: '.section-directions-trip-duration',
    },
    currentTime: moment().format('YYYY-MM-DD_HH-mm')
}

// Run xray
function runX(x, html) {
    x(html, '.section-directions-trip', [config.props])
        .write(`data/${config.id}_${config.currentTime}.json`)
}

// Run nightmare
nightmare
    .viewport(1200, 800)
    .goto(config.url)
    .wait(config.selector)

    .screenshot(`screenshots/${config.id}_${config.currentTime}.png`)

    .evaluate(function (config) {
        return document.querySelector(config.selector).innerHTML;
    }, config)
    .end()
    .then(function(result) {
        console.log('Xray...')
        runX(x, result)
    })
    //catch errors if they happen
    .catch(function (error) {
        console.error('an error has occurred: ' + error);
    });



