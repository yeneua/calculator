import { useState } from 'react';
import { StandardPage } from './pages/StandardPage';
import { ScientificPage } from './pages/ScientificPage';
import { HistoryPage } from './pages/HistoryPage';
import { ConverterPage } from './pages/ConverterPage';

type Page = 'standard' | 'scientific' | 'history' | 'converter';

/**
 * Main Application Component
 * 
 * @remarks
 * Root component with simple navigation between pages.
 * TODO: Replace with proper React Router implementation
 */
function App() {
  const [currentPage, setCurrentPage] = useState<Page>('standard');

  const renderPage = () => {
    switch (currentPage) {
      case 'standard':
        return <StandardPage />;
      case 'scientific':
        return <ScientificPage />;
      case 'history':
        return <HistoryPage />;
      case 'converter':
        return <ConverterPage />;
      default:
        return <StandardPage />;
    }
  };

  return (
    <div className="relative">
      {renderPage()}

      {/* Simple Navigation (Temporary) */}
      <div className="
        fixed
        bottom-6
        left-1/2
        -translate-x-1/2
        bg-white dark:bg-gray-800
        rounded-full
        shadow-xl
        p-2
        flex
        gap-2
        border border-gray-200 dark:border-gray-700
      ">
        <button
          onClick={() => setCurrentPage('standard')}
          className={`
            px-4
            py-2
            rounded-full
            font-medium
            transition-all
            ${currentPage === 'standard'
              ? 'bg-gray-500 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
        >
          Standard
        </button>
        <button
          onClick={() => setCurrentPage('scientific')}
          className={`
            px-4
            py-2
            rounded-full
            font-medium
            transition-all
            ${currentPage === 'scientific'
              ? 'bg-gray-500 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
        >
          Scientific
        </button>
        <button
          onClick={() => setCurrentPage('history')}
          className={`
            px-4
            py-2
            rounded-full
            font-medium
            transition-all
            ${currentPage === 'history'
              ? 'bg-gray-500 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
        >
          History
        </button>
        <button
          onClick={() => setCurrentPage('converter')}
          className={`
            px-4
            py-2
            rounded-full
            font-medium
            transition-all
            ${currentPage === 'converter'
              ? 'bg-gray-500 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
        >
          Converter
        </button>
      </div>
    </div >
  );
}

export default App;
