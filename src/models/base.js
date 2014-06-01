var _ = require('underscore');

/**
 * @constructor
 */

function BaseModel(params) {
    this.params = params;
}

/**
 * Builds a model out of an Express request, pulling information
 * from request parameters
 *
 * @param {obj} req
 */
BaseModel.prototype.build = function(req) {
    var self = this;
    _.each(this.params, function(param) {
        self[param] = req.param(param);
        if (self[param] === undefined) {
            throw "Missing parameter " + param;
        }
    });
    return this;
}

/**
 * Returns an object with only the form data parameters as properties
 */
BaseModel.prototype.obj = function() {
    var obj = {},
        self = this;
    _.each(this.params, function(param) {
        obj[param] = self[param];
    });
    return obj;
}

module.exports = BaseModel;
