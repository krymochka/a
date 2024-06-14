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

    if (window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        const user = tg.initDataUnsafe.user;
        if (user) {
            document.getElementById('user-name').innerText = user.username || user.first_name;
            document.getElementById('user-avatar').src = user.photo_url || 'https://via.placeholder.com/150';
            generateReferralLink(user.id);
            fetchReferredFriends(user.id);
        }
    }
});

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function confirmSubscription() {
    if (confirm("Please confirm your subscription in the Telegram channel.")) {
        setTimeout(function() {
            alert("Subscription confirmed! You have earned 10 coins.");
            updateBalance(10);
        }, 5000);
    }
}

function updateBalance(amount) {
    const balanceElement = document.getElementById('balance');
    let currentBalance = parseInt(balanceElement.innerText);
    balanceElement.innerText = currentBalance + amount;
}

function generateReferralLink(userId) {
    const referralLink = `https://t.me/FixiCoin_Bot/app?startapp=ref_${userId}`;
    document.getElementById('referral-link-display').value = referralLink;
}

function fetchReferredFriends(userId) {
    const referralsList = document.getElementById('referrals-list');
    referralsList.innerHTML = ''; // Clear existing list

    // Example: Adding dummy referred friends
    const referredFriends = ['Alice', 'Bob', 'Charlie'];
    referredFriends.forEach(friend => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerText = friend;
        referralsList.appendChild(listItem);
    });
}

function copyReferralLink() {
    const referralLink = document.getElementById('referral-link-display');
    referralLink.select();
    referralLink.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    alert("Referral link copied to clipboard!");
}

function sendReferralLink() {
    const referralLink = document.getElementById('referral-link-display').value;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=Join%20this%20awesome%20game!`;
    window.open(telegramUrl, '_blank');
}
