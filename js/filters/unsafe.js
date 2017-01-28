define(['./module'], function (filters) {
    'use strict';

    return filters.filter('unsafe', ['$sce', function ($sce) {
        return function (val) {
            return $sce.trustAsHtml(val);
        };
    }]);
});
