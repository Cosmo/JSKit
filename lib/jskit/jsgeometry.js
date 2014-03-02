var JSPoint = function(x, y) {
  this.x = x;
  this.y = y;
  return { x: this.x, y: this.y };
}

var JSSize = function(width, height) {
  this.width  = width;
  this.height = height;
  return { width: this.width, height: this.height };
}

var JSRect = function(origin, size) {
  this.origin = origin;
  this.size   = size;
  return { origin: this.origin, size: this.size };
};

var JSRectMake = function(x, y, width, height) {
  var origin  = new JSPoint(x, y);
  var size    = new JSSize(width, height);
  return new JSRect(origin, size);
};




var JSEdgeInsets = function(top, left, bottom, right) {
  this.top    = top;
  this.left   = left;
  this.bottom = bottom;
  this.right  = right;
  return { top: this.top, left: this.left, bottom: this.bottom, right: this.right };
};

var JSEdgeInsetsMake = function(top, left, bottom, right) {
  return new JSEdgeInsets(top, left, bottom, right);
};