// Keys.js - figure out if it's production or development environment
if (process.env.NODE_ENV === 'production') {
    // Return production set of keys
    module.exports = require('./prod');
} else {
    // Return development set of keys
    module.exports = require('./dev');
}
