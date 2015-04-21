$( document ).ready(function() {
  var size = prompt("Please enter an even number to start your game!","4");
  $container = $( '#container' )
  $container.html('<h3>Voila! ' + size + '</h3>');
  for (var i = 1; i <= size; i++) {
    $container.append('<div class="row"></div>');
    for (var z = 1; z <= size; z++) {
      $row = $('#container .row').last();
      $row.append('<div class="card"></div>');
    }
  }
});