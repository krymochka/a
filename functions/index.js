const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

// Укажите ваш токен Telegram бота
const TELEGRAM_BOT_TOKEN = '7496528374:AAFhXUiqgbwunKTHyOfZJMYiBOpEQ4fACjI';

// Функция для получения данных пользователя из Telegram
exports.getTelegramUserData = functions.https.onRequest(async (req, res) => {
    const userId = req.query.id;

    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    try {
        // Запрос к Telegram API для получения информации о пользователе
        const response = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChat?chat_id=${userId}`);
        const userData = response.data.result;

        // Получение фото профиля пользователя (если есть)
        const photosResponse = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUserProfilePhotos?user_id=${userId}&limit=1`);
        const photoData = photosResponse.data.result;

        // Формируем ответ с данными пользователя
        const userInfo = {
            id: userData.id,
            first_name: userData.first_name,
            last_name: userData.last_name || '',
            photo_url: photoData.photos.length > 0 ? `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${photoData.photos[0][0].file_id}` : ''
        };

        res.json(userInfo);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Error fetching user data');
    }
});
