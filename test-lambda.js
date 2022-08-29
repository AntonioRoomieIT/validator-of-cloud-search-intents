const lambdaLocal = require('lambda-local');

var jsonPayload = {
    type: 1,
    intentName: 'Que es una comision',
    utterace: [
        'a ke se Refieren kon komision',
        'ke son las komisiones',
        'ke es komision',
        'ke son las komisiones ke me aparesen',
        'ke es una komision',
        'ke kiere desir komision',
        'ke son sus komisiones',
        'ke signifika komision',
        'ke es la komision',
        'a ke se Refieren en kuanto a komision'
    ],
    response: 'Es el valor porcentual que se cobra por la administración e inversión de los recursos de los trabajadores.'
};

lambdaLocal.execute({
    event: jsonPayload,
    lambdaPath: ('index.js'),
    profilePath: '~/.aws/credentials',
    profileName: 'Roomie-Profuturo',
    timeoutMs: 60000
}).then(function (done) {
    console.log(done);
}).catch(function (err) {
    console.log(err);
});