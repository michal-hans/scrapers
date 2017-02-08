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
    id: 'otomoto-mazda-3',
    url: 'https://www.otomoto.pl/osobowe/mazda/3/?search%5Bfilter_float_year%3Afrom%5D=2014&search%5Bfilter_float_year%3Ato%5D=2015&search%5Bfilter_enum_fuel_type%5D%5B0%5D=petrol&search%5Bcountry%5D=',
    selector: 'ARTICLE.offer-item',
    pagination: '.om-pager .next A@href',
    paginationLimit: 3,
    props: {
        title: '.offer-item__subtitle',
        price: '.offer-price__number',
        milage: '[data-code="mileage"] SPAN'
    },
    currentTime: moment().format('YYYY-MM-DD_HH-mm')
}

// Run X-Ray with given config
x(config.url, config.selector, [config.props])
    .paginate(config.pagination)
    .limit(config.paginationLimit)
    .write(`data/${config.id}_${config.currentTime}.json`)