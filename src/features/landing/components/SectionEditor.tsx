'use client';
import { Plus, Trash2 } from 'lucide-react';
import type { LandingSection } from '@/types/digital';
import type {
  HeroContent,
  AboutContent,
  ServicesContent,
  ServiceItem,
  TestimonialsContent,
  TestimonialItem,
  StatsContent,
  StatItem,
  ContactContent,
} from '../types';

interface Props {
  section: LandingSection;
  onChange: (updated: LandingSection) => void;
}

const inputClass =
  'w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';
const labelClass = 'block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1';
const selectClass = `${inputClass}`;

function updateField(
  section: LandingSection,
  onChange: (s: LandingSection) => void,
  field: string,
  value: unknown,
) {
  onChange({ ...section, content: { ...section.content, [field]: value } });
}

// ---- Hero ----
function HeroEditor({ section, onChange }: Props) {
  const c = section.content as unknown as HeroContent;
  const upd = (field: string, value: unknown) => updateField(section, onChange, field, value);
  return (
    <div className="space-y-3">
      <div>
        <label className={labelClass}>Título</label>
        <input className={inputClass} value={c.title} onChange={(e) => upd('title', e.target.value)} />
      </div>
      <div>
        <label className={labelClass}>Subtítulo</label>
        <input className={inputClass} value={c.subtitle} onChange={(e) => upd('subtitle', e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Texto del botón CTA</label>
          <input className={inputClass} value={c.ctaText} onChange={(e) => upd('ctaText', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>URL del botón CTA</label>
          <input className={inputClass} value={c.ctaUrl} placeholder="https://..." onChange={(e) => upd('ctaUrl', e.target.value)} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Alineación</label>
        <select className={selectClass} value={c.alignment} onChange={(e) => upd('alignment', e.target.value as HeroContent['alignment'])}>
          <option value="left">Izquierda</option>
          <option value="center">Centro</option>
          <option value="right">Derecha</option>
        </select>
      </div>
    </div>
  );
}

// ---- About ----
function AboutEditor({ section, onChange }: Props) {
  const c = section.content as unknown as AboutContent;
  const upd = (field: string, value: unknown) => updateField(section, onChange, field, value);
  return (
    <div className="space-y-3">
      <div>
        <label className={labelClass}>Título</label>
        <input className={inputClass} value={c.title} onChange={(e) => upd('title', e.target.value)} />
      </div>
      <div>
        <label className={labelClass}>Texto</label>
        <textarea className={inputClass} rows={4} value={c.text} onChange={(e) => upd('text', e.target.value)} />
      </div>
      <div>
        <label className={labelClass}>URL de imagen</label>
        <input className={inputClass} value={c.imageUrl} placeholder="https://..." onChange={(e) => upd('imageUrl', e.target.value)} />
      </div>
      <div>
        <label className={labelClass}>Disposición</label>
        <select className={selectClass} value={c.layout} onChange={(e) => upd('layout', e.target.value as AboutContent['layout'])}>
          <option value="image-left">Imagen a la izquierda</option>
          <option value="image-right">Imagen a la derecha</option>
        </select>
      </div>
    </div>
  );
}

// ---- Services ----
function ServicesEditor({ section, onChange }: Props) {
  const c = section.content as unknown as ServicesContent;
  const items = c.items ?? [];
  const updItems = (newItems: ServiceItem[]) =>
    onChange({ ...section, content: { ...c, items: newItems } });

  return (
    <div className="space-y-3">
      <div>
        <label className={labelClass}>Título de sección</label>
        <input className={inputClass} value={c.title} onChange={(e) => onChange({ ...section, content: { ...c, title: e.target.value } })} />
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Servicio {i + 1}</span>
              <button type="button" onClick={() => updItems(items.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
            <input className={inputClass} placeholder="Icono (ej: star)" value={item.icon} onChange={(e) => updItems(items.map((it, idx) => idx === i ? { ...it, icon: e.target.value } : it))} />
            <input className={inputClass} placeholder="Título" value={item.title} onChange={(e) => updItems(items.map((it, idx) => idx === i ? { ...it, title: e.target.value } : it))} />
            <input className={inputClass} placeholder="Descripción" value={item.description} onChange={(e) => updItems(items.map((it, idx) => idx === i ? { ...it, description: e.target.value } : it))} />
          </div>
        ))}
      </div>
      <button type="button" onClick={() => updItems([...items, { icon: 'star', title: '', description: '' }])} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium">
        <Plus size={14} /> Añadir servicio
      </button>
    </div>
  );
}

// ---- Testimonials ----
function TestimonialsEditor({ section, onChange }: Props) {
  const c = section.content as unknown as TestimonialsContent;
  const items = c.items ?? [];
  const updItems = (newItems: TestimonialItem[]) =>
    onChange({ ...section, content: { ...c, items: newItems } });

  return (
    <div className="space-y-3">
      <div>
        <label className={labelClass}>Título de sección</label>
        <input className={inputClass} value={c.title} onChange={(e) => onChange({ ...section, content: { ...c, title: e.target.value } })} />
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Testimonio {i + 1}</span>
              <button type="button" onClick={() => updItems(items.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input className={inputClass} placeholder="Nombre" value={item.name} onChange={(e) => updItems(items.map((it, idx) => idx === i ? { ...it, name: e.target.value } : it))} />
              <input className={inputClass} placeholder="Cargo" value={item.role} onChange={(e) => updItems(items.map((it, idx) => idx === i ? { ...it, role: e.target.value } : it))} />
            </div>
            <textarea className={inputClass} rows={2} placeholder="Opinión..." value={item.text} onChange={(e) => updItems(items.map((it, idx) => idx === i ? { ...it, text: e.target.value } : it))} />
            <div>
              <label className={labelClass}>Valoración</label>
              <select className={selectClass} value={item.rating} onChange={(e) => updItems(items.map((it, idx) => idx === i ? { ...it, rating: Number(e.target.value) } : it))}>
                {[1, 2, 3, 4, 5].map((r) => <option key={r} value={r}>{r} estrella{r > 1 ? 's' : ''}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => updItems([...items, { name: '', role: '', text: '', rating: 5 }])} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium">
        <Plus size={14} /> Añadir testimonio
      </button>
    </div>
  );
}

// ---- Stats ----
function StatsEditor({ section, onChange }: Props) {
  const c = section.content as unknown as StatsContent;
  const items = c.items ?? [];
  const updItems = (newItems: StatItem[]) =>
    onChange({ ...section, content: { ...c, items: newItems } });

  return (
    <div className="space-y-3">
      <div>
        <label className={labelClass}>Título de sección</label>
        <input className={inputClass} value={c.title} onChange={(e) => onChange({ ...section, content: { ...c, title: e.target.value } })} />
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Estadística {i + 1}</span>
              <button type="button" onClick={() => updItems(items.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input className={inputClass} placeholder="Icono" value={item.icon} onChange={(e) => updItems(items.map((it, idx) => idx === i ? { ...it, icon: e.target.value } : it))} />
              <input className={inputClass} placeholder="Valor (ej: 10+)" value={item.value} onChange={(e) => updItems(items.map((it, idx) => idx === i ? { ...it, value: e.target.value } : it))} />
              <input className={inputClass} placeholder="Etiqueta" value={item.label} onChange={(e) => updItems(items.map((it, idx) => idx === i ? { ...it, label: e.target.value } : it))} />
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => updItems([...items, { icon: 'briefcase', value: '', label: '' }])} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium">
        <Plus size={14} /> Añadir estadística
      </button>
    </div>
  );
}

// ---- Contact ----
function ContactEditor({ section, onChange }: Props) {
  const c = section.content as unknown as ContactContent;
  const upd = (field: string, value: unknown) => updateField(section, onChange, field, value);
  return (
    <div className="space-y-3">
      <div>
        <label className={labelClass}>Título</label>
        <input className={inputClass} value={c.title} onChange={(e) => upd('title', e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Email</label>
          <input className={inputClass} type="email" value={c.email} placeholder="tu@email.com" onChange={(e) => upd('email', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Teléfono</label>
          <input className={inputClass} value={c.phone} placeholder="+34 600 000 000" onChange={(e) => upd('phone', e.target.value)} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Dirección</label>
        <input className={inputClass} value={c.address} placeholder="Madrid, España" onChange={(e) => upd('address', e.target.value)} />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={c.showForm}
          onChange={(e) => upd('showForm', e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">Mostrar formulario de contacto</span>
      </label>
    </div>
  );
}

// ---- Main SectionEditor ----
export function SectionEditor({ section, onChange }: Props) {
  return (
    <div>
      {section.type === 'hero' && <HeroEditor section={section} onChange={onChange} />}
      {section.type === 'about' && <AboutEditor section={section} onChange={onChange} />}
      {section.type === 'services' && <ServicesEditor section={section} onChange={onChange} />}
      {section.type === 'testimonials' && <TestimonialsEditor section={section} onChange={onChange} />}
      {section.type === 'stats' && <StatsEditor section={section} onChange={onChange} />}
      {section.type === 'contact' && <ContactEditor section={section} onChange={onChange} />}
    </div>
  );
}
