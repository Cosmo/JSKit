// function Class() { }
// Class.prototype.init = function() {};
// Class.__asMethod__ = function(func, superClass) {  
//   return function() {
//       var currentSuperClass = this.$;
//       this.$ = superClass;
//       var ret = func.apply(this, arguments);      
//       this.$ = currentSuperClass;
//       return ret;
//   };
// };
//  
// Class.extend = function(def) {
//   var classDef = function() {
//       if (arguments[0] !== Class) { this.init.apply(this, arguments); }
//   };
//  
//   var proto = new this(Class);
//   var superClass = this.prototype;
//  
//   for (var n in def) {
//       var item = def[n];                      
//  
//       if (item instanceof Function) {
//           item = Class.__asMethod__(item, superClass);
//       }
//  
//       proto[n] = item;
//   }
//  
//   proto.$ = superClass;
//   classDef.prototype = proto;
//  
//   //Give this new class the same static extend method    
//   classDef.extend = this.extend;      
//   return classDef;
// };

function Class() { }
Class.prototype.init = function() {};
Class.extend = function(def) {
  var classDef = function() {
      if (arguments[0] !== Class) { this.init.apply(this, arguments); }
  };
 
  var proto = new this(Class);
  var superClass = this.prototype;
 
  for (var n in def) {
      var item = def[n];                      
      if (item instanceof Function) item.$ = superClass;
      proto[n] = item;
  }
 
  classDef.prototype = proto;
 
  //Give this new class the same static extend method    
  classDef.extend = this.extend;      
  return classDef;
};

var JSObject = Class.extend({
  init: function() {}
});