console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    console.log(koalaToSend);
    // call saveKoala with the new obejct
    createKoala( koalaToSend );
  }); 
  $(document).on('click', '.updateButton', updateKoala);
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $("#viewKoalas").empty();
  $.ajax({
    method: 'GET',
    url: '/koalas'
  })
  .then(function(response) {
    console.log("GET /songs response", response);
    // append data to the DOM
    for (let koala of response) {
      $('#viewKoalas').append(`
        <tr data-id=${koala.id}>
          <td>${koala.name}</td>
          <td>${koala.gender}</td>
          <td>${koala.age}</td>
          <td>${koala.ready_to_transfer} <button class="updateButton">make ready</button></td>
          <td>${koala.notes}</td>
        </tr>
      `);
    }
  }).catch(function(error) {
    console.log(error);
  })
}

  // end getKoalas

function createKoala( newKoala ){
  console.log( 'in createKoala', newKoala );
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: newKoala
  }).then(function(response){
    console.log(response);
    getKoalas();

  }).catch(function(error){
    console.log(error)
  })
};


function updateKoala(){
  let a = $(this).closest('tr').data('id')
  $.ajax({
    method: 'PUT',
    url: `/koalas/:${a}`
  })
  .then( function (response) {

  getKoalas()
  })
  .catch( function (response){
    swal('')
  }
  )
}
