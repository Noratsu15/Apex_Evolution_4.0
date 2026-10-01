import { Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const avatars = [
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
];

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-sky-400 uppercase tracking-wider">{t.testimonials.label}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {t.testimonials.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.testimonials.items.map((testimonial, i) => (
            <div
              key={i}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all"
            >
              <Quote className="w-8 h-8 text-sky-400/30 mb-4" />
              <p className="text-slate-300 leading-relaxed mb-6">"{testimonial.content}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={avatars[i] ?? avatars[0]}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-sky-400/20"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-bold text-white">{testimonial.name}</div>
                  <div className="text-xs text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
