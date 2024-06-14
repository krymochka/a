document.addEventListener('DOMContentLoaded', async (event) => {
    // Определение user_id, username и photo_url из URL
    const userId = getUrlParameter('user_id');
    const username = getUrlParameter('username');
    const photoUrl = getUrlParameter('photo_url');

    // Установка имени пользователя и аватара на главной странице
    if (username) {
        document.getElementById('user-name').textContent = username;
    }
    if (photoUrl) {
        document.getElementById('user-avatar').src = photoUrl;
    }

    // Генерация реферальной ссылки
    generateReferralLink(userId);

    // Отслеживание кликов по кнопкам навигации
    document.getElementById('main-link').addEventListener('click', function() {
        showPage('main-page');
    });
    document.getElementById('tasks-link').addEventListener('click', function() {
        showPage('tasks-page');
    });
    document.getElementById('referral-link').addEventListener('click', function() {
        showPage('referral-page');
    });

    // Инициализация страницы по умолчанию
    showPage('main-page');
});

// Функция для отображения страницы
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Функция для генерации реферальной ссылки
function generateReferralLink(userId) {
    const referralLink = `https://t.me/FixiCoin_Bot/app?startapp=ref_${userId}`;
    document.getElementById('referral-link-display').value = referralLink;
}

// Функция для копирования реферальной ссылки в буфер обмена
function copyReferralLink() {
    const referralLink = document.getElementById('referral-link-display');
    referralLink.select();
    referralLink.setSelectionRange(0, 99999); // Для мобильных устройств
    document.execCommand('copy');
    alert("Referral link copied to clipboard!");
}

// Функция для отправки реферальной ссылки в Telegram
function sendReferralLink() {
    const referralLink = document.getElementById('referral-link-display').value;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}`;
    window.open(telegramUrl, '_blank'); // Открыть ссылку в новой вкладке
}

// Функция для подтверждения подписки в Telegram
function confirmSubscription() {
    alert("Please confirm your subscription in the Telegram channel.");
    // Здесь должна быть логика для проверки подписки пользователя
    setTimeout(function() {
        alert("Subscription confirmed! You have earned 10 coins.");
        updateBalance(10);
    }, 5000);
}

// Функция для обновления баланса пользователя
function updateBalance(amount) {
    const balanceElement = document.getElementById('balance');
    let currentBalance = parseInt(balanceElement.innerText);
    balanceElement.innerText = currentBalance + amount;
}

// Функция для получения параметров URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
