import asyncio
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CommandHandler, ContextTypes
from urllib.parse import quote

# Функция для получения аватара пользователя
async def get_user_profile_photo(context: ContextTypes.DEFAULT_TYPE, user_id: int) -> str:
    photos = await context.bot.get_user_profile_photos(user_id)
    if photos.total_count > 0:
        file_id = photos.photos[0][0].file_id
        file = await context.bot.get_file(file_id)
        return file.file_path
    return None

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.message.from_user
    profile_photo_url = await get_user_profile_photo(context, user.id)
    
    # Кодируем параметры URL
    encoded_username = quote(user.username or "")
    encoded_photo_url = quote(profile_photo_url or "")
    
    # Получаем параметр start, если он есть
    start_parameter = context.args[0] if context.args else ""
    
    web_app_url = f"https://krymochka.github.io/a/?user_id={user.id}&username={encoded_username}&photo_url={encoded_photo_url}&start={start_parameter}"
    
    keyboard = [
        [InlineKeyboardButton("Open Game", web_app={"url": web_app_url})]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
    '''Welcome, Adventurer! 🎮
    
Your journey begins now! Get ready to explore unknown worlds, conquer epic challenges, and collect awesome rewards. 💎

Every decision you make will shape your destiny. Are you ready to become a legend? 🌟

Let's dive in and see what fate has in store for you! 🚀''', 
    reply_markup=reply_markup
)

async def main():
    application = Application.builder().token("7496528374:AAFhXUiqgbwunKTHyOfZJMYiBOpEQ4fACjI").build()
    application.add_handler(CommandHandler("start", start))
    await application.initialize()
    await application.start()
    print("Bot is running. Press Ctrl+C to stop.")
    await application.updater.start_polling()
    await asyncio.Event().wait()

if __name__ == '__main__':
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        print("Bot stopped.")
