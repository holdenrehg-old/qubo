var qubo = require('qubo'),
    app = qubo.app();

require('./user')(app);
require('./undefined')(app);