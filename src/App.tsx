import { useEffect } from 'react';
import { StorageBrowser } from './StorageBrowser';

import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-storage/styles.css';
import './portalunico.css';

const PUBLIC_SEGMENT = 'historical-data';

function clickPublicRoot(): boolean {
  const breadcrumbContainer = document.querySelector(
    '.amplify-storage-browser__breadcrumbs'
  );
  if (!breadcrumbContainer) return false;

  const links = Array.from(
    breadcrumbContainer.querySelectorAll('a')
  ) as HTMLAnchorElement[];

  // 1) tenta achar um link cujo texto contenha "historical-data"
  let target = links.find((link) =>
    link.textContent?.trim().includes(PUBLIC_SEGMENT)
  );

  // 2) fallback: se houver muitos segmentos, pega o 4º (Home, bucket, public, historical-data)
  if (!target && links.length >= 4) {
    target = links[3];
  }

  if (target) {
    target.click();
    return true;
  }
  return false;
}

export default function App() {
  // Texto da UI em PT-BR
  const displayText: any = {
    LocationsView: {
      title: 'Locais de armazenamento',
      searchPlaceholder: 'Filtrar pastas',
      getListFoldersResultsMessage: ({ totalFolders }: any) =>
        totalFolders === 0
          ? 'Nenhuma pasta encontrada'
          : `${totalFolders} pasta(s) encontrada(s)`,
    },
    LocationDetailView: {
      title: 'Documentos',
      searchPlaceholder: 'Buscar arquivos e pastas',
      searchSubmitLabel: 'Pesquisar',
      searchClearLabel: 'Limpar',
      searchSubfoldersToggleLabel: 'Incluir subpastas',
      tableColumnFolderHeader: 'Pasta',
      tableColumnNameHeader: 'Nome',
      tableColumnTypeHeader: 'Tipo',
      tableColumnSizeHeader: 'Tamanho',
      loadingIndicatorLabel: 'Carregando...',
      noItemsLabel: 'Nenhum arquivo ou pasta encontrado.',
    },
  };

  // Início → vai para a pasta public/historical-data/ sem recarregar
  const handleHome = () => {
    const ok = clickPublicRoot();
    if (!ok) {
      // fallback extremo: recarrega a página e o useEffect abrirá o primeiro location
      window.location.href = window.location.origin + window.location.pathname;
    }
  };

  // Voltar um nível usando o breadcrumb escondido
  const handleBack = () => {
    const breadcrumbContainer = document.querySelector(
      '.amplify-storage-browser__breadcrumbs'
    );
    if (!breadcrumbContainer) {
      handleHome();
      return;
    }

    const links = Array.from(
      breadcrumbContainer.querySelectorAll('a')
    ) as HTMLAnchorElement[];

    if (links.length >= 2) {
      const parentLink = links[links.length - 2];
      parentLink.click();
      return;
    }

    handleHome();
  };

  // Auto-navega para o único "location" (public/historical-data/) na primeira renderização
  useEffect(() => {
    const timer = setTimeout(() => {
      const table = document.querySelector(
        '.amplify-storage-browser__data-table'
      );
      if (!table) return;
      const firstLink = table.querySelector('tbody tr:first-child a');
      if (firstLink instanceof HTMLAnchorElement) {
        firstLink.click();
      }
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pu-wrapper">
      <header className="pu-header">
        <h1>Acervo Histórico IBAMA / CIF</h1>
        <p>
          Consulte atas, decisões, notas técnicas e demais documentos históricos
          relacionados à reparação do Rio Doce.
        </p>

        <div className="pu-actions">
          <button type="button" className="pu-button" onClick={handleHome}>
            Início
          </button>
          <button
            type="button"
            className="pu-button pu-button-secondary"
            onClick={handleBack}
          >
            Voltar
          </button>
        </div>
      </header>

      <StorageBrowser displayText={displayText} />
    </div>
  );
}
