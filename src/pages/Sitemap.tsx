import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { Link as RouterLink } from 'react-router-dom';

const Sitemap = () => {
  const { t } = useLanguage();

  const mainPages = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.article', href: '/article' },
    { key: 'nav.projects', href: '/projects' },
    { key: 'nav.resources', href: '/resources' },
    { key: 'nav.contact', href: '/contact' },
    { key: 'nav.login', href: '/login' },
    { key: 'footer.privacy', href: '/privacy' },
     { key: 'footer.terms', href: '/terms' },
  ];

  const externalLinks = [
    { key: 'nav.site1', href: 'https://www.gcc-sg.org/' },
    { key: 'nav.site3', href: 'https://ica.coop' },
    { key: 'nav.site4', href: 'https://www.ilo.org/topics/cooperatives' },
    { key: 'nav.site5', href: 'https://social.desa.un.org/issues/cooperatives' },
  ];

  return (
    <div className="min-h-screen bg-gulf-white flex flex-col">
      <Header />

      <main className="pt-20 flex-1">
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gulf-dark mb-8 text-center">
              {t('sitemap.title') || 'Plan de site'}
            </h1>

            <div className="max-w-4xl mx-auto space-y-12">
              {/* Main Website Pages */}
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gulf-dark mb-6">
                  {t('sitemap.mainPages') || 'Pages principales du site'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mainPages.map((page, index) => (
                    <RouterLink
                      key={index}
                      to={page.href}
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gulf-light"
                    >
                      <h3 className="text-lg font-medium text-gulf-dark">
                        {t(page.key)}
                      </h3>
                      <p className="text-sm text-gulf-dark/60 mt-1">
                        {page.href}
                      </p>
                    </RouterLink>
                  ))}
                </div>
              </div>

              {/* External Resources */}
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gulf-dark mb-6">
                  {t('sitemap.externalResources') || 'Ressources externes'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {externalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gulf-light"
                    >
                      <h3 className="text-lg font-medium text-gulf-dark">
                        {t(link.key)}
                      </h3>
                      <p className="text-sm text-gulf-dark/60 mt-1 break-all">
                        {link.href}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-gulf-light/20 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gulf-dark mb-4">
                  {t('sitemap.additionalInfo') || 'Informations supplémentaires'}
                </h2>
                <p className="text-gulf-dark/80">
                  {t('sitemap.description') || 'Ce plan de site répertorie toutes les pages et ressources importantes disponibles sur notre plateforme. Utilisez-le pour naviguer facilement et découvrir tout le contenu disponible.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sitemap;
