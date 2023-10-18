(function(){

  Tablesort.extend('value', function(item) {
    return (
      item.search(/(January|February|March|April|May|June|July|August|September|October|November|December)/i) !== -1
    );
  }, function(a, b) {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames.indexOf(b) - monthNames.indexOf(a);
  });
}());