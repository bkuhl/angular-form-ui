files = [

    JASMINE,
    JASMINE_ADAPTER,

    'https://ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js',
    'http://code.angularjs.org/1.1.5/angular-mocks.js',

    // The library itself
    'release/angular-form-ui.js',

    'tests/**.spec.js'
];

// // level of logging
// // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

growl     = true;
colors    = true;
singleRun = true;
autoWatch = false;
browsers  = ['PhantomJS'];