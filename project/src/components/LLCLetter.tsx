import { useLanguage } from '@/context/LanguageContext';
import { getLlcStrings } from '@/i18n/llc';
import { LLC_TERMS_VERSION } from '@/data/llc';
import type { LlcService } from '@/types';

/** The service letter that accompanies the payment. Reused in the checkout and in the portal. */
export default function LLCLetter({ service = 'llc' }: { service?: LlcService }) {
  const { lang } = useLanguage();
  const strings = getLlcStrings(lang);
  const letter = service === 'bank' ? strings.bankLetter : strings.letter;

  return (
    <article className="space-y-6 text-sm leading-relaxed text-slate-300">
      <header>
        <h3 className="text-lg font-bold text-white">{letter.title}</h3>
        <p className="mt-2 text-slate-400">{letter.intro}</p>
      </header>

      {letter.sections.map((section) => (
        <section key={section.heading}>
          <h4 className="font-semibold text-amber-300 mb-2">{section.heading}</h4>
          {section.paragraphs?.map((p) => (
            <p key={p} className="mb-2">
              {p}
            </p>
          ))}
          {section.items && (
            <ul className="space-y-1.5 list-disc pl-5 marker:text-amber-500">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <p className="text-xs text-slate-500">
        {strings.letter.version}: {LLC_TERMS_VERSION}
      </p>
    </article>
  );
}
