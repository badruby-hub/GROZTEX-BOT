const { PrismaClient } = require("@prisma/client");
const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config();
const token = process.env.BOT_TOKEN;
// const apiMosca = process.env.API_WELL_MOSCA;
const bot = new TelegramBot(token, { polling: true });

const prisma = new PrismaClient();

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.username;
  const firstName = msg.from.first_name;
  const lastName = msg.from.last_name;
  
  const text = msg.text;

  if (text === "/start") { //ОТВЕТ СТАРТ 
    await bot.sendMessage(
      chatId,`
Добро пожаловать в GROZTEX 📍 Малгобекская улица, 19, Грозный, Республика Чечня

📅 Мы работаем ежедневно с 10:00 до 00:00 по МСК

💵 Мы работаем только за наличные рубли

💹 Самый низкий курс на покупку USDT и лучший курс покупки USDT в Чечне

🤑 Отсутствие какой либо комиссии на покупку и продажу USDT

Для покупки USDT нажмите на кнопку "Обмен"

— Канал: <a href="https://t.me/groztex_news_groz">GROZTEX | Новости</a>
— По всем вопросам: <a href="https://t.me/GROZTEX">Поддержка</a>
— Наш сайт: <a href="https://groztex.ru">сайт визитка</a>`,{
                parse_mode: "HTML",
                disable_web_page_preview: false,
                reply_markup:{
                  keyboard: [
                    [{text:'🏦 О нас'},{text:'📊 Курсы'}],
                    [{text:'📲 Связаться с нами'},{text:'🔎 AML проверка кошелька'}],
                    [{text:'📊 Биржа'}],
                  ],
                  resize_keyboard:true,
                }
              }
    );
    await prisma.user.upsert({
        where: {chatId: BigInt(chatId)},
        update:{
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            isDeletedBot: false,
        },
        create:{
        chatId: BigInt(chatId),
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        isDeletedBot: false,
        }
    })
  }else if(text === "🏦 О нас") { //ОТВЕТ О НАС 
         await bot.sendMessage(
      chatId,`
🤖 О нас

Добро пожаловать в наш бот для обмена криптовалюты!

💰 Мы занимаемся обменом криптовалют более 3х лет.

📅 Мы работаем ежедневно с 10:00 до 00:00 по МСК.

💵 Мы работаем только за наличные рубли.

💹 У нас вы можете купить USDT без комиссии по самому лучшему курсу в Чечне.

Наш адрес:
Малгобекская улица, 19, Грозный, Республика Чечня

Для получения консультации и покупки USDT, вам нужно создать заявку через приложение.` 
    );
  }else if(text === "📊 Курсы"){ //ОТВЕТ КУРСЫ 
    try {
      // const response = await fetch(apiMosca);
      // const data = await response.json();
      // const apiBuy = parseFloat(data?.sell); 
      // const apiSell = parseFloat(data?.buy);
      const buy = 0;
      const sell = 0;


      await bot.sendMessage(
   chatId, `
Курс обмена рублей на USDT:

💵 Купить 1 USDT = ${buy ? `${buy} RUB`: "-"} RUB
💵 Продать 1 USDT = ${sell ? `${sell} RUB`: "-"} RUB

🚨 Данный курс является биржевым и меняется каждую минуту

Комиссии  за вывод USDT в сети Tron нет

Для получения консультации и покупки USDT, вам нужно создать заявку - нажмите на кнопку "Обмен"

С уважением,
  GROZTEX

— Канал: <a href="https://t.me/groztex_news_groz">GROZTEX | Новости</a>
— По всем вопросам: <a href="https://t.me/GROZTEX">Поддержка</a>
— Наш сайт: <a href="https://groztex.ru">сайт визитка</a>
   `,{
     parse_mode: "HTML",
     disable_web_page_preview: false,
   }
    )
    } catch (error) {
      console.log(`ошибка получения курса: ${error}`);
    }
    
  }else if (text === "📲 Связаться с нами"){
    await bot.sendMessage(
      chatId, `
Наши операторы на связи 24/7 и готовы ответить на любые ваши вопросы

Для связи с нами напишите  - <a href="https://t.me/GROZTEX">Поддержка</a>
Для свежих новостей: наш канал <a href="https://t.me/groztex_news_groz">GROZTEX | Новости</a>

Для получения консультации и покупки USDT, вам нужно создать заявку - нажмите на кнопку "Обмен"

С уважением,
  GROZTEX
      `,
      {
      parse_mode: "HTML",
      disable_web_page_preview: false,
      },

    )
  }else if(text === "📊 Биржа"){ //ОТВЕТ БИРЖА
    await bot.sendMessage(
    chatId, `
С радостью сообщаем Вам об создании своей биржи ! 🎉

⏳ В скором времени здесь будет ссылка на сайт нашей биржи 

Мы стремимся предоставить нашим клиентам лучший сервис и надежные инструменты для успешной торговли. 

Наша команда всегда на связи!

Присоединяйтесь — вместе строим будущее криптовалют! 🚀

С уважением,
  GROZTEX
    `
    )
  }else if (text === "🔎 AML проверка кошелька"){ //ОТВЕТ АМЛ 
 await bot.sendMessage(
    chatId,`
❌ Проверка кошелька пока недоступка

Для более подробной информацией обратитесь в поддержку— <a href="https://t.me/GROZTEX">Поддержка</a>

С уважением,
  GROZTEX
    `,
    {
      parse_mode: "HTML",
      disable_web_page_preview: true
    }
 )
  }else{
    await bot.sendMessage(
      chatId,`
Если у Вас остались дополнительные вопросы обратитесь 
в поддержку— <a href="https://t.me/GROZTEX">Поддержка</a>

С уважением,
  GROZTEX
      `,
      {
        parse_mode: "HTML",
        disable_web_page_preview: true
      }
    )
  }
});
