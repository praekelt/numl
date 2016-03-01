console.log(3343);
var chai = require('chai');
global.log = console.log;
chai.use(require('chai-shallow-deep-equal'));
chai.should();
