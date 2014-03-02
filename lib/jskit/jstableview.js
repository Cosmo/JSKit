var JSTableView = JSScrollView.extend({
  init: function() {
    this.rowHeight          = 40;
    this.visibleIndexPaths  = [];
    this.cellStyles         = {
      JSTableViewCellStyleDefault:  { cssClassName: "js-table-view-cell-style-default", view: "<li class='js-table-view-cell'><span class='text-label'></span></li>" },
      JSTableViewCellStyleSubtitle: { cssClassName: "js-table-view-cell-style-subtitle", view: "<li class='js-table-view-cell'><span class='text-label'></span><span class='detail-text-label'></span></li>" }
    };
  },
  loadView: function() {
    JSLog("loadView");
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
  numberOfRowsInSection: function(section) {},
  
  
  // Cell
  cellForRowAtIndexPath: function(indexPath) {},
  heightForRowAtIndexPath: function(indexPath) {
    JSLog("heightForRowAtIndexPath:" + JSON.stringify(indexPath));
    return this.rowHeight;
  },
  
  // Selection
  
  holy: function(number) {
    console.log("works from parent!" + number);
  },
  
  selectRowAtIndexPathːanimatedːscrollPosition: function(indexPath, animated, scrollPosition) {
    JSLog("selectRowAtIndexPath:"+JSON.stringify(indexPath)+",animated:"+JSON.stringify(animated)+",scrollPosition:");
    var that = this;
    var style   = { scrollTop: (indexPath.row * this.rowHeight) };
    var options = { complete: function() {
      var cell    = that.containerView.find(".js-table-view-cell[data-section="+indexPath.section+"][data-row="+indexPath.row+"]")
      cell.addClass("selected");
    } };
    
    if(animated) {
      this.containerView.animate(style, options);
    } else {
      options.complete();
      this.containerView.css(style, options);
    }
    
    this.willSelectRowAtIndexPath(indexPath);
  },
  willSelectRowAtIndexPath: function(indexPath) {
    JSLog("willSelectRowAtIndexPath:" + JSON.stringify(indexPath));
    this.didSelectRowAtIndexPath(indexPath);
  },
  didSelectRowAtIndexPath: function(indexPath) {
    JSLog("didSelectRowAtIndexPath:" + JSON.stringify(indexPath));
  },

  // Scrolling
  scrollViewDidEndDecelerating: function(scrollView) {
    var rowStart  = Math.floor(scrollView.scrollTop() / this.rowHeight);
    var rowEnd    = Math.min(Math.ceil((scrollView.scrollTop() + scrollView.height()) / this.rowHeight), this.numberOfRowsInSection(0));
    
    var loadedCellIndexPathRows   = [];
    var visibleCellIndexPathRows  = [];
    var removableCellIndexPaths   = [];
    var animated = false;
    
    $(this.visibleIndexPaths).each(function(index, item) {
      visibleCellIndexPathRows.push(item.row)
    });
    
    scrollView.find(".js-table-view-cell").each(function(index, item) {
      section = parseInt($(item).attr("data-section"));
      row     = parseInt($(item).attr("data-row"));
      loadedCellIndexPathRows.push(row);
    });
    
    var diff = $(loadedCellIndexPathRows).not(visibleCellIndexPathRows).get();
    
    $(diff).each(function(index, row) {
      var indexPath = JSIndexPath.indexPathForRowːinSection(row,0);
      var cell = scrollView.find(".js-table-view-cell[data-section="+0+"][data-row="+indexPath.row+"]");
      cell.addClass("removing");
      if(animated) {
        cell.animate({ opacity: 0.0 }, { complete: function(){
          this.remove();
        } });
      }
      else {
        cell.remove();
      }
      
    });
  },
  scrollViewDidScroll: function(scrollView) {
    // JSLog("scrollViewDidScroll:");
    
    // this should be implemented by the user via subclassing
    // heightForRowAtIndexPath:indexPath should be respected
    
    rowStart  = Math.floor(scrollView.scrollTop() / this.rowHeight);
    rowEnd    = Math.min(Math.ceil((scrollView.scrollTop() + scrollView.height()) / this.rowHeight), this.numberOfRowsInSection(0));
    animated  = false;
    
    this.visibleIndexPaths = [];
    
    for(var i = rowStart; i < rowEnd; i++) {
      var indexPath = JSIndexPath.indexPathForRowːinSection(i,0);
      this.visibleIndexPaths.push(indexPath);
      var cell = scrollView.find(".js-table-view-cell[data-section="+indexPath.section+"][data-row="+indexPath.row+"]");
      if(cell.length == 0) {
        cell = this.cellForRowAtIndexPath(indexPath);
        
        if(animated) {
          cell.css({ opacity: 0.0 });
          cell.animate({ opacity: 1.0 });
          cell.appendTo(this.containerViewInner);
        }
        else {
          cell.css({ opacity: 1.0 });
          cell.appendTo(this.containerViewInner);
        }
      }
      if(cell.hasClass("removing")) {
        if(animated) {
          cell.clearQueue().stop();
          cell.animate({ opacity: 1.0 });
        }
        else {
          cell.css({ opacity: 1.0 });
        }
      }
    }
    
  }
});