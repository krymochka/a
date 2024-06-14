document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('main-link').addEventListener('click', function() {
        showPage('main-page');
    });

    document.getElementById('tasks-link').addEventListener('click', function() {
        showPage('tasks-page');
    });

    document.getElementById('referral-link').addEventListener('click', function() {
        showPage('referral-page');
    });

    // Generate referral link
    generateReferralLink();
});

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function confirmSubscription() {
    alert("Please confirm your subscription in the Telegram channel.");
    setTimeout(function() {
        alert("Subscription confirmed! You have earned 10 coins.");
        updateBalance(10);
    }, 5000);
}

function updateBalance(amount) {
    const balanceElement = document.getElementById('balance');
    let currentBalance = parseInt(balanceElement.innerText);
    balanceElement.innerText = currentBalance + amount;
}

function generateReferralLink() {
    const userId = new URLSearchParams(window.location.search).get('user_id');
    if (userId) {
        const referralLink = `https://t.me/FixiCoin_Bot?start=ref_${userId}`;
        document.getElementById('referral-link-display').value = referralLink;
    }
}

function copyReferralLink() {
    const referralLink = document.getElementById('referral-link-display');
    referralLink.select();
    referralLink.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert("Referral link copied to clipboard!");
}

function sendReferralLink() {
    const referralLink = document.getElementById('referral-link-display').value;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}`;
    window.open(telegramUrl, '_blank');
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', async (event) => {
    const userId = getUrlParameter('user_id');
    const username = getUrlParameter('username');
    const photoUrl = getUrlParameter('photo_url');

    if (username) {
        document.getElementById('user-name').textContent = username;
    }
    if (photoUrl) {
        document.getElementById('user-avatar').src = photoUrl;
    }

    generateReferralLink(userId);

    document.getElementById('main-link').addEventListener('click', function() {
        showPage('main-page');
    });
    document.getElementById('tasks-link').addEventListener('click', function() {
        showPage('tasks-page');
    });
    document.getElementById('referral-link').addEventListener('click', function() {
        showPage('referral-page');
    });

    showPage('main-page');
});
