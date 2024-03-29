import Vue from 'vue'
import moment from 'moment'

Vue.filter('relativeTime', (value) => {
    let timestamp = moment(value).valueOf();
    return moment(timestamp).startOf('minutes').fromNow();
});

Vue.filter('toCLP', function (price) {
	price = (price/1).toFixed(0).replace('.', ',')
    price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return `$${price}`;
});
