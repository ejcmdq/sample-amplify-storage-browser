import { StorageBrowser } from './StorageBrowser';

import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-storage/styles.css';
import './portalunico.css';

export default function App() {
  // Texto da UI em PT-BR. Usamos "any" para evitar conflitos de tipagem
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

  return (
    <div className="pu-wrapper">
      <header className="pu-header">
        <h1>Acervo Histórico CIF / Renova</h1>
        <p>
          Consulte atas, decisões, notas técnicas e demais documentos históricos
          relacionados à reparação do Rio Doce.
        </p>
      </header>

      <StorageBrowser displayText={displayText} />
    </div>
  );
}
