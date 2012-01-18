mongooseRest = require("mongoose-rest")
lingo = lingo = require('lingo').en
  
class SpineGoose
  constructor: (options) ->
    @app = options.app
    @mongoose = options.mongoose
    @models = options.models
    @mongooseModels = (@goose(model) for model in @models)
    mongooseRest.use(@app, @mongoose)
    @mount(model) for model in @models
    
  goose: (model) ->
    schemaAttrs = {}
    for attr in model.attributes
      schemaAttrs[attr] = String
    schema = new @mongoose.Schema(schemaAttrs)
    @mongoose.model model.className.toLowerCase(), schema
  
  mount: (model) ->
    pluralClassName = lingo.pluralize(model.className).toLowerCase()
    routes = mongooseRest.routes()[pluralClassName]
    @app.get "/#{pluralClassName.toLowerCase()}.:format?", routes.index
    @app.post "/#{pluralClassName.toLowerCase()}", routes.create
    @app.get "/#{pluralClassName.toLowerCase()}/:#{model.className.toLowerCase()}", routes.show
    @app.put "/#{pluralClassName.toLowerCase()}/:#{model.className.toLowerCase()}", routes.update
    @app.del "/#{pluralClassName.toLowerCase()}/:#{model.className.toLowerCase()}", routes.destroy
      
module.exports = SpineGoose
    