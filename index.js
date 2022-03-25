const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions, startKeyboard} = require('./options')
const token = '5221546757:AAGHLpdUd0QQEXphyR_txS4Z56Qyx3qBGZw'
const bot = new TelegramApi(token, {polling: true})
// exports.handler = async (event) => {
//     const body = JSON.parse(event.body);
//     const { chat, text } = body.message;
//
//     return{
//         statusCode: 200,
//     };
// };

const chats = {}

const startGame = async (chatId) =>{
    await bot.sendMessage(chatId, `Сейчас загадаю тебе цифру, а ты угадай`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions)}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'}
    ])
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        switch (text) {
            case '/start':
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp');
                return bot.sendMessage(chatId, `Хотел написать го кофан, но напишу здарова`, startKeyboard)
                break;
            case '/info':
                return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`, startKeyboard);
                break;
            case ('/game') :
                return startGame(chatId);
                break;
            case ('Закрыть'):
                return bot.sendMessage(chatId, 'Закрываю клавиатуру', {
                    reply_markup: {
                        remove_keyboard: true}});
                break;
            default:
                return bot.sendMessage(chatId, 'Я тебя нек понимаю, мб ты делаешь что-то неправильно', startKeyboard);

        }
    })

    bot.on('callback_query', async msg =>{
        const data = msg.data;
        const chatId = msg.message.chat.id
        if (data === '/again'){
            return  startGame(chatId)
        }
        if (data == (chats[chatId])) {
            return await bot.sendMessage(chatId, `Поздравляю ты отгадал цифру ${chats[chatId]}`, againOptions)}
        else {
            return await bot.sendMessage(chatId, `Ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)}
    })
}
start()
