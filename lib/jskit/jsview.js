var JSView = JSObject.extend({
  initWithFrame: function(frame) {
    this.frame          = { origin: { x: 0, y: 0 }, size: { width: 0, height: 0 } };
    this.setFrame(frame);
    this.init();
  },
  init: function() {
    this.containerView  = null;
    this.containerViewInner = null;
    arguments.callee.$.init.call(this);
  },
  setFrame: function(frame) {
    this.frame = frame;
    this.containerView.css({
      left: this.frame.origin.x + "px",
      top: this.frame.origin.y + "px",
      width: this.frame.size.width + "px",
      height: this.frame.size.height + "px"
    });
  },
  loadView: function() {
  }
});