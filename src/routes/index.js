var qubo = require('qubo'),
    app = qubo.app();

require('./test')(app);
require('./undefined')(app);