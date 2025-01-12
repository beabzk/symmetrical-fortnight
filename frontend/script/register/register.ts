document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form') as HTMLFormElement;
    const userTypeSelect = document.getElementById('userType') as HTMLSelectElement;
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const confirmPasswordInput = document.getElementById('Confirmpassword') as HTMLInputElement;
    const termsCheckbox = document.getElementById('terms') as HTMLInputElement;
  
    const resetValidation = () => {
      userTypeSelect.classList.remove('is-invalid');
      nameInput.classList.remove('is-invalid');
      emailInput.classList.remove('is-invalid');
      passwordInput.classList.remove('is-invalid');
      confirmPasswordInput.classList.remove('is-invalid');
      termsCheckbox.classList.remove('is-invalid');
    };
  
    const validateInput = (): boolean => {
      let isValid = true;
      resetValidation();
  
      if (userTypeSelect.value === '') {
        userTypeSelect.classList.add('is-invalid');
        isValid = false;
      }else{
      if (!nameInput.value) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      }else{
      if (!emailInput.value) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      }else{
      if (!passwordInput.value) {
        passwordInput.classList.add('is-invalid');
        isValid = false;
      }else{
      if (!confirmPasswordInput.value) {
        confirmPasswordInput.classList.add('is-invalid');
        isValid = false;
      }else{
      if (passwordInput.value !== confirmPasswordInput.value) {
          
          isValid = false;
          confirmPasswordInput.style.color = "red";
      }else{
      if (!termsCheckbox.checked) {
        termsCheckbox.classList.add('is-invalid');
        isValid = false;
      }}}}}}
      }
  
      return isValid;
    };
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (validateInput()) {
        const userData = {
          userType: userTypeSelect.value,
          name: nameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        };
  
        try {
          localStorage.setItem('registeredUser', JSON.stringify(userData));
          //  alert('Registration Successful! User data has been saved locally.');
          form.innerHTML = "Registration Successful! User data has been saved locally.";
          form.style.color = "green";
          form.style.fontWeight="bold";

            form.reset();
             resetValidation();
        } catch (error) {
           alert('Error saving data in local storage');
         console.error('Error saving to local storage', error);
        }
      }
    });
  });
  