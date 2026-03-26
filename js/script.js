/*
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
  */



// ================ | VARIAVEIS NAVBAR | =======================

// ================ | SWITCH DO DARK MODE ====================

const darkModeSwitch = document.getElementById('darkModeSwitch'); // o checkbox do switch

const htmlElement = document.documentElement; // aplico em todo o elemento <html>

// ================ | VERIFICA SE USER JÁ ESCOLHEU TEMA  ====================

const userTheme = localStorage.getItem('userTheme');

// ================ LOGO IMG  ====================

const navbarLogo = document.getElementById('logo-default');


// ================ | VARIAVEIS CARD SECTION | ====================

const cardImg = document.getElementById('cardImg');
const cardText = document.getElementById('cardText');
const cardBtn = document.getElementById('cardBtn');



// ================ | VARIAVEIS LISTA DE HOBBIES | ====================

const hobbyList = document.getElementById("hobbyList");
const hobbyBtn = document.getElementById('hobbyBtn');
const heroColor = document.getElementById('favColor');
const heroImg = document.getAnimations('newProfileImg');


// ================ | VARIAVEIS FORM | ====================

// da parte do FORM
const profileName = document.getElementById("profileName");
const profileTextArea = document.getElementById('profileTextArea');
const favColorValue = document.getElementById('favColor');
// input ref. a imagem
const newProfileImgInput = document.getElementById('newProfileImg'); 



// da parte do CARD para a troca dos valores que o utilizador introduzir
const newHeroName = document.getElementById('heroName');
const newHeroDescription = document.getElementById('profileText');
const newFavColorValue = document.getElementById('favColorValue');

const newHeroCardBg = document.getElementById('heroCard');

// para poder manipular o texto do card a alterar sua cor no listener.
const textCard = document.getElementById('favColorText');

// manipular a imagem 
const profileImgCard = document.getElementById('profileImg'); 






// ================ | CHANGE BACKGROUND COLOR | =======================

const changeColorBtn = document.getElementById('changeBgColor');

const s02Bg = document.getElementById('s02');

// ================ | NAVBAR EVENTS | =======================

// ================  | VERIFICA SE USER JÁ ESCOLHEU TEMA |  ====================

// se o utilizador já esteve no site e escolheu o dark mode, vai manter o dark mode
// e ativar o switch como dark mode, além de carregar a logo adequada ao tema
if(userTheme === 'dark'){
    htmlElement.setAttribute('data-bs-theme', 'dark');
    darkModeSwitch.checked = true;
    navbarLogo.setAttribute('src', 'img/logo-gc-dark-mode.png');
}

// ================  | SWITCH DO DARK MODE  | ====================

// poderia usar o 'click', mas o 'change' é mais adequado para switches
// é mais seguro pois garante que a situação só ocorre se o valor realmente mudar.
darkModeSwitch.addEventListener('change', function() {
    if (darkModeSwitch.checked) {
        // data-bs-theme é um atributo de dados do bootstrap, funciona como
        // um interruptor global para o bootstrap, é como ele altera as variáveis CSS
        // para os modos dark e light
        htmlElement.setAttribute('data-bs-theme', 'dark');
        // Salva o modo dark no localStorage para manter preferencia do utilizador
        localStorage.setItem('userTheme', 'dark');
        navbarLogo.setAttribute('src', 'img/logo-gc-dark-mode.png');
       
    } else {
        htmlElement.setAttribute('data-bs-theme', 'light');
        // Salva o modo light no localStorage para manter preferencia do utilizador
        localStorage.setItem('userTheme', 'light');
        navbarLogo.setAttribute('src', 'img/logo-gc-light-mode.png');
    }
});


// ================ | CARD SECTION | ====================


// ================ | CARD IMAGE | ====================

cardBtn.addEventListener('click', function() {

    
    // verifica a imagem que está ativa e faz as trocas de img e texto de acordo  
    if(cardImg.getAttribute('src') == "img/dog-working-ed.png"){
        
        cardImg.setAttribute(
            'src', 
            "img/dog-playing-ed.png");
        cardText.innerText = "But I also love my favorite place in the world! Let's enjoy a sunny day at the beach!"            
    }
    else{
        cardImg.setAttribute(
            'src', 
            "img/dog-working-ed.png");       
        cardText.innerText = "I really love to work! As you can see I work hard!"               
    }
});    

     
// ====================  RECEBER OS DADOS DA LISTA HOBBIES ====================



hobbyBtn.addEventListener('click', function() {
    
    let newHobby = prompt("Adicione um hobby a minha lista: ");

    // confirma se a entrada é valida, se foi cancelada e também remove espaços
    if (newHobby !== null && newHobby.trim() !== "") {
        
        // cria o item de lista
        let newLi = document.createElement('li');
        
        // Adiciona a classe do Bootstrap para manter o estilo da lista, senao perde o estilo
        newLi.classList.add('list-group-item');
        
        // exibicao do novo hobby
        newLi.innerText = newHobby;

        // salva na lista
        hobbyList.appendChild(newLi);
    }
});


// -------------------- OBJECT EVENT - KEYDOWN ENTER ------------------

document.addEventListener('keydown', function(event){
    console.log(event.key);
    if (event.key === 'Enter'){
        alert("Tem certeza que acabou o exercício?")
    }    
});



// ================ | PROFILE SECTION | ====================

// ------------------- | CHANGE BACKGROUND COLOR | ------------------------

changeColorBtn.addEventListener('click', changeBgColor);

const makeRandColor = () => {
const r = Math.floor(Math.random() * 255);
const g = Math.floor(Math.random() * 255);
const b = Math.floor(Math.random() * 255);
return `rgb(${r}, ${g}, ${b})`;
};

function changeBgColor() {
        
    // Gera a cor chamando a function e guarda na constante newColor
    const newColor = makeRandColor();
    //console.log("A cor gerada foi: ", newColor);
    
    /* É necessário remover as classes de BG do Bootstrap que estavam a bloqueiar a function do JS
     No BS 5, as classes utilitárias de background color (como bg-primary-subtle) usam a flag !important no CSS interno. Ou seja, ao tentar mudar o style.backgroundColor via JS, o CSS do Bootstrap prevalece e a cor do BG não muda visualmente. */
    s02Bg.classList.remove('bg-primary-subtle', 'bg-light', 'bg-dark');

    // 3. Aplica a cor diretamente no estilo da section (tem que ser na section, nao nas div, pois a section engloba as divs)
    s02Bg.style.backgroundColor = newColor;
}


// ------------------- | FORM AND UPDATE PROFILE SECTION | ------------------------


profileForm.addEventListener('submit', function (event){
    // impede form de enviar para o servidor - comportamento default
    event.preventDefault();
    
    // recebe um objeto com todos os inputs do formulario
    // linha default 
    let data = new FormData(this);
    
    // criar variavel para guardar o input do user pelo name do campo. Em formularios name
    // funciona para imput, textarea e select

    let newName = data.get("profileName").trim();
    let newDescription = data.get("profileTextArea");
    let newFavColor = data.get('favColor');
    
    console.log("O valor recuperado do name 'favColorValue' é:", newFavColor);

    // altera o valor original do campo Nome pelo input do utilizador
    newHeroName.innerText = newName;
    // altera o valor original do campo descrição pelo input do utilizador
    newHeroDescription.innerText = newDescription; 
    // altera o valor original do campo pelo input do utilizador
    newFavColorValue.innerText = newFavColor;
    // altera o valor original do background pela cor escolhida pelo utilizador
    newHeroCardBg.style.backgroundColor = newFavColor;
      
    //de acordo com a cor escolhida no input para background do card, deve mudar
    // cor de fonte para fazer contraste com o background
    
    let userColorBg = getLuminance(newFavColor);

    if(userColorBg >= 128 ){
        newHeroName.style.color = "#000000";
        newHeroDescription.style.color = "#000000";
        newFavColorValue.style.color = "#000000";
        textCard.style.color = "#000000";
        textCard.innerText = "Agora a tua cor favorita está no background da tua descrição do teu herói!";        
    }
    else {
        newHeroName.style.color = "#ffffff";
        newHeroDescription.style.color = "#fff";
        newFavColorValue.style.color = "#fff";
        textCard.style.color = "#fff";
        textCard.innerText = "Agora a tua cor favorita está no background da tua descrição do teu herói!";
    }


    // para receber ficheiro de imagem

    // Pegamos a lista de ficheiros do input e selecionamos o primeiro [0]. Apesar de não ter
    // o atributo multiple, o JS sempre trata a propriedade .files como uma FILELIST.
    const file = newProfileImgInput.files[0];

    // Verificar se o utilizador realmente escolheu um ficheiro
    if (file) {
    // Criar uma URL temporária para esse ficheiro
    const imageUrl = URL.createObjectURL(file);
    
    // 4. Mudamos o src da imagem no card
    profileImgCard.src = imageUrl;
}
});
/*
// Sara, a Function getLuminance foi gerada por AI.
// O objetivo é alterar a cor da letra do card de acordo com o tipo de cor selecionada
// pelo utilizador, neste caso, cor escura muda a cor da fonte para branco e vice versa.
// É um cálculo matemático para transformar o valor da cor em hexadecimal e com este valor
// verificar posteriormente se será menor que 128, e caso seja, o bg terá fundo escuro
// e a cor da fonte deve ser clara. No caso contrário a cor deverá ser clara.
// Percebo o contexto mas não saberia realizar este cálculo matemático,
// por isso mesmo tendo sido criada totalmente por AI, resolvi aplicar ao projeto
// para ficar bem em termos visuais.
// 
*/

function getLuminance(hex) {
    // Remove o '#' se houver e converte para números
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    
    // Fórmula de luminosidade percebida
    return (r * 0.299 + g * 0.587 + b * 0.114);
}


// ================ | API SECTION | ====================

// Primeiro, selecionamos os elementos específicos da nova seção
const btnAPI = document.getElementById('btnAPI');
const heroImgAPI = document.getElementById('heroImgAPI');
const heroNameAPI = document.getElementById('heroNameAPI');
const quoteAPI = document.getElementById('quoteAPI');

btnAPI.addEventListener('click', function() {
    // Sorteamos um ID entre 1 e 731
    const idAleatorio = Math.floor(Math.random() * 731) + 1;

    // 2. Faz a chamada para a API
    fetch(`https://akabab.github.io/superhero-api/api/id/${idAleatorio}.json`)
        .then(response => response.json())
        .then(heroi => {
            // 3. Torna o card visível
            heroCardAPI.style.display = 'block';

            // 4. Preenche a imagem e o nome
            heroImgAPI.src = heroi.images.md;
            heroNameAPI.innerText = heroi.name;

            // 5. Extrai editora e primeira aparição da biografia
            const editora = heroi.biography.publisher || "Não informada";
            const primeiraAparicao = heroi.biography.firstAppearance || "Desconhecida";

            // 6. Define o texto final
            quoteAPI.innerText = `Editora: ${editora} | Primeira Aparição: ${primeiraAparicao}`;
            
            // Rola a página suavemente até o card
            heroCardAPI.scrollIntoView({ behavior: 'smooth' });
        });
});

