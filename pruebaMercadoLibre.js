$(document).ready(() => {
  fetch('https://api.mercadolibre.com/sites/MLC/search?q=ipod').then(function(response) {
      return response.json();
  })
  .then(function(data) {
    console.log(data)
  })
  site();
  categories();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

    } else {
      $('#login-btn').click(login);
      $('#signup-btn').click(signup);
      $('#logout-btn').click(logout);
      $('#google-btn').click(ingresoGoogle);
      $('#facebook-btn').click(ingresoFacebook);
    }
  });
});

var database = firebase.database();
var user = null;

function login() {
  let email = $('#email-login').val();
  let pw = $('#pw-login').val();
  if (email !== '' && pw !== '') {
    const promise = firebase.auth().signInWithEmailAndPassword(email, pw);
    promise.catch(e => alert(e.message));
  }
}

function signup() {
  let email = $('#email-signup').val();
  let pw = $('#pw-signup').val();
  if (email !== '' && pw !== '') {
    const promise = firebase.auth().createUserWithEmailAndPassword(email, pw);
    promise.catch(e => alert(e.message));
  }
}

function logout() {
  firebase.auth().signOut();
}

function ingresoGoogle() {
  if(!firebase.auth().currentUser){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(result){
      var token = result.credential.accesstoken;
      var user = result.user;
      var name = result.user.displayName;
      agregarUserBD(user);
    }).catch(function(error) {
      console.log("error", error.message);
      var errorCode = error.Code;
      var errorMessage = error.message;
      var errorEmail = error.email;
      var errorCredential = error.credential;
      if(errorCode === 'auth/account-exists-with-different-credential'){
        alert('Es el mismo usuario');
      }
    });
  }else {
    firebase.auth().signOut();
  }
}

function ingresoFacebook() {
  if(!firebase.auth().currentUser){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    firebase.auth().signInWithPopup(provider).then(function(result){
      var token = result.credential.accesstoken;
      var user = result.user;
      console.log(user);
      agregarUserBD(user);

      /*window.location.href = 'movie.html';*/

    }).catch(function(error) {
      console.log("error", error.message);
      var errorCode = error.Code;
      var errorMessage = error.message;
      var errorEmail = error.email;
      var errorCredential = error.credential;
      if(errorCode === 'auth/account-exists-with-different-credential'){
        alert('Es el mismo usuario');
      }
    });
  }else {
    firebase.auth().signOut();
  }
}

// variables globales
var siteSelected = 'MLC';
var categorie = ''

// sitios para seleccionar

function site() {
  fetch('https://api.mercadolibre.com/sites/').then(function(response) {
      return response.json();
  })
  .then(function(data) {
    console.log(data)
    $.each(data, function(i, country) {
      if (country.id == 'MLC') {
        $('#country').append(`<option value="${country.id}" data-index="${i}" class="option ${i}" selected>${country.name}</option>`)
      } else {
        $('#country').append(`<option value="${country.id}" data-index="${i}" class="option ${i}">${country.name}</option>`)
      }
    });

    $('#country').on('change', selectionSite);

  })

}

function categories() {
  fetch(`https://api.mercadolibre.com/sites/${siteSelected}/categories`).then(function(response) {
      return response.json();
  })
  .then(function(data) {
    console.log(data)
    $.each(data, function(i, categorie) {
      $('#categories').append(`<li id="${categorie.id}" data-index="${i}" class="categorieSearch categorie-${i}">${categorie.name}</li>`)
      
    });

    $('.categorieSearch').on('click', selectionCategorie);

  })

}

function selectionCategorie() {
  let index = $(this).data('index');
  categoria = $('.categorie-'+index).val();
}

// seleccion de sitio para buscar productos (pais)
function selectionSite() {
  let option = $(this).val();
  siteSelected = siteSearch(option);
}

function siteSearch(option) {
  console.log(option);
  if (option != '') {
    return option;
  } else {
    return 'MLC';
  }
}


// llama a la funcion cuando al buscador se presiona un enter
$('#search').on('keypress', function(event) {
  if (event.which === 13) {
    search($('#search').val());
  }
});

// buscar todas las imagenes con palabra ingresada
function search(search) {
  $('#rowProductos').html('');
  fetch(`https://api.mercadolibre.com/sites/${siteSelected}/search?q=${search}`).then(function(response) {
      return response.json();
  })
  
    .then(function(data) {
      console.log(data);
        $.each(data.results, function(i, producto) {
          
        
        $('#rowProductos').append(`<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgcont" data-index="${i}">
                                    <div class="col-md-4">
                                      <img class="card-img-top img-${i}" src="${producto.thumbnail}">
                                    </div>
                                    <div class="col-md-8">
                                      <h5 class="card-title text-${i}">${producto.title}</h5>
                                      <p>${producto.price}</p>
                                    </div>
                                    </div>`);
  
      });
   });

}

