declare global {
  interface Window {
    bootstrap: unknown;
  }
}

import React, { useState, useEffect, useMemo } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticPropsContext } from 'next';
import Link from 'next/link';

export default function Home() {
  const { t } = useTranslation('common');

  const initialFields = useMemo(() => [
    { label: t('objectif'), placeholder: t('objectif_placeholder'), required: true, help: t('objectif_help') },
    { label: t('contexte'), placeholder: t('contexte_placeholder'), required: true, help: t('contexte_help') },
    { label: t('instruction'), placeholder: t('instruction_placeholder'), required: true, help: t('instruction_help') },
    { label: t('ton_style'), placeholder: t('ton_style_placeholder'), required: false, help: t('ton_style_help') },
    { label: t('contraintes_format'), placeholder: t('contraintes_format_placeholder'), required: false, help: t('contraintes_format_help') },
    { label: t('exemples'), placeholder: t('exemples_placeholder'), required: false, help: t('exemples_help') },
  ], [t]);

  const [fields, setFields] = useState(initialFields.map(f => ({ ...f, value: "" })));

  // Charger les champs depuis les cookies au démarrage
  useEffect(() => {
    try {
      const saved = getCookie('prompt_fields');
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr) && arr.length === initialFields.length) {
          setFields(initialFields.map((f, i) => ({ ...f, value: arr[i] || "" })));
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Affiche la langue détectée dans la console
      console.log('Langue du navigateur détectée:', navigator.language, navigator.languages);
    }
  }, []);

  // Met à jour les labels/placeholders si la langue change
  useEffect(() => {
    setFields(fields => fields.map((f, i) => ({ ...initialFields[i], value: f.value })));
  }, [initialFields]);

  const handleChange = (idx: number, value: string) => {
    setFields(fields => fields.map((f, i) => i === idx ? { ...f, value } : f));
  };

  // Sauvegarder dans les cookies
  const handleSave = () => {
    setCookie('prompt_fields', JSON.stringify(fields.map(f => f.value)));
  };

  // Réinitialisation
  const handleReset = () => {
    setFields(initialFields.map(f => ({ ...f, value: "" })));
    setCookie('prompt_fields', JSON.stringify(initialFields.map(() => "")));
  };

  // Génération du prompt en direct avec le guide optimisé intégré à la fin
  const generatedPrompt =
    fields.filter(f => f.value.trim()).map(f => `### ${f.label}\n${f.value.trim()}\n\n`).join("") +
    `\n\n---\n\n**${t('directives')} :**\n` +
    [
      t('guide_1'),
      t('guide_2'),
      t('guide_3'),
      t('guide_4'),
      t('guide_5'),
      t('guide_6'),
      t('guide_7'),
      t('guide_8'),
      t('guide_9'),
    ].map(line => `- ${line}`).join("\n");

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
  };

  // Helpers for cookies
  function setCookie(name: string, value: string, days = 365) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }
  function getCookie(name: string) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  }

  // Bootstrap tooltip activation
  useEffect(() => {
    let tooltipInstances: any[] = [];
    if (typeof window !== 'undefined') {
      (async () => {
        window.bootstrap = window.bootstrap || (await import('bootstrap/dist/js/bootstrap.bundle.min.js')).default;
        // Détruire tous les tooltips existants
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
          // @ts-expect-error
          if (el._tooltip) el._tooltip.dispose();
        });
        // Ré-instancier les tooltips avec le texte à jour
        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
          if (window.bootstrap && typeof (window.bootstrap as any).Tooltip === 'function') {
            const instance = new (window.bootstrap as any).Tooltip(tooltipTriggerEl, { trigger: 'focus click hover' });
            tooltipInstances.push(instance);
          }
        });
      })();
    }
    return () => {
      tooltipInstances.forEach(instance => {
        if (instance && typeof instance.dispose === 'function') {
          instance.dispose();
        }
      });
    };
  }, [fields]);

  return (
    <main className="d-flex align-items-center justify-content-center min-vh-100 min-vw-100" style={{ overflow: 'hidden' }}>
      <style jsx global>{`
        @media (min-width: 992px) {
          .prompt-row-equal {
            display: flex !important;
            flex-direction: row !important;
            height: 80vh !important;
            min-height: 600px !important;
            align-items: stretch !important;
          }
          .prompt-col-equal {
            height: 100% !important;
            display: flex !important;
            align-items: stretch !important;
          }
          .prompt-card-equal {
            height: 100% !important;
            min-height: 520px !important;
            display: flex !important;
            flex-direction: column !important;
          }
        }
        @media (max-width: 991.98px) {
          .prompt-row-equal {
            display: block !important;
            height: auto !important;
            min-height: unset !important;
          }
          .prompt-col-equal {
            height: auto !important;
            display: block !important;
          }
          .prompt-card-equal {
            height: auto !important;
            min-height: unset !important;
            display: block !important;
          }
        }
      `}</style>
      <div className="container-fluid px-2 px-md-4 py-3 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh', maxWidth: 1600 }}>
        <div className="row g-5 flex-column flex-lg-row w-100 justify-content-center align-items-stretch align-items-lg-stretch prompt-row-equal" style={{ maxWidth: 1300 }}>
          {/* Formulaire à gauche */}
          <div className="col-12 col-lg-6 d-flex align-items-stretch prompt-col-equal" style={{ minWidth: 0, maxWidth: 600, margin: '0 auto' }}>
            <div className="card shadow-lg border-0 rounded-5 position-relative overflow-hidden flex-grow-1 w-100 d-flex flex-column prompt-card-equal" style={{background: 'rgba(255,255,255,0.65)',backdropFilter:'blur(18px)',WebkitBackdropFilter:'blur(18px)',border:'1.5px solid rgba(255,255,255,0.35)',boxShadow:'0 8px 32px 0 rgba(80,120,255,0.18), 0 1.5px 24px 0 rgba(100,80,255,0.13)',maxWidth:580,margin:'0 auto'}}>
              {/* Bandeau header dégradé avec icône et titre */}
              <div className="d-flex align-items-center gap-3 px-4 py-3 rounded-top-5" style={{
                background: 'linear-gradient(90deg, #6366f1 0%, #a21caf 100%)',
                color: 'white',
                fontWeight: 800,
                fontSize: '2.2rem',
                letterSpacing: 1.2,
                boxShadow: '0 1.5px 12px 0 rgba(100,80,255,0.10)',
                borderBottom: '2.5px solid #fff2',
                marginBottom: 12,
                fontFamily: 'Montserrat, Rubik, Quicksand, Poppins, Segoe UI, Arial, sans-serif',
              }}>
                <i className="bi bi-stars" style={{ fontSize: '2.6rem', color: '#ffe066', filter: 'drop-shadow(0 2px 4px #0002)' }}></i>
                <span style={{
                  background: 'linear-gradient(90deg, #fff 30%, #e0e7ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 900,
                  letterSpacing: 2,
                  textShadow: '0 2px 8px #0002',
                  fontFamily: 'Montserrat, Rubik, Quicksand, Poppins, Segoe UI, Arial, sans-serif',
                  fontSize: '2.2rem',
                  lineHeight: 1.1,
                  display: 'inline-block',
                }}>{t('welcome')}</span>
              </div>

              <div className="card-body p-4 pt-2 pb-2 overflow-auto flex-grow-1" style={{ paddingBottom: 80 }}>
                <form autoComplete="off" className="needs-validation" noValidate onSubmit={e => { e.preventDefault(); handleSave(); }}>
                  {fields.map((field, idx) => (
                    <div className="mb-3 position-relative" key={field.label}>
                      <label htmlFor={`field-${idx}`} className="form-label fw-semibold">
                        {field.label}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <textarea
                          className="form-control pe-5"
                          id={`field-${idx}`}
                          rows={3}
                          value={field.value}
                          onChange={e => handleChange(idx, e.target.value)}
                          placeholder={field.placeholder}
                          style={{ resize: 'vertical', minHeight: 48 }}
                        />
                        <span
                          tabIndex={0}
                          className="position-absolute end-0 top-50 translate-middle-y me-2 text-info-emphasis"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          data-bs-html="true"
                          title={field.help}
                          style={{ cursor: 'pointer', fontSize: '1.22rem', display: 'inline-flex', alignItems: 'center', zIndex: 2 }}
                        >
                          <i className="bi bi-info-circle"></i>
                        </span>
                      </div>
                    </div>
                  ))}
                  {/* Boutons sticky en bas du formulaire */}
                  <div className="position-sticky sticky-bottom bg-transparent pt-2" style={{ zIndex: 10, bottom: 0 }}>
                    <div className="d-flex gap-4 justify-content-between align-items-center bg-white bg-opacity-75 rounded-4 px-3 py-3 shadow-sm border mt-4">
                      <button type="submit" className="btn btn-success flex-grow-1 d-flex align-items-center justify-content-center gap-2 fs-5 py-2">
                        <i className="bi bi-save"></i> {t('save')}
                      </button>
                      <button type="button" className="btn btn-danger flex-grow-1 d-flex align-items-center justify-content-center gap-2 fs-5 py-2" onClick={handleReset}>
                        <i className="bi bi-x-circle"></i> {t('reset')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer bg-white bg-opacity-75 border-0 text-center text-muted small py-3 rounded-bottom-5 d-flex flex-column flex-md-row align-items-center justify-content-center gap-2">
                <span dangerouslySetInnerHTML={{ __html: t('made_by', { author: 'Hypijump' }) }} />
                <div className="d-inline-flex align-items-center gap-3 ms-2" style={{minWidth:'60px'}}>
                  <Link href="/fr" locale="fr" aria-label="Français">
                    <span style={{display:'inline-block',width:'1.6em',verticalAlign:'middle'}}>
                      <svg viewBox="0 0 60 40" width="24" height="16"><rect width="20" height="40" x="0" fill="#0055A4"/><rect width="20" height="40" x="20" fill="#FFF"/><rect width="20" height="40" x="40" fill="#EF4135"/></svg>
                    </span>
                  </Link>
                  <Link href="/en" locale="en" aria-label="English">
                    <span style={{display:'inline-block',width:'1.6em',verticalAlign:'middle'}}>
                      <svg viewBox="0 0 60 40" width="24" height="16"><rect width="60" height="40" fill="#012169"/><polygon points="0,0 60,40 60,0 0,40" fill="#FFF"/><polygon points="0,0 60,40 25,40 0,15" fill="#C8102E"/><polygon points="60,0 0,40 35,40 60,15" fill="#C8102E"/><rect x="25" width="10" height="40" fill="#FFF"/><rect y="15" width="60" height="10" fill="#FFF"/><rect x="27" width="6" height="40" fill="#C8102E"/><rect y="17" width="60" height="6" fill="#C8102E"/></svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Résultat à droite */}
          <div className="col-12 col-lg-6 d-flex align-items-stretch mt-4 mt-lg-0 prompt-col-equal" style={{ minWidth: 0, maxWidth: 600, margin: '0 auto' }}>
            <div className="card shadow-lg border-0 rounded-5 position-relative overflow-hidden flex-grow-1 w-100 d-flex flex-column prompt-card-equal" style={{background: 'rgba(255,255,255,0.85)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)',border:'1.5px solid rgba(255,255,255,0.35)',maxWidth:580,margin:'0 auto',display:'flex',flexDirection:'column'}}>
              {/* Bandeau header pour le résultat */}
              <div className="d-flex align-items-center gap-3 px-4 py-3 rounded-top-5" style={{
                background: 'linear-gradient(90deg, #6366f1 0%, #a21caf 100%)',
                color: 'white',
                fontWeight: 800,
                fontSize: '2.2rem',
                letterSpacing: 1.2,
                boxShadow: '0 1.5px 12px 0 rgba(100,80,255,0.10)',
                borderBottom: '2.5px solid #fff2',
                marginBottom: 12,
                fontFamily: 'Montserrat, Rubik, Quicksand, Poppins, Segoe UI, Arial, sans-serif',
              }}>
                <i className="bi bi-magic" style={{ fontSize: '2.3rem', color: '#f59e42', filter: 'drop-shadow(0 2px 4px #0001)' }}></i>
                <span style={{
                  background: 'linear-gradient(90deg, #fff 30%, #e0e7ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 900,
                  letterSpacing: 2,
                  textShadow: '0 2px 8px #0002',
                  fontFamily: 'Montserrat, Rubik, Quicksand, Poppins, Segoe UI, Arial, sans-serif',
                  fontSize: '2.2rem',
                  lineHeight: 1.1,
                  display: 'inline-block',
                }}>{t('description')}</span>
              </div>
              <div className="card-body p-4 p-md-5 overflow-auto flex-grow-1 d-flex flex-column" style={{ maxHeight: 1100, minHeight: 280 }}>
                <pre className="bg-white p-4 rounded border overflow-auto mb-4 flex-grow-1" style={{ fontSize: '0.75rem', minHeight: 200, maxHeight: '80vh' }}>
                  {generatedPrompt}
                </pre>
                {/* Sticky Copier le prompt en bas de la carte résultat */}
                <div className="position-sticky sticky-bottom bg-transparent pt-2" style={{ zIndex: 10, bottom: 0, marginTop: 32 }}>
                  <div className="d-flex justify-content-center align-items-center bg-white bg-opacity-75 rounded-4 px-3 py-3 shadow-sm border mt-4">
                    <button
                      className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2 fs-5 py-2"
                      style={{ minWidth: 0 }}
                      onClick={handleCopyPrompt}
                    >
                      <i className="bi bi-clipboard"></i> {t('copy_prompt')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  let locale = context.locale || context?.params?.locale || 'en';
  if (Array.isArray(locale)) locale = locale[0];
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
