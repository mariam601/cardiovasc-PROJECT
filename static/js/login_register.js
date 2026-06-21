/* login_register.js — client-side validation only, Django handles auth */

function showError(el, msg) {
    el.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + msg;
    el.style.display = 'block';
}

function hideError(el) {
    el.style.display = 'none';
}

/* ─── LOGIN ─── */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    const clientError = document.getElementById('clientError');

    loginForm.addEventListener('submit', function (e) {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !password) {
            e.preventDefault();
            showError(clientError, 'Please enter both username and password.');
            return;
        }
        hideError(clientError);

        const btn = document.getElementById('loginBtn');
        btn.textContent = 'Logging in...';
        btn.disabled = true;
    });
}

/* ─── REGISTER ─── */
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    const clientError = document.getElementById('clientError');
    const usernameInput = document.getElementById('username');
    const usernameFeedback = document.getElementById('usernameFeedback');
    let usernameOk = true;
    let checkTimeout = null;

    /* Live username availability check */
    if (usernameInput && typeof CHECK_USERNAME_URL !== 'undefined') {
        usernameInput.addEventListener('input', function () {
            clearTimeout(checkTimeout);
            const val = this.value.trim();
            if (!val) {
                usernameFeedback.textContent = '';
                usernameOk = true;
                return;
            }
            usernameFeedback.style.color = '#888';
            usernameFeedback.textContent = 'Checking...';

            checkTimeout = setTimeout(() => {
                fetch(CHECK_USERNAME_URL + '?username=' + encodeURIComponent(val))
                    .then(r => r.json())
                    .then(data => {
                        if (data.exists) {
                            usernameFeedback.style.color = '#c0392b';
                            usernameFeedback.textContent = '✗ Username already taken';
                            usernameOk = false;
                        } else {
                            usernameFeedback.style.color = '#0f6e56';
                            usernameFeedback.textContent = '✓ Username available';
                            usernameOk = true;
                        }
                    })
                    .catch(() => {
                        usernameFeedback.textContent = '';
                        usernameOk = true;
                    });
            }, 400);
        });
    }

    /* Password strength indicator */
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function () {
            const len = this.value.length;
            if (len === 0) return;
            if (len < 8) {
                this.style.borderColor = '#c0392b';
            } else {
                this.style.borderColor = '#0f6e56';
            }
        });
    }

    registerForm.addEventListener('submit', function (e) {
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const role = document.getElementById('role').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;

        /* Empty fields */
        if (!username || !email || !phone || !role || !password || !confirmPassword) {
            e.preventDefault();
            showError(clientError, 'Please fill in all required fields.');
            return;
        }

        /* Username taken (from live check) */
        if (!usernameOk) {
            e.preventDefault();
            showError(clientError, 'That username is already taken. Please choose another.');
            usernameInput.focus();
            return;
        }

        /* Password length */
        if (password.length < 8) {
            e.preventDefault();
            showError(clientError, 'Password must be at least 8 characters.');
            return;
        }

        /* Password match */
        if (password !== confirmPassword) {
            e.preventDefault();
            showError(clientError, 'Passwords do not match.');
            return;
        }

        /* Email format */
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(email)) {
            e.preventDefault();
            showError(clientError, 'Please enter a valid email address.');
            return;
        }

        hideError(clientError);
        const btn = document.getElementById('registerBtn');
        btn.textContent = 'Creating account...';
        btn.disabled = true;
    });
}
