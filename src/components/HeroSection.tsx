import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/5f246663-0b68-408a-ae37-ab1062b472e9/files/8b323c46-9c31-43c6-a40a-1f447e2ec7c9.jpg";

interface HeroSectionProps {
  scrollTo: (href: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
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
  );
}
