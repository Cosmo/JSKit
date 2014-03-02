$(function() {
  tableViewFrame = JSRectMake(0, 0, $(window).width() / 3, $(window).height());
  tableView = new ExampleTableView;
  tableView.initWithFrame(tableViewFrame);
  tableView.loadView();
  
  collectionViewFrame = JSRectMake(($(window).width() / 3), 0, ($(window).width() / 3) * 2, $(window).height());
  collectionView = new ExampleCollectionView;
  collectionView.initWithFrame(collectionViewFrame);
  collectionView.loadView();
  
  $(window).on("resize", function(){
    tableViewFrame = JSRectMake(0, 0, $(window).width() / 3, $(window).height());
    tableView.setFrame(tableViewFrame);
    
    collectionViewFrame = JSRectMake(($(window).width() / 3), 0, ($(window).width() / 3) * 2, $(window).height());
    collectionView.setFrame(collectionViewFrame);
  });
  
});

var ExampleCollectionView = JSCollectionView.extend({
  initWithFrame: function(frame) {
    this.frame = frame;
    this.setFrame(frame);
    this.init();
  },
  init: function() {
    this.containerView = $("#collection-view-example");
    this.containerView.addClass("example-collection-view");
    this.data = [["Test 1", "Test 2", "Test 3", "Test 4", "Test 4", "Test 5", "Test 6", "Test 7", "Test 8", "Test 9", "Test 10", "Test 11", "Test 12", "Test 13", "Test 14", "Test 15", "Test 16"]];
    this.itemSize = new JSSize(92, 138);
    this.sectionInset = JSEdgeInsetsMake(0, 50, 0, 50); // top, left, bottom, right
    this.minimumLineSpacing = 40.0;
    this.minimumInteritemSpacing = 40.0;
    console.log(this.sectionInset);
    arguments.callee.$.init.call(this);
  },
  layoutAttributesForItemAtIndexPath: function(indexPath) {
    var attributes    = new JSCollectionViewLayoutAttributes();
    attributes.size   = this.itemSize;
    itemWidthSpace = attributes.size.width + this.minimumInteritemSpacing;
    var itemsPerLine = Math.max(Math.floor((((this.frame.size.width - this.sectionInset.left - this.sectionInset.right)) + this.minimumInteritemSpacing) / itemWidthSpace), 1);
    var line = Math.floor(indexPath.row / itemsPerLine);
    
    var left = (attributes.size.width * (indexPath.row % itemsPerLine)) + this.sectionInset.left;
    left = left + (this.minimumInteritemSpacing * (indexPath.row % itemsPerLine));
    var top = (line * attributes.size.height) + this.sectionInset.top;
    top = top + ((line + 1) * this.minimumLineSpacing);
    
    attributes.frame = JSRectMake(left, top, this.itemSize.width, this.itemSize.height);
    
    return attributes;
  },
  holy: function(size) {
    this.itemSize = new JSSize(size*2.4 + 30, size * 2 + 30);
    this.invalidateLayout();
  },
  setFrame: function(frame) {
    this.frame = frame;
    this.containerView.css({
      left: this.frame.origin.x + "px",
      top: this.frame.origin.y + "px",
      width: this.frame.size.width + "px",
      height: this.frame.size.height + "px"
    });
    this.invalidateLayout();
  },
  shouldInvalidateLayoutForBoundsChange: function(newBounds) {
    return true;
  },
  invalidateLayout: function() {
    var that = this;
    this.containerView.find(".js-collection-view-cell").each(function(index, item) {
      cell = $(item);
      row = parseInt(cell.data("row"), 10);
      indexPath = JSIndexPath.indexPathForRowːinSection(row,0);
      attributes = that.layoutAttributesForItemAtIndexPath(indexPath);
      cell.css({ top: attributes.frame.origin.y + "px", left: attributes.frame.origin.x + "px", width: attributes.size.width + "px", height: attributes.size.height + "px" });
    });
  },
  cellForRowAtIndexPath: function(indexPath) {
    var that = this;
    
    var cell = $("<li class='js-collection-view-cell'><span class='text-label'></span></li>");
    cell.addClass("js-collection-view-cell-style-default");
    
    cell.find(".text-label").text(this.data[indexPath.section][indexPath.row]);
    
    cell.attr("data-section", indexPath.section);
    cell.attr("data-row", indexPath.row);
    
    var attributes = this.layoutAttributesForItemAtIndexPath(indexPath);
    cell.css({ width: attributes.size.width + "px", height: attributes.size.height + "px", top: attributes.frame.origin.y + "px", left: attributes.frame.origin.x + "px" });
    
    cell.addClass("cell-" + indexPath.row % 5);
    
    return cell;
  },
  numberOfItemsInSection: function(section) {
    return this.data[section].length;
  },
  numberOfSectionsInCollectionView: function() {
    return this.data.length;
  }
});



var ExampleTableView = JSTableView.extend({
  initWithFrame: function(frame) {
    this.frame = frame;
    this.setFrame(frame);
    this.init();
  },
  init: function() {
    this.containerView = $("#table-view-example");
    this.containerView.addClass("example-table-view");
    
    array = new Array(10000);
    
    this.data = [array];
    arguments.callee.$.init.call(this);
  },
  cellForRowAtIndexPath: function(indexPath) {
    JSLog("cellForRowAtIndexPath:" + JSON.stringify(indexPath))
    var that = this;
    
    if(indexPath.row == 0) {
      var cell = $(this.cellStyles.JSTableViewCellStyleSubtitle.view);
      cell.addClass(this.cellStyles.JSTableViewCellStyleSubtitle.cssClassName);
      cell.find(".detail-text-label").text(indexPath.section + ", " + indexPath.row);
      cell.find(".text-label").text("Select to change item size");
    } else {
      var cell = $(this.cellStyles.JSTableViewCellStyleDefault.view);
      cell.addClass(this.cellStyles.JSTableViewCellStyleDefault.cssClassName);
      cell.find(".text-label").text(indexPath.section + ", " + indexPath.row);
    }
    
    cell.attr("data-section", indexPath.section);
    cell.attr("data-row", indexPath.row);
    cell.css({ height: this.heightForRowAtIndexPath(indexPath) + "px", top: (indexPath.row * this.rowHeight) + "px" });
    
    cell.on("click", function() {
      that.selectRowAtIndexPathːanimatedːscrollPosition(indexPath, false, "");
    });
    return cell;
  },
  selectRowAtIndexPathːanimatedːscrollPosition: function(indexPath, animated, scrollPosition) {
    collectionView.holy(indexPath.row);
  },
  numberOfRowsInSection: function(section) {
    return this.data[section].length;
  },
});

