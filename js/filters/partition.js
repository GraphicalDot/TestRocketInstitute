define(['./module', 'underscore'], function (filters, _) {
    'use strict';

    return filters.filter('partition', [function () {
        return _.memoize(function (arr, size) {
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        });
    }]);
});
