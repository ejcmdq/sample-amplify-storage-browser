import { useEffect } from 'react';
import { StorageBrowser } from './StorageBrowser';

import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-storage/styles.css';
import './portalunico.css';

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

  // Auto-navega para o único "location" (public/historical-data/)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Tabela da primeira tela ("Locais de armazenamento")
      const table = document.querySelector(
        '.amplify-storage-browser__data-table'
      );
      if (!table) return;

      // Primeiro link na tabela (public/historical-data/)
      const firstLink = table.querySelector('tbody tr:first-child a');
      if (firstLink instanceof HTMLAnchorElement) {
        firstLink.click();
      }
    }, 400); // pequeno delay para garantir que o DOM da tabela já foi renderizado

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
      </header>

      <StorageBrowser displayText={displayText} />
    </div>
  );
}
