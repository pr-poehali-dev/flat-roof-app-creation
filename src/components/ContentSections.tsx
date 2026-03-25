import { useState } from "react";
import Icon from "@/components/ui/icon";

const SEND_LEAD_URL = "https://functions.poehali.dev/38fd7b7f-5d2f-45b0-befd-a517c1063eb6";

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
  { title: "ТЦ «Северный»", area: "4 200 м²", material: "ПВХ-мембрана", year: "2024", img: "https://cdn.poehali.dev/projects/5f246663-0b68-408a-ae37-ab1062b472e9/files/31a0114f-4716-4c96-bd38-d1849b4ff065.jpg" },
  { title: "Логистический центр", area: "12 500 м²", material: "ТПО-мембрана", year: "2024", img: "https://cdn.poehali.dev/projects/5f246663-0b68-408a-ae37-ab1062b472e9/files/610c03e2-70fc-4d3e-821a-7674fc8a2484.jpg" },
  { title: "ЖК «Парк Авеню»", area: "890 м²", material: "Инверсионная", year: "2023", img: "https://cdn.poehali.dev/projects/5f246663-0b68-408a-ae37-ab1062b472e9/files/3fb1bf0b-ce3e-4213-9cbd-f182721c9b4f.jpg" },
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

function ContactsSection() {
  const [form, setForm] = useState({ name: "", phone: "", area: "", object_type: "Жилой дом", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (field: string, val: string) => setForm((p) => ({ ...p, [field]: val }));

  const submit = async () => {
    if (!form.phone.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(SEND_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
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
          {status === "success" ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-amber-500" />
              </div>
              <h3 className="font-oswald text-2xl text-white mb-2">Заявка отправлена!</h3>
              <p className="text-[#7A8099]">Мы свяжемся с вами в течение 30 минут в рабочее время.</p>
              <button onClick={() => { setStatus("idle"); setForm({ name: "", phone: "", area: "", object_type: "Жилой дом", message: "" }); }} className="mt-6 text-amber-400 hover:text-amber-300 text-sm transition-colors">
                Отправить ещё одну заявку
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm text-[#7A8099] mb-2 block">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Александр"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="w-full bg-[#0D0F14] border border-[#1E2230] focus:border-amber-500/50 rounded-lg px-4 py-3 text-white placeholder-[#7A8099] text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#7A8099] mb-2 block">Телефон <span className="text-amber-500">*</span></label>
                  <input
                    type="tel"
                    placeholder="+7 (999) 000-00-00"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="w-full bg-[#0D0F14] border border-[#1E2230] focus:border-amber-500/50 rounded-lg px-4 py-3 text-white placeholder-[#7A8099] text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#7A8099] mb-2 block">Площадь кровли</label>
                  <input
                    type="text"
                    placeholder="например, 500 м²"
                    value={form.area}
                    onChange={(e) => set("area", e.target.value)}
                    className="w-full bg-[#0D0F14] border border-[#1E2230] focus:border-amber-500/50 rounded-lg px-4 py-3 text-white placeholder-[#7A8099] text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#7A8099] mb-2 block">Тип объекта</label>
                  <select
                    value={form.object_type}
                    onChange={(e) => set("object_type", e.target.value)}
                    className="w-full bg-[#0D0F14] border border-[#1E2230] focus:border-amber-500/50 rounded-lg px-4 py-3 text-[#7A8099] text-sm outline-none transition-colors"
                  >
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
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                className="w-full bg-[#0D0F14] border border-[#1E2230] focus:border-amber-500/50 rounded-lg px-4 py-3 text-white placeholder-[#7A8099] text-sm outline-none transition-colors resize-none mb-6"
              />
              {status === "error" && (
                <p className="text-red-400 text-sm mb-4">Ошибка отправки. Попробуйте ещё раз или позвоните нам.</p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button
                  onClick={submit}
                  disabled={status === "loading" || !form.phone.trim()}
                  className="btn-primary-roof w-full sm:w-auto px-10 py-4 rounded-lg text-base flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <><Icon name="Loader" size={18} className="animate-spin" />Отправляем...</>
                  ) : (
                    <><Icon name="Send" size={18} />Отправить заявку</>
                  )}
                </button>
                <p className="text-[#7A8099] text-xs text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">
          {[
            { icon: "Phone", label: "Телефон", val: "+7 (909) 418-81-61" },
            { icon: "Mail", label: "Email", val: "dmitrypechionkin161@mail.ru" },
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
  );
}

export default function ContentSections() {
  return (
    <>
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
            {PORTFOLIO_ITEMS.map((item) => (
              <div key={item.title} className="card-roof rounded-xl overflow-hidden group cursor-pointer">
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F14]/70 to-transparent" />
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

      <ContactsSection />

      {/* FOOTER */}
      <footer className="bg-[#0D0F14] border-t border-[#1E2230] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-500 rounded flex items-center justify-center">
              <Icon name="Home" size={14} className="text-[#0D0F14]" />
            </div>
            <span className="font-oswald font-bold text-lg tracking-wider text-white">
              ЮГ<span className="text-amber-500">ПРОФКРОВ</span>
            </span>
          </div>
          <p className="text-[#7A8099] text-sm">© 2024 Юг Профкров. Все права защищены.</p>
          <div className="flex gap-4 text-sm text-[#7A8099]">
            <button className="hover:text-amber-400 transition-colors">Политика</button>
            <button className="hover:text-amber-400 transition-colors">Договор</button>
          </div>
        </div>
      </footer>
    </>
  );
}