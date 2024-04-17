const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const nameInput = document.getElementById('inputName');
    const emailInput = document.getElementById('inputEmail');

    const name = nameInput.value;
    const email = emailInput.value;
    
    if (name === '' || email === '') {
        alert('Por favor ingresa tu nombre y correo electrónico.');
        return;
    }

    let userId = localStorage.getItem('userId');
    if (userId !== null) {
        userId = Number(userId) + 1;
    } else {
        userId = 1;
    }

    const user = {
        name: name,
        email: email,
        userId: userId
    };

    localStorage.setItem(`user_${userId}`, JSON.stringify(user));
    localStorage.setItem('userId', userId);

    alert('¡Datos guardados en localStorage correctamente!');

    nameInput.value = '';
    emailInput.value = '';
});
