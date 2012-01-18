vows = require "vows"
assert = require "assert"
mongoose = require "mongoose"
Spine = require "spine"
SpineGoose = require "#{__dirname}/../src/spinegoose"

class Foo extends Spine.Model
  @configure "Foo", "bar"
  
# vows.describe("a vow").addBatch
#   "makin a schema":
#     topic: -> 
#       SpineGoose.schemafy(Foo)
#     "is a mongoose schema": (schema) ->
#       assert.equal String, schema.tree.bar  
.run()