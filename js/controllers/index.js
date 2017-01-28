/** attach controllers to this module
 * if you get 'unknown {x}Provider' errors from angular, be sure they are
 * properly referenced in one of the module dependencies in the array.
 * below, you can see we bring in our services and constants modules
 * which avails each controller of, for example, the `config` constants object.
 **/
define([
    './batch_list',
    './batch',
    './student_list',
    './student',
    './mock_test_list',
    './mock_test',
    './student_profile',
    './institute_analysis',
    './institute_signin',
    './main'

], function () {});