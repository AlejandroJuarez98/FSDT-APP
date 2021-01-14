$(document).ready(function (event) {
	var pathname = window.location.pathname
	var uid = null
	
	if (pathname.length > 22) {
		uid = window.location.hash.split("#")[1]
		pathname = window.location.pathname.split('/e')[0]	
	}

	switch (pathname) {
		case '/':
			login ()
			break
		case '/reset-password-request':
			changePassword (uid)
			break
		case '/dashboard':
			authentication ()
			dashboard()
			break
		case '/users':
			authentication ()
			getUsers ()
			break
		case '/products':
			authentication ()
			break
		case '/users/save':
			authentication ()
			saveUser()
			break
		case '/reset-password':
			resetPasssword ()
			break
	}
})

function authentication () {
	var _token = localStorage.getItem('_token')

	if (_token) {
		$.ajax ({
			url: '/validate-token',
			method: 'POST',
			headers: {
				authorization: _token
			}
		})
	} else {
		setTimeout (function () {
			window.location.href = '/'
		})
	}
}

function dashboard () {
	$('#dhs-users').on('click', function (event) {
		window.location.href = '/users'
	})

	$('#dhs-products').on('click', function (event) {
		window.location.href = '/products'
	})
}

function login () {
	$('#btn-login').on('click', function (event) {
		var user = $('#email').val()
		var password = $('#password').val()


		$.ajax ({
			url: '/api/user/sign-in',
			method: 'POST',
			data: { email: user, password: password },
			success: function (result) {
				swal("¡Buen trabajo!", "Bienvenido: " + result.data.result.fullname, 'success')
					.then(function (vaalue) {
						window.localStorage.setItem('_token', 'Bearer ' + result.data._token)

						setTimeout (function () {
							window.location.href = '/dashboard/'
						}, 500)
					})
				
			}
		})
	})
}

function resetPasssword () {
	$('#btn-change-password').on('click', function (event) {
		var email = $('#email').val()

		$.ajax({
			url: '/api/user/send-reset-password-request',
			method: 'POST',
			data: { email: email },
			success: function (result) {
				swal("¡Buen trabajo!", "Se envio un enlace al correo:  " + email, 'success')
					.then(function (value) {
						setTimeout (function () {
							window.location.href = '/'
						}, 500)
					})
			}
		})
	})
}

function changePassword (uid) {
	$('#btn-change-password').on('click', function (event) {
		var password = $('#password').val()
		var confirm = $('#confirm').val()

		if (password.trim().length == 0) {
			swal("¡Error!", "Completar todos los campos del formulario", 'error')
			return
		}

		if (confirm.trim().length == 0) {
			swal("¡Error!", "Completar todos los campos del formulario", 'error')
			return	
		}

		if (!password.includes(confirm)) {
			swal("¡Error!", "Las contraseñas no son iguales", 'error')
			return
		}

		$.ajax ({
			url: '/api/user/reset-password',
			method: 'POST',
			data: { password: password, userId: uid },
			success: function (result) {
				swal("¡Buen trabajo!", "Se ha guardado la contraseña", 'success')
					.then(function (value) {
						setTimeout (function () {
							window.location.href = '/'
						}, 500)
					})
			}
		})
	})
}

function getUsers () {
	var _token = window.localStorage.getItem('_token')

	$.ajax ({
		url: '/api/user/get-users',
		method: 'GET',
		data: null,
		headers: {
			authorization: _token
		},
		success: function (result) {
			var object = result.data.data

			for (var i = 0; i < object.length; i ++) {
				$("<tr>" +
				  	"<td>" + object[i].id + "</td>" +
				  	"<td>" + object[i].fullname + "</td>" +
				  	"<td>" + object[i].email + "</td>" +
				  	"<td>" + object[i].birthdate + "</td>" +
				  "</tr>").appendTo("#data-rows")
			}
		}
	})
}

function saveUser () {
	$('#save').on('click', function (event) {
		event.preventDefault()

		var object = {
			state: 1,
			email: $('#email').val(),
			confirm: $('#confirm').val(),
			fullname: $('#fullname').val(),
			password: $('#password').val(),
			birthdate: $('#birthdate').val()
		}

		var _token = window.localStorage.getItem('_token')

		if (object.fullname.trim().length == 0 || object.birthdate.trim().length == 0 || object.password.trim().length == 0 || object.email.trim().length == 0 || object.confirm.trim().length == 0) {
			swal("¡Error!", "Completar todos los campos del formulario", 'error')
			return
		}

		if (!object.password.includes(object.confirm)) {
			swal("¡Error!", "Las contraseñas no coinsiden", 'error')
			return
		}

		delete object.confirm

		$.ajax ({
			url: '/api/user/save',
			method: 'POST',
			data: object,
			headers: {
				authorization: _token
			},
			success: function (result) {
				swal ("¡Completado!", "Se ha registrado el usuario correctamente", "success")
					.then ((result) => {
						email = $('#email').val("")
						fullname = $('#fullname').val("")
						password = $('#password').val("")
						confirm = $('#confirm').val("")
						birthdate = $('#birthdate').val("")

						setTimeout (function () {
							window.location.href = '/users'
						}, 1000)
					})
			}
		})
	})
}