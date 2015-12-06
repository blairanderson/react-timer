var Model = require('backbone-model').Model;
var localforage = require('localforage');
var extend = require('extend-object');

var Store = Model.extend({
  defaults: {
    timers: [],
    timer: {
      name: "default",
      hours: 0,
      minutes: 0,
      seconds: 0,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
      started: false
    }
  },

  initialize: function(){
    localforage.getItem('timers', function(err, value) {
      var defaultTimer = [{
        name: "Chicken",
        hours: 1,
        minutes: 30,
        seconds: 60,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
        started: false
      }]

      if (err || !value) {
        console.log(err);
        localforage.setItem("timers", defaultTimer, function(){})
        return this.set('timers', defaultTimer)
      }

      this.set('timers', value)
    }.bind(this));
  },

  localStorageSync: function(){
    localforage.setItem("timers", this.attributes.timers)
  },

  findOrCreateTimer: function(timer, done) {
    var newTimer;

    if (!timer.name) {
      return done("Timer needs a name")
    }

    var timers = this.attributes.timers;
    debugger
    if (timer.created_at) {
      // find it and update
    } else {
      timer = extend({
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
        name: '',
        hours: 0,
        minutes: 0,
        seconds: 0,
        started: false
      }, timer)
      timers.push(timer)
    }

    this.unset("timers", {silent: true})
    this.set("timers", timers)
  },

  getState: function(done){
    return done(null, this.toJSON());
  }
});
var store = new Store();
module.exports = store

window.onbeforeunload = function(e) {
  store.localStorageSync();
  return 'Are you sure you want to leave?';
};
