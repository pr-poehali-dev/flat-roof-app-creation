import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Консультант", href: "#consultant" },
  { label: "О услуге", href: "#about" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

interface NavbarProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollTo: (href: string) => void;
}

export default function Navbar({ activeSection, mobileMenuOpen, setMobileMenuOpen, scrollTo }: NavbarProps) {
  return (
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
  );
}
