import Vue from 'vue'
import moment from 'moment'

Vue.filter('relativeTime', (value) => {
    return moment(value).startOf('hour').fromNow();
});

Vue.filter('toCLP', function (price) {
    return `$${price}`;
});
