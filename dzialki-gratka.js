// Imports
var Xray = require('x-ray'),
    moment = require('moment');

// X-Ray global config
var x = Xray({
    filters: {
        removeSpaces: function (value) {
            return typeof value === 'string' ? value.replace(/\s/g, '') : value
        }
    }
});

// My config
var config = {
    id: 'dzialki-wroclaw-gratka',
    url: 'http://dom.gratka.pl/dzialki-grunty-sprzedam/lista/dolnoslaskie,wroclaw,1,rd.html',
    selector: '#list-ads li',
    pagination: '.stronaNastepna A.icon-strzalka_prawo@href',
    paginationLimit: 3,
    props: {
        title: 'h2',
        price: '.detailedPrice B | removeSpaces',
        price_per_m2: '.infoDane .duzeLitery | removeSpaces',
        size_m2: '.infoDane B | removeSpaces'
    },
    currentTime: moment().format('YYYY-MM-DD_HH-mm')
}

// Run X-Ray with given config
x(config.url, config.selector, [config.props])
    .paginate(config.pagination)
    .limit(config.paginationLimit)
    .write(`data/${config.id}_${config.currentTime}.json`)