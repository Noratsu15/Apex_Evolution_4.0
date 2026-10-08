import { useLanguage } from '@/context/LanguageContext';
import { getLlcStrings } from '@/i18n/llc';
import { LLC_TERMS_VERSION } from '@/data/llc';

/** The service letter that accompanies the payment. Reused in the checkout and in the portal. */
export default function LLCLetter() {
  const { lang } = useLanguage();
  const { letter } = getLlcStrings(lang);

  return (
    <article className="space-y-6 text-sm leading-relaxed text-slate-300">
      <header>
        <h3 className="text-lg font-bold text-white">{letter.title}</h3>
        <p className="mt-2 text-slate-400">{letter.intro}</p>
      </header>

      {letter.sections.map((section) => (
        <section key={section.heading}>
          <h4 className="font-semibold text-sky-300 mb-2">{section.heading}</h4>
          {section.paragraphs?.map((p) => (
            <p key={p} className="mb-2">
              {p}
            </p>
          ))}
          {section.items && (
            <ul className="space-y-1.5 list-disc pl-5 marker:text-sky-500">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <p className="text-xs text-slate-500">
        {letter.version}: {LLC_TERMS_VERSION}
      </p>
    </article>
  );
}
