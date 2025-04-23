import React, { useState, useEffect } from "react";

const initialFields = [
  { label: "Objectif", placeholder: "Quel est l’objectif du prompt ?", required: true, help: "But principal du prompt.\nExemple : Générer une introduction d’article sur l’IA." },
  { label: "Contexte", placeholder: "Quel est le contexte utile à fournir ?", required: true, help: "Informations utiles pour bien comprendre la demande.\nExemple : Le public visé est non technique." },
  { label: "Instruction", placeholder: "Quelle instruction précise doit être suivie ?", required: true, help: "Action attendue de l’IA.\nExemple : Rédige un texte de 5 phrases maximum." },
  { label: "Ton/style", placeholder: "Quel ton ou style est attendu ?", required: false, help: "Ambiance, registre, ou style souhaité.\nExemple : Ton pédagogique, style humoristique." },
  { label: "Contraintes ou format", placeholder: "Y a-t-il des contraintes ou un format spécifique ?", required: false, help: "Limites, formats, ou règles à respecter.\nExemple : Réponse en bullet points, max 100 mots." },
  { label: "Exemples (facultatif)", placeholder: "Faut-il inclure un ou plusieurs exemples ?", required: false, help: "Exemples à donner à l’IA pour clarifier l’attendu.\nExemple :\n- Entrée : ChatGPT\n- Sortie attendue : Assistant conversationnel IA" },
];

const gptGuide = [
  "Raisonne étape par étape avant de répondre.",
  "Si plusieurs tâches sont présentes, traite-les dans l’ordre logique.",
  "Ne réponds que si tu es certain d’avoir toutes les informations nécessaires.",
  "Si une information manque, pose une question de clarification AVANT de répondre.",
  "Structure ta réponse de façon claire : titres, listes, paragraphes courts.",
  "Ne fais pas de suppositions : demande plus de détails si nécessaire.",
  "Reste concis, clair, rigoureux et factuel.",
  "Indique explicitement si une partie de la demande ne peut pas être traitée.",
  "Ne termine qu’une fois la tâche complètement résolue."
];

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

export default function Home() {
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
    `\n\n---\n\n**Directives pour l’IA (à appliquer systématiquement) :**\n` +
    gptGuide.map(line => `- ${line}`).join("\n");

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
  };

  // Bootstrap tooltip activation
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let bs: any;
    if (typeof window !== 'undefined') {
      (async () => {
        // @ts-expect-error: window.bootstrap is not typed, but required for Bootstrap tooltips
        bs = window.bootstrap || (window.bootstrap = (await import('bootstrap/dist/js/bootstrap.bundle.min.js')).default);
        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
          // @ts-expect-error: window.bootstrap is not typed, but required for Bootstrap tooltips
          new window.bootstrap.Tooltip(tooltipTriggerEl, { trigger: 'focus click hover' });
        });
      })();
    }
    return () => {
      // Optionally dispose tooltips if needed
      if (bs && bs.Tooltip) {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
          // @ts-expect-error: _tooltip is not typed, but required for Bootstrap tooltips
          if (el._tooltip) el._tooltip.dispose();
        });
      }
    };
  }, [fields.length]);

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
                }}>Prompt Assistant</span>
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
                        <i className="bi bi-save"></i> Sauvegarder
                      </button>
                      <button type="button" className="btn btn-danger flex-grow-1 d-flex align-items-center justify-content-center gap-2 fs-5 py-2" onClick={handleReset}>
                        <i className="bi bi-x-circle"></i> Réinitialiser
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer bg-white bg-opacity-75 border-0 text-center text-muted small py-3 rounded-bottom-5">
                Fait par <b>Hypijump</b>
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
                }}>Prompt structuré</span>
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
                      <i className="bi bi-clipboard"></i> Copier le prompt
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
