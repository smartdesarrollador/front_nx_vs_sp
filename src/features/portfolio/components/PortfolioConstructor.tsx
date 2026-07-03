'use client';
import { Plus, Trash2, X } from 'lucide-react';
import type {
  PortfolioHeroContent,
  PortfolioContactContent,
  PortfolioAboutContent,
  PortfolioSkillsContent,
  PortfolioServicesContent,
  PortfolioServiceItem,
  PortfolioTestimonialsContent,
  PortfolioTestimonialItem,
} from '../types';

interface Props {
  heroContent: PortfolioHeroContent;
  onHeroContentChange: (content: PortfolioHeroContent) => void;
  aboutContent: PortfolioAboutContent;
  onAboutContentChange: (content: PortfolioAboutContent) => void;
  skillsContent: PortfolioSkillsContent;
  onSkillsContentChange: (content: PortfolioSkillsContent) => void;
  servicesContent: PortfolioServicesContent;
  onServicesContentChange: (content: PortfolioServicesContent) => void;
  testimonialsContent: PortfolioTestimonialsContent;
  onTestimonialsContentChange: (content: PortfolioTestimonialsContent) => void;
  contactContent: PortfolioContactContent;
  onContactContentChange: (content: PortfolioContactContent) => void;
  locale: string;
}

const textInputClass =
  'w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';

const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1';

function DigitalCardNote({ locale, activeWhen }: { locale: string; activeWhen: boolean }) {
  if (!activeWhen) return null;
  return (
    <p className="text-xs text-gray-400 dark:text-gray-500">
      Se usan los datos configurados en tu Tarjeta Digital (email, teléfono, ubicación, redes).{' '}
      <a href={`/${locale}/dashboard/tarjeta`} className="underline hover:text-blue-500">
        Editar Tarjeta Digital
      </a>
    </p>
  );
}

export function PortfolioConstructor({
  heroContent,
  onHeroContentChange,
  aboutContent,
  onAboutContentChange,
  skillsContent,
  onSkillsContentChange,
  servicesContent,
  onServicesContentChange,
  testimonialsContent,
  onTestimonialsContentChange,
  contactContent,
  onContactContentChange,
  locale,
}: Props) {
  const highlights = aboutContent.highlights ?? [];

  const addHighlight = () => {
    onAboutContentChange({ ...aboutContent, highlights: [...highlights, ''] });
  };
  const updateHighlight = (i: number, value: string) => {
    onAboutContentChange({ ...aboutContent, highlights: highlights.map((h, idx) => (idx === i ? value : h)) });
  };
  const removeHighlight = (i: number) => {
    onAboutContentChange({ ...aboutContent, highlights: highlights.filter((_, idx) => idx !== i) });
  };

  const serviceItems = servicesContent.items ?? [];
  const updServiceItems = (newItems: PortfolioServiceItem[]) =>
    onServicesContentChange({ ...servicesContent, items: newItems });

  const testimonialItems = testimonialsContent.items ?? [];
  const updTestimonialItems = (newItems: PortfolioTestimonialItem[]) =>
    onTestimonialsContentChange({ ...testimonialsContent, items: newItems });

  return (
    <div className="space-y-6">
      {/* Sección 1: Hero */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Hero</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Badge, botón de contacto y redes sociales que se muestran en la portada de tu portafolio.
          </p>
        </div>
        <div>
          <label className={labelClass}>Badge (texto pequeño encima del nombre)</label>
          <input
            className={textInputClass}
            value={heroContent.badge ?? ''}
            placeholder="Ej: Disponible para proyectos"
            onChange={(e) => onHeroContentChange({ ...heroContent, badge: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Texto del botón CTA</label>
            <input
              className={textInputClass}
              value={heroContent.ctaText ?? ''}
              placeholder="Ej: Contáctame"
              onChange={(e) => onHeroContentChange({ ...heroContent, ctaText: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>URL del botón CTA</label>
            <input
              className={textInputClass}
              value={heroContent.ctaUrl ?? ''}
              placeholder="mailto:tu@email.com o https://..."
              onChange={(e) => onHeroContentChange({ ...heroContent, ctaUrl: e.target.value })}
            />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={!!heroContent.showSocialLinks}
            onChange={(e) => onHeroContentChange({ ...heroContent, showSocialLinks: e.target.checked })}
            className="rounded border-gray-300 dark:border-gray-600"
          />
          Mostrar mis redes sociales en el Hero
        </label>
        <DigitalCardNote locale={locale} activeWhen={!!heroContent.showSocialLinks} />
      </div>

      {/* Separador */}
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Sección 2: Sobre mí */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Sobre mí</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Texto extendido y puntos destacados, se muestra después del Hero antes de tus proyectos.
          </p>
        </div>
        <div>
          <label className={labelClass}>Título de la sección</label>
          <input
            className={textInputClass}
            value={aboutContent.title ?? ''}
            placeholder="Ej: Sobre mí"
            onChange={(e) => onAboutContentChange({ ...aboutContent, title: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Texto</label>
          <textarea
            className={textInputClass}
            rows={4}
            value={aboutContent.text ?? ''}
            placeholder="Cuenta tu trayectoria, filosofía de trabajo o lo que te hace diferente..."
            onChange={(e) => onAboutContentChange({ ...aboutContent, text: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Puntos destacados</label>
          <div className="space-y-2">
            {highlights.map((h, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  className={textInputClass}
                  value={h}
                  placeholder="Ej: +10 años de experiencia"
                  onChange={(e) => updateHighlight(i, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(i)}
                  className="text-red-400 hover:text-red-600 flex-shrink-0"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addHighlight}
            className="mt-1.5 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            <Plus size={12} /> Añadir punto
          </button>
        </div>
      </div>

      {/* Separador */}
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Sección 3: Habilidades */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Habilidades</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Se muestran automáticamente las tecnologías de tus proyectos publicados.
          </p>
        </div>
        <div>
          <label className={labelClass}>Título de la sección</label>
          <input
            className={textInputClass}
            value={skillsContent.title ?? ''}
            placeholder="Ej: Habilidades"
            onChange={(e) => onSkillsContentChange({ ...skillsContent, title: e.target.value })}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={!!skillsContent.showSkills}
            onChange={(e) => onSkillsContentChange({ ...skillsContent, showSkills: e.target.checked })}
            className="rounded border-gray-300 dark:border-gray-600"
          />
          Mostrar mis habilidades
        </label>
      </div>

      {/* Separador */}
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Sección 4: Servicios */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Servicios</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Qué ofreces — se muestra antes de tus proyectos.
          </p>
        </div>
        <div>
          <label className={labelClass}>Título de la sección</label>
          <input
            className={textInputClass}
            value={servicesContent.title ?? ''}
            placeholder="Ej: Servicios"
            onChange={(e) => onServicesContentChange({ ...servicesContent, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          {serviceItems.map((item, i) => (
            <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Servicio {i + 1}</span>
                <button
                  type="button"
                  onClick={() => updServiceItems(serviceItems.filter((_, idx) => idx !== i))}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <input
                className={textInputClass}
                placeholder="Icono (ej: code)"
                value={item.icon ?? ''}
                onChange={(e) => updServiceItems(serviceItems.map((it, idx) => (idx === i ? { ...it, icon: e.target.value } : it)))}
              />
              <input
                className={textInputClass}
                placeholder="Título"
                value={item.title}
                onChange={(e) => updServiceItems(serviceItems.map((it, idx) => (idx === i ? { ...it, title: e.target.value } : it)))}
              />
              <input
                className={textInputClass}
                placeholder="Descripción"
                value={item.description}
                onChange={(e) => updServiceItems(serviceItems.map((it, idx) => (idx === i ? { ...it, description: e.target.value } : it)))}
              />
              <input
                className={textInputClass}
                placeholder="URL (opcional)"
                value={item.link ?? ''}
                onChange={(e) => updServiceItems(serviceItems.map((it, idx) => (idx === i ? { ...it, link: e.target.value } : it)))}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => updServiceItems([...serviceItems, { icon: 'star', title: '', description: '', link: '' }])}
          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          <Plus size={14} /> Añadir servicio
        </button>
      </div>

      {/* Separador */}
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Sección 5: Testimonios */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Testimonios</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Opiniones de clientes — se muestra después de tus proyectos.
          </p>
        </div>
        <div>
          <label className={labelClass}>Título de la sección</label>
          <input
            className={textInputClass}
            value={testimonialsContent.title ?? ''}
            placeholder="Ej: Lo que dicen mis clientes"
            onChange={(e) => onTestimonialsContentChange({ ...testimonialsContent, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          {testimonialItems.map((item, i) => (
            <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Testimonio {i + 1}</span>
                <button
                  type="button"
                  onClick={() => updTestimonialItems(testimonialItems.filter((_, idx) => idx !== i))}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  className={textInputClass}
                  placeholder="Nombre"
                  value={item.name}
                  onChange={(e) => updTestimonialItems(testimonialItems.map((it, idx) => (idx === i ? { ...it, name: e.target.value } : it)))}
                />
                <input
                  className={textInputClass}
                  placeholder="Cargo"
                  value={item.role ?? ''}
                  onChange={(e) => updTestimonialItems(testimonialItems.map((it, idx) => (idx === i ? { ...it, role: e.target.value } : it)))}
                />
              </div>
              <input
                className={textInputClass}
                placeholder="Empresa"
                value={item.company ?? ''}
                onChange={(e) => updTestimonialItems(testimonialItems.map((it, idx) => (idx === i ? { ...it, company: e.target.value } : it)))}
              />
              <input
                className={textInputClass}
                placeholder="URL de avatar (opcional)"
                value={item.avatarUrl ?? ''}
                onChange={(e) => updTestimonialItems(testimonialItems.map((it, idx) => (idx === i ? { ...it, avatarUrl: e.target.value } : it)))}
              />
              <textarea
                className={textInputClass}
                rows={2}
                placeholder="Opinión..."
                value={item.text}
                onChange={(e) => updTestimonialItems(testimonialItems.map((it, idx) => (idx === i ? { ...it, text: e.target.value } : it)))}
              />
              <div>
                <label className={labelClass}>Valoración</label>
                <select
                  className={textInputClass}
                  value={item.rating ?? 5}
                  onChange={(e) => updTestimonialItems(testimonialItems.map((it, idx) => (idx === i ? { ...it, rating: Number(e.target.value) } : it)))}
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r} estrella{r > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => updTestimonialItems([...testimonialItems, { name: '', role: '', company: '', text: '', rating: 5 }])}
          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          <Plus size={14} /> Añadir testimonio
        </button>
      </div>

      {/* Separador */}
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Sección 6: Contacto */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Contacto</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Sección final del portafolio con tus datos de contacto y redes sociales.
          </p>
        </div>
        <div>
          <label className={labelClass}>Título de la sección</label>
          <input
            className={textInputClass}
            value={contactContent.title ?? ''}
            placeholder="Ej: ¿Trabajamos juntos?"
            onChange={(e) => onContactContentChange({ ...contactContent, title: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Descripción</label>
          <input
            className={textInputClass}
            value={contactContent.description ?? ''}
            placeholder="Ej: Envíame un mensaje y conversemos sobre tu proyecto"
            onChange={(e) => onContactContentChange({ ...contactContent, description: e.target.value })}
          />
        </div>
        <DigitalCardNote locale={locale} activeWhen={!!(contactContent.title || contactContent.description)} />
      </div>
    </div>
  );
}
