import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

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

export default function ConsultantSection() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Привет! Я консультант по плоской кровле. Расскажите о вашем объекте или задайте вопрос — помогу подобрать оптимальное решение." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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

  return (
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
  );
}
