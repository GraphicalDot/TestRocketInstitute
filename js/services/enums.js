define(['./module'], function (services) {
    'use strict';
    services.value('enums', {
        ONTOLOGY_NODE_TYPES: {'1': 'Chapter', '2': 'Broad Category', '3': 'Topic', '4': 'Sub Topic', '5': 'Sub-Sub Topic'},

        ONTOLOGY_NODE_CLASSES: {'1': 'Class 11', '2': 'Class 12'},

        TARGET_EXAMS: {'1': 'JEE Advanced', '2': 'JEE Mains', '3': 'BITSAT', '4': 'AIPMT', '5': 'AIIMS'},

        TARGET_YEARS: {
            2015: '2015',
            2016: '2016',
            2017: '2017',
            2018: '2018',
            2019: '2019',
            2020: '2020'
        },

        MOCK_TEST_DIFFICULTY_LEVEL: {'1': 'Easy', '2': 'Medium', '3': 'Hard'},

        MOCK_TEST_TYPES:  {'1': 'Full Test', '2': 'Part Test', '3': 'Subject Test', '4': 'Chapter Test'},

        QUESTION_DIFFICULTY_LEVEL: ['1', '2', '3', '4', '5'],

        QUESTION_AVERAGE_TIME: (function(){
            var arr = [];
            for(var i=30;i<330;i+=30) arr.push(i)
            return arr;
        })().map(function(a) {return a.toString()}),

        QUESTION_NATURE: {
            '1': 'Formula Based',
            '2': 'Theoritical',
            '3': 'Concept Based / Conceptual',
            '4': 'Application Based',
            '5': 'Multi application based'
        },

        QUESTION_TYPE: {
            '1': 'Single Correct',
            '2': 'MultiCorrect',
            '3': 'Single/Multi Correct',
            '4': 'Comprehension',
            '5': 'Matrix Match',
            '6': 'Integer'
        },

        QUESTION_CATEGORIZED: {
            '0': 'Uncategorized',
            '1': 'Categorized'
        },

        QUESTION_PROOF_READ_CATEGORIZED: {
            '0': 'Not proof read',
            '1': 'Proof read'
        },

        QUESTION_TEXT_SOLUTION_ADDED: {
            '0': 'Not added',
            '1': 'Added'
        },

        QUESTION_VIDEO_SOLUTION_ADDED: {
            '0': 'Not added',
            '1': 'Added'
        },

        QUESTION_PROOF_READ_TEXT_SOLUTION: {
            '0': 'Not proof read',
            '1': 'Proof read'
        },

        QUESTION_PROOF_READ_VIDEO_SOLUTION: {
            '0': 'Not proof read',
            '1': 'Proof read'
        },

        QUESTION_FINALIZED: {
            '0': 'Not finalized',
            '1': 'Finalized'
        },

        BATCH_FIELD: {'1': 'Engineering', '2': 'Medical'},

        BATCH_TYPE: {'1': 'Class 11', '2': 'Class 12', '3': 'Droppers', '4': 'Other'},

        BATCH_CLASS: {'11': 'Class 11', '12': 'Class 12'},

        MOCK_TEST_STATE: {'0': 'Unlocked', '1': 'Locked'},

        MOCK_TEST_FOR: {'0': 'General', '1': 'Institutes'}
    });
});