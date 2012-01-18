(function() {
  var SpineGoose, lingo, mongooseRest;
  mongooseRest = require("mongoose-rest");
  lingo = lingo = require('lingo').en;
  SpineGoose = (function() {
    function SpineGoose(options) {
      var model, _i, _len, _ref;
      this.app = options.app;
      this.mongoose = options.mongoose;
      this.models = options.models;
      this.mongooseModels = (function() {
        var _i, _len, _ref, _results;
        _ref = this.models;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          model = _ref[_i];
          _results.push(this.goose(model));
        }
        return _results;
      }).call(this);
      mongooseRest.use(this.app, this.mongoose);
      _ref = this.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        this.mount(model);
      }
    }
    SpineGoose.prototype.goose = function(model) {
      var attr, schema, schemaAttrs, _i, _len, _ref;
      schemaAttrs = {};
      _ref = model.attributes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        schemaAttrs[attr] = String;
      }
      schema = new this.mongoose.Schema(schemaAttrs);
      return this.mongoose.model(model.className.toLowerCase(), schema);
    };
    SpineGoose.prototype.mount = function(model) {
      var pluralClassName, routes;
      pluralClassName = lingo.pluralize(model.className).toLowerCase();
      routes = mongooseRest.routes()[pluralClassName];
      this.app.get("/" + (pluralClassName.toLowerCase()) + ".:format?", routes.index);
      this.app.post("/" + (pluralClassName.toLowerCase()), routes.create);
      this.app.get("/" + (pluralClassName.toLowerCase()) + "/:" + (model.className.toLowerCase()), routes.show);
      this.app.put("/" + (pluralClassName.toLowerCase()) + "/:" + (model.className.toLowerCase()), routes.update);
      return this.app.del("/" + (pluralClassName.toLowerCase()) + "/:" + (model.className.toLowerCase()), routes.destroy);
    };
    return SpineGoose;
  })();
  module.exports = SpineGoose;
}).call(this);
