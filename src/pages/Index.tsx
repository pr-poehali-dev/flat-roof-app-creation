import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/5f246663-0b68-408a-ae37-ab1062b472e9/files/8b323c46-9c31-43c6-a40a-1f447e2ec7c9.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Консультант", href: "#consultant" },
  { label: "О услуге", href: "#about" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const MATERIALS = [
  {
    icon: "Layers",
    title: "ПВХ-мембраны",
    tag: "Популярно",
    desc: "Одно из лучших решений для плоских кровель. Срок службы 25–30 лет. Устойчивы к UV, механическим нагрузкам и химии.",
    price: "от 1 200 ₽/м²",
    features: ["Сварка горячим воздухом", "Корневая защита", "Самозатухание"],
  },
  {
    icon: "Shield",
    title: "ТПО-мембраны",
    tag: "Эко-выбор",
    desc: "Термопластичная мембрана без пластификаторов. Экологична, перерабатывается, отличная адгезия с бетоном.",
    price: "от 980 ₽/м²",
    features: ["100% перерабатывается", "Отражает UV", "Быстрый монтаж"],
  },
  {
    icon: "Flame",
    title: "ЭПДМ-резина",
    tag: "Долговечно",
    desc: "Синтетический каучук. Лидер по гибкости и температурному диапазону −50°C до +120°C. Идеален для сложных форм.",
    price: "от 1 450 ₽/м²",
    features: ["До 50 лет службы", "Без швов до 15м", "Диапазон температур"],
  },
  {
    icon: "Droplets",
    title: "Жидкая кровля",
    tag: "Без швов",
    desc: "Наносимые полимерные составы для бесшовной гидроизоляции. Идеальны для сложных геометрий и ремонта.",
    price: "от 750 ₽/м²",
    features: ["Нет стыков", "Быстрый ремонт", "Любые формы"],
  },
  {
    icon: "Zap",
    title: "Битумная черепица",
    tag: "Классика",
    desc: "Модифицированный битум с полиэстеровым армированием. Проверенное решение с отличным соотношением цена/качество.",
    price: "от 620 ₽/м²",
    features: ["Простой монтаж", "Ремонтопригодность", "Морозостойкость"],
  },
  {
    icon: "Sun",
    title: "Инверсионная кровля",
    tag: "Премиум",
    desc: "Утеплитель поверх гидроизоляции — защита мембраны от температурных перепадов и механики. Под пешеходные нагрузки.",
    price: "от 2 100 ₽/м²",
    features: ["Кровля-терраса", "Долгий срок", "Ходовая поверхность"],
  },
];

const PORTFOLIO_ITEMS = [
  { title: "ТЦ «Северный»", area: "4 200 м²", material: "ПВХ-мембрана", year: "2024" },
  { title: "Логистический центр", area: "12 500 м²", material: "ТПО-мембрана", year: "2024" },
  { title: "ЖК «Парк Авеню»", area: "890 м²", material: "Инверсионная", year: "2023" },
  { title: "Офисный комплекс", area: "3 100 м²", material: "ЭПДМ-резина", year: "2023" },
  { title: "Завод «МетаПром»", area: "18 000 м²", material: "ТПО-мембрана", year: "2022" },
  { title: "Спортивный центр", area: "2 300 м²", material: "Жидкая кровля", year: "2022" },
];

const REVIEWS = [
  {
    name: "Алексей Морозов",
    role: "Директор ТЦ «Северный»",
    text: "Онлайн-консультант помог нам в течение 20 минут выбрать оптимальную систему. Монтаж прошёл точно в срок. Рекомендую!",
    rating: 5,
  },
  {
    name: "Наталья Кузьмина",
    role: "Главный инженер ЖК",
    text: "Обратились с проблемой протечек в уже построенном доме. Команда предложила ремонтное решение без демонтажа — экономия колоссальная.",
    rating: 5,
  },
  {
    name: "Сергей Ильин",
    role: "Владелец логистического центра",
    text: "12 500 м² ТПО-мембраны смонтировали за 3 недели. Сначала не верил, что реально — но результат превзошёл ожидания.",
    rating: 5,
  },
];

const BOT_ANSWERS: Record<string, string> = {
  "пвх": "ПВХ-мембрана — отличный выбор! Срок службы 25–30 лет, сварные швы прочнее самого материала. Подходит для большинства объектов. Хотите узнать стоимость для вашего объекта?",
  "тпо": "ТПО-мембрана — экологичное решение без пластификаторов. Особенно хороша для больших промышленных объектов. Монтаж быстрее ПВХ на 15-20%.",
  "цена": "Стоимость зависит от площади, материала и сложности объекта. Ориентировочно: ПВХ от 1 200 ₽/м², ТПО от 980 ₽/м². Для точного расчёта нужна площадь кровли.",
  "стоимость": "Стоимость зависит от площади, материала и сложности объекта. Ориентировочно: ПВХ от 1 200 ₽/м², ТПО от 980 ₽/м². Для точного расчёта нужна площадь кровли.",
  "ремонт": "Ремонт плоской кровли без полного демонтажа — наш конёк. Жидкая полимерная мембрана наносится прямо поверх старого покрытия. Экономия до 40% от новой кровли.",
  "срок": "Сроки монтажа: до 500 м² — 3-5 дней, 500-2000 м² — 1-2 недели, свыше 2000 м² — по графику. Работаем без остановки производства на объекте.",
  "гарантия": "Даём гарантию 10 лет на материал и 5 лет на монтажные работы. Производители материалов дополнительно дают гарантию 15-25 лет.",
  "материал": "Для выбора материала нужно знать: тип объекта, площадь, климат и бюджет. Чаще всего рекомендуем ПВХ (универсал) или ТПО (эко). Расскажите про ваш объект!",
};

function getBotResponse(text: string): string {
  const lower = text.toLowerCase();
  for (const key of Object.keys(BOT_ANSWERS)) {
    if (lower.includes(key)) return BOT_ANSWERS[key];
  }
  return "Хороший вопрос! Для точной консультации свяжитесь с нашим специалистом: +7 (800) 555-35-35 или оставьте заявку внизу страницы. Или спросите про: ПВХ, ТПО, цена, ремонт, срок, гарантия.";
}

interface Message {
  from: "user" | "bot";
  text: string;
}

const QUICK_QUESTIONS = [
  "Какой материал выбрать?",
  "Сколько стоит?",
  "Есть ли гарантия?",
  "Сроки монтажа?",
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Привет! Я консультант по плоской кровле. Расскажите о вашем объекте или задайте вопрос — помогу подобрать оптимальное решение." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { from: "user", text: msg }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { from: "bot", text: getBotResponse(msg) }]);
    }, 1200);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] text-[#E8EAF0] font-golos">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0F14]/90 backdrop-blur-md border-b border-[#1E2230]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
              <Icon name="Home" size={16} className="text-[#0D0F14]" />
            </div>
            <span className="font-oswald font-bold text-xl tracking-wider text-white">
              РУФ<span className="text-amber-500">ПРО</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-amber-400 ${
                  activeSection === link.href.replace("#", "") ? "text-amber-400" : "text-[#7A8099]"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("#contacts")}
            className="hidden md:block btn-primary-roof px-5 py-2 rounded text-sm"
          >
            Получить расчёт
          </button>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#141720] border-t border-[#1E2230] px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left text-[#E8EAF0] hover:text-amber-400 py-2 border-b border-[#1E2230] last:border-0 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0F14]/60 via-transparent to-[#0D0F14]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-medium">Онлайн-консультант работает 24/7</span>
            </div>

            <h1 className="font-oswald text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in animate-delay-100">
              ПЛОСКАЯ КРОВЛЯ<br />
              <span className="text-amber-500">БЕЗ КОМПРОМИССОВ</span>
            </h1>

            <p className="text-[#7A8099] text-lg md:text-xl leading-relaxed mb-8 max-w-xl animate-fade-in animate-delay-200">
              Подбираем кровельные системы под любой объект. ИИ-консультант поможет выбрать материал, рассчитает стоимость и ответит на вопросы прямо сейчас.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-300">
              <button
                onClick={() => scrollTo("#consultant")}
                className="btn-primary-roof px-8 py-4 rounded-lg text-base flex items-center gap-2 justify-center"
              >
                <Icon name="MessageCircle" size={20} />
                Спросить консультанта
              </button>
              <button
                onClick={() => scrollTo("#portfolio")}
                className="bg-[#141720] border border-[#1E2230] hover:border-amber-500/40 text-white px-8 py-4 rounded-lg text-base transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <Icon name="Image" size={20} />
                Смотреть портфолио
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-in animate-delay-400">
            {[
              { val: "500+", label: "Объектов сдано" },
              { val: "15 лет", label: "На рынке" },
              { val: "100%", label: "Гарантия на работы" },
              { val: "24/7", label: "Поддержка клиентов" },
            ].map((stat) => (
              <div key={stat.label} className="card-roof rounded-xl p-5 text-center">
                <div className="font-oswald text-3xl font-bold text-amber-500 mb-1">{stat.val}</div>
                <div className="text-[#7A8099] text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTANT */}
      <section id="consultant" className="py-20 relative">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-3 block">Онлайн-консультант</span>
            <h2 className="section-title text-4xl md:text-5xl text-white mb-4">
              ЗАДАЙТЕ ВОПРОС — <span className="text-amber-500">ПОЛУЧИТЕ ОТВЕТ</span>
            </h2>
            <p className="text-[#7A8099] max-w-xl mx-auto">
              Наш ИИ-консультант знает всё о плоских кровлях. Спросите про материал, стоимость или технологию.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="card-roof rounded-2xl overflow-hidden glow-amber">
              <div className="bg-[#1E2230] px-6 py-4 flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                    <Icon name="Bot" size={20} className="text-[#0D0F14]" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1E2230]" />
                </div>
                <div>
                  <div className="font-semibold text-white">Кровельный консультант</div>
                  <div className="text-green-400 text-xs">● Онлайн</div>
                </div>
              </div>

              <div className="h-80 overflow-y-auto p-6 flex flex-col gap-4 bg-[#0D0F14]/50">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {msg.from === "bot" && (
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Bot" size={14} className="text-[#0D0F14]" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs px-4 py-3 rounded-xl text-sm leading-relaxed ${
                        msg.from === "bot"
                          ? "bg-[#141720] border border-[#1E2230] text-[#E8EAF0]"
                          : "bg-amber-500 text-[#0D0F14] font-medium"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Bot" size={14} className="text-[#0D0F14]" />
                    </div>
                    <div className="bg-[#141720] border border-[#1E2230] px-4 py-3 rounded-xl flex gap-1.5 items-center">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-amber-500 rounded-full"
                          style={{ animation: `typing 1.2s ease-in-out ${i * 0.2}s infinite` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="px-6 py-3 border-t border-[#1E2230] flex gap-2 flex-wrap bg-[#0D0F14]/30">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-[#141720] border-t border-[#1E2230] flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Напишите вопрос о кровле..."
                  className="flex-1 bg-[#0D0F14] border border-[#1E2230] rounded-lg px-4 py-3 text-sm text-white placeholder-[#7A8099] focus:outline-none focus:border-amber-500/50 transition-colors"
                />
                <button
                  onClick={() => sendMessage()}
                  className="btn-primary-roof w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <Icon name="Send" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 relative bg-[#080A0E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-3 block">О услуге</span>
              <h2 className="section-title text-4xl md:text-5xl text-white mb-6">
                ПОЧЕМУ ВЫБИРАЮТ <span className="text-amber-500">НАС</span>
              </h2>
              <p className="text-[#7A8099] leading-relaxed mb-8">
                Мы специализируемся исключительно на плоских кровлях уже 15 лет. За это время сдали более 500 объектов — от частных домов до промышленных комплексов площадью 20 000 м².
              </p>
              <div className="space-y-4">
                {[
                  "Бесплатный выезд инженера на объект",
                  "Расчёт стоимости за 24 часа",
                  "Работаем с объектами любой площади",
                  "Гарантия 10 лет на все виды работ",
                  "Сертифицированные подрядчики",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Icon name="CheckCircle" size={20} className="text-amber-500 flex-shrink-0" />
                    <span className="text-[#E8EAF0]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Zap", title: "Скорость", desc: "Монтаж 500 м² за 3 дня без остановки производства" },
                { icon: "Shield", title: "Надёжность", desc: "Только сертифицированные материалы от мировых брендов" },
                { icon: "Award", title: "Качество", desc: "Авторский надзор от инженера на каждом этапе" },
                { icon: "Headphones", title: "Поддержка", desc: "Выезд специалиста в течение 4 часов при гарантийном случае" },
              ].map((card) => (
                <div key={card.title} className="card-roof rounded-xl p-5">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon name={card.icon} size={20} className="text-amber-500" fallback="Star" />
                  </div>
                  <h3 className="font-oswald text-white font-semibold mb-2">{card.title}</h3>
                  <p className="text-[#7A8099] text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20 relative">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-3 block">Каталог решений</span>
            <h2 className="section-title text-4xl md:text-5xl text-white mb-4">
              МАТЕРИАЛЫ И <span className="text-amber-500">СИСТЕМЫ</span>
            </h2>
            <p className="text-[#7A8099] max-w-xl mx-auto">
              Работаем со всеми современными кровельными системами. Подберём решение под бюджет, климат и нагрузки.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MATERIALS.map((mat) => (
              <div key={mat.title} className="card-roof rounded-xl p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                    <Icon name={mat.icon} size={24} className="text-amber-500" fallback="Layers" />
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {mat.tag}
                  </span>
                </div>

                <div>
                  <h3 className="font-oswald text-xl text-white font-semibold mb-2">{mat.title}</h3>
                  <p className="text-[#7A8099] text-sm leading-relaxed">{mat.desc}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {mat.features.map((f) => (
                    <span key={f} className="text-xs px-2 py-1 bg-[#0D0F14] border border-[#1E2230] rounded text-[#7A8099]">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#1E2230]">
                  <span className="font-oswald text-amber-500 font-semibold">{mat.price}</span>
                  <button className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
                    Подробнее <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 bg-[#080A0E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-3 block">Портфолио</span>
            <h2 className="section-title text-4xl md:text-5xl text-white mb-4">
              НАШИ <span className="text-amber-500">ОБЪЕКТЫ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <div key={item.title} className="card-roof rounded-xl overflow-hidden group cursor-pointer">
                <div
                  className="h-40 relative"
                  style={{
                    background: `linear-gradient(135deg, hsl(${(i * 40) % 360}, 20%, 12%), hsl(${(i * 40 + 30) % 360}, 15%, 8%))`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="Building2" size={48} className="text-amber-500/30 group-hover:text-amber-500/60 transition-all duration-300" fallback="Home" />
                  </div>
                  <div className="absolute top-3 right-3 bg-amber-500 text-[#0D0F14] text-xs font-bold px-2 py-1 rounded font-oswald">
                    {item.year}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-oswald text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-amber-400">{item.area}</span>
                    <span className="text-[#7A8099]">{item.material}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-3 block">Отзывы</span>
            <h2 className="section-title text-4xl md:text-5xl text-white mb-4">
              ЧТО ГОВОРЯТ <span className="text-amber-500">КЛИЕНТЫ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div key={rev.name} className="card-roof rounded-xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array(rev.rating).fill(0).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-amber-500" />
                  ))}
                </div>
                <p className="text-[#E8EAF0] leading-relaxed mb-6 text-sm">«{rev.text}»</p>
                <div className="flex items-center gap-3 border-t border-[#1E2230] pt-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center font-oswald text-amber-500 font-bold">
                    {rev.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{rev.name}</div>
                    <div className="text-[#7A8099] text-xs">{rev.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-[#080A0E] relative">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-3 block">Контакты</span>
            <h2 className="section-title text-4xl md:text-5xl text-white mb-4">
              ПОЛУЧИТЕ <span className="text-amber-500">РАСЧЁТ</span>
            </h2>
            <p className="text-[#7A8099]">Оставьте заявку — позвоним в течение 30 минут в рабочее время</p>
          </div>

          <div className="card-roof rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm text-[#7A8099] mb-2 block">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Александр"
                  className="w-full bg-[#0D0F14] border border-[#1E2230] focus:border-amber-500/50 rounded-lg px-4 py-3 text-white placeholder-[#7A8099] text-sm outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-[#7A8099] mb-2 block">Телефон</label>
                <input
                  type="tel"
                  placeholder="+7 (999) 000-00-00"
                  className="w-full bg-[#0D0F14] border border-[#1E2230] focus:border-amber-500/50 rounded-lg px-4 py-3 text-white placeholder-[#7A8099] text-sm outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-[#7A8099] mb-2 block">Площадь кровли</label>
                <input
                  type="text"
                  placeholder="например, 500 м²"
                  className="w-full bg-[#0D0F14] border border-[#1E2230] focus:border-amber-500/50 rounded-lg px-4 py-3 text-white placeholder-[#7A8099] text-sm outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-[#7A8099] mb-2 block">Тип объекта</label>
                <select className="w-full bg-[#0D0F14] border border-[#1E2230] focus:border-amber-500/50 rounded-lg px-4 py-3 text-[#7A8099] text-sm outline-none transition-colors">
                  <option>Жилой дом</option>
                  <option>Коммерческое здание</option>
                  <option>Промышленный объект</option>
                  <option>Другое</option>
                </select>
              </div>
            </div>
            <textarea
              rows={3}
              placeholder="Опишите задачу: новое строительство или ремонт, текущие проблемы, пожелания по материалам..."
              className="w-full bg-[#0D0F14] border border-[#1E2230] focus:border-amber-500/50 rounded-lg px-4 py-3 text-white placeholder-[#7A8099] text-sm outline-none transition-colors resize-none mb-6"
            />
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button className="btn-primary-roof w-full sm:w-auto px-10 py-4 rounded-lg text-base flex items-center gap-2 justify-center">
                <Icon name="Send" size={18} />
                Отправить заявку
              </button>
              <p className="text-[#7A8099] text-xs text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-8">
            {[
              { icon: "Phone", label: "Телефон", val: "+7 (800) 555-35-35" },
              { icon: "Mail", label: "Email", val: "info@rufpro.ru" },
              { icon: "Clock", label: "Режим работы", val: "Пн–Пт 8:00–20:00" },
            ].map((c) => (
              <div key={c.label} className="text-center">
                <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon name={c.icon} size={18} className="text-amber-500" fallback="Info" />
                </div>
                <div className="text-[#7A8099] text-xs mb-1">{c.label}</div>
                <div className="text-white text-sm font-medium">{c.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D0F14] border-t border-[#1E2230] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-500 rounded flex items-center justify-center">
              <Icon name="Home" size={14} className="text-[#0D0F14]" />
            </div>
            <span className="font-oswald font-bold text-lg tracking-wider text-white">
              РУФ<span className="text-amber-500">ПРО</span>
            </span>
          </div>
          <p className="text-[#7A8099] text-sm">© 2024 РуфПро. Все права защищены.</p>
          <div className="flex gap-4 text-sm text-[#7A8099]">
            <button className="hover:text-amber-400 transition-colors">Политика</button>
            <button className="hover:text-amber-400 transition-colors">Договор</button>
          </div>
        </div>
      </footer>
    </div>
  );
}