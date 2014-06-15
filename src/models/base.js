(function(_) {

    /**
     * @constructor
     */

    function BaseModel(data) {
        this.data = data;
    }

    /**
     * Builds a model out of an Express request, pulling information
     * from request parameters
     *
     * @param {obj} options
     */
    BaseModel.prototype.build = function(options, call) {
        var self = this,
            strict = options.hasOwnProperty('strict') && options.strict === true;

        if (options.hasOwnProperty('request')) {
            _.each(self.data, function(include, param) {
                self[param] = options.request.param(param);
                if (self[param] === undefined && strict) {
                    throw "Missing parameter " + param;
                }
            });
            call(self);
        } else if (options.hasOwnProperty('obj')) {
            _.each(self.data, function(include, param) {
                self[param] = options.obj[param];
                if (self[param] === undefined && strict) {
                    throw "Missing parameter " + param;
                }
            });
            call(self);
        } else {
            throw "BaseModel build only accepts 'request' or 'object' as options";
        }
    };

    /**
     * Returns an object that represents the model in the database
     */
    BaseModel.prototype.obj = function() {
        var obj = {},
            self = this;
        _.each(this.data, function(include, param) {
            if (include) {
                obj[param] = self[param];
            }
        });
        return obj;
    };

    /**
     * Check if the current instance has a certain parameter defined
     *
     * @param {string} param
     */
    BaseModel.prototype.has = function(param) {
        return this[param] !== undefined;
    };

    BaseModel.prototype.insert = function() {
        throw new "Models extending BaseModel are required to override insert";
    }

    module.exports = BaseModel;
})(require('underscore'));
