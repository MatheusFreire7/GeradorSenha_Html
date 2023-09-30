const sliderElement = document.querySelector("#slider");
const buttonElement = document.querySelector("#button");
const sizePassword = document.querySelector("#valor");
const password = document.querySelector("#password");
const containerPassword = document.querySelector("#container-password");
const uppercaseCheckbox = document.querySelector("#uppercase");
const lowercaseCheckbox = document.querySelector("#lowercase");
const numbersCheckbox = document.querySelector("#numbers");
const specialCheckbox = document.querySelector("#special");

const charset = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  special: '!@#$%^&*()_-+=<>?/[]{}|'
};

let novaSenha = '';

sizePassword.textContent = sliderElement.value;

sliderElement.addEventListener('input', function() {
  sizePassword.textContent = this.value;
});

function generatePassword() {
  const pass = generateRandomPassword(sliderElement.value);
  console.log(pass);
  containerPassword.classList.remove("hide");
  password.textContent = pass;
  novaSenha = pass;
}

function generateRandomPassword(length) {
  let pass = '';
  let selectedCharset = '';

  if (uppercaseCheckbox.checked) {
    selectedCharset += charset.uppercase;
  }
  if (lowercaseCheckbox.checked) {
    selectedCharset += charset.lowercase;
  }
  if (numbersCheckbox.checked) {
    selectedCharset += charset.numbers;
  }
  if (specialCheckbox.checked) {
    selectedCharset += charset.special;
  }

  // Se nenhuma caixa de seleção estiver marcada, use todos os caracteres
  if (selectedCharset === '') {
    selectedCharset = `${charset.uppercase}${charset.lowercase}${charset.numbers}${charset.special}`;
  }

  // Verifica se a senha contém pelo menos um caractere do tipo selecionado
  let selectedTypes = [];

  for (const type in charset) {
    if (selectedCharset.includes(charset[type])) {
      selectedTypes.push(type);
    }
  }

  if (selectedTypes.length === 0) {
    alert('Selecione pelo menos um tipo de caractere.');
    return '';
  }

  // Garante que haverá pelo menos um caractere de cada tipo selecionado
  for (const type of selectedTypes) {
    const randomIndex = Math.floor(Math.random() * charset[type].length);
    pass += charset[type].charAt(randomIndex);
  }

  // Preenche o restante da senha com caracteres aleatórios
  while (pass.length < length) {
    const randomIndex = Math.floor(Math.random() * selectedCharset.length);
    pass += selectedCharset.charAt(randomIndex);
  }

  return pass;
}


// Função para copiar a senha para a área de transferência
function copyPassword() {
  if (novaSenha.trim() !== "") {
    navigator.clipboard
      .writeText(novaSenha)
      .then(function () {
        Swal.fire({
          icon: 'success',
          title: 'Senha copiada com sucesso!',
          toast: true, 
          position: 'top-end', 
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao copiar a senha',
          text: 'Ocorreu um erro ao copiar a senha: ' + error,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'A senha está vazia!',
      text: 'Por favor, gere uma senha antes de copiar.',
      toast: true, 
      position: 'top-end', // Posição no canto superior direito
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
