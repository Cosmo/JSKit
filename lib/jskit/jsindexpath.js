var JSIndexPath = function() {
  this.indexes;
};

JSIndexPath.indexPathWithIndex = function(index) {
  var indexPath     = new JSIndexPath();
  indexPath.indexes = [index];
  return indexPath;
}

JSIndexPath.indexPathWithIndexesːlength = function(indexes, length) {
  // no need for length
  var indexPath     = new JSIndexPath();
  indexPath.indexes = indexes;
  return indexPath;
}

JSIndexPath.indexPathForRowːinSection = function(row, section) {
  var indexPath        = new JSIndexPath()
  indexPath.indexes   = [section, row]
  indexPath.row       = row;
  indexPath.section   = section;
  
  return indexPath;
}