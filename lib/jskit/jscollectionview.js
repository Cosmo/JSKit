var JSCollectionView = JSScrollView.extend({
  init: function() {
  },
  loadView: function() {
    JSLog("loadView");
    var that = this;
    this.containerViewInner = that.containerView.find(".js-view-inner");
    this.containerViewInner.css({ width: this.sectionInset.left + (this.numberOfItemsInSection(0) * this.itemSize.width) + this.sectionInset.right + "px" });
    
    for(var i = 0; i < this.numberOfItemsInSection(0); i++) {
      var indexPath = JSIndexPath.indexPathForRowːinSection(i,0);
      this.cellForRowAtIndexPath(indexPath).appendTo(this.containerViewInner);
    }
    
  },
  aloadView: function() {
    var that = this;
    this.containerViewInner = that.containerView.find(".js-view-inner");
    this.containerViewInner.css({ height: this.numberOfRowsInSection(0) * this.rowHeight + "px" });
    
    var rowStart  = Math.floor(this.containerView.scrollTop() / this.rowHeight);
    var rowEnd    = Math.min(this.numberOfRowsInSection(0), Math.ceil((this.containerView.scrollTop() + this.containerView.height()) / this.rowHeight));
    
    for(var i = rowStart; i < rowEnd; i++) {
      var indexPath = JSIndexPath.indexPathForRowːinSection(i,0);
      this.cellForRowAtIndexPath(indexPath).appendTo(this.containerViewInner);
    }
    
    this.containerView.on("scroll", function() {
      $.debounce(250, true, function() {
        JSLog("begin scrolling");
      });
      JSLog("scrolling");
      that.scrollViewDidScroll(that.containerView);
    });
    this.containerView.on("scroll", $.debounce(250, function() {
      JSLog("end scrolling");
      that.scrollViewDidEndDecelerating(that.containerView);
    }));
    
  },
  
  
  numberOfItemsInSection: function(section) { },
  numberOfSectionsInCollectionView: function() { },
  
  cellForRowAtIndexPath: function(indexPath) {}
  
});