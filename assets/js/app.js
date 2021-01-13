$(document).ready(function (event) {
	var pathname = window.location.pathname

	switch (pathname) {
		case '/':
			login ()
			break
		case '/reset-password':
			resetPasssword ()
			break
	}
})

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
				window.localStorage.setItem('_token', 'Bearer ' + result.data._token)

				setTimeout (function () {
					window.location.href = '/dashboard/'
				})
			}
		})
	})
}

function resetPasssword () {
	
}