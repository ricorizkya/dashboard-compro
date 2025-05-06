import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { FiChevronUp, FiChevronDown, FiLoader } from 'react-icons/fi';

interface TableProps<T extends { id: string }> {
  headers: {
    key: string;
    label: string;
    sortable?: boolean;
    className?: string;
  }[];
  data: T[];
  renderRow: (
    item: T,
    meta: { isSelected: boolean; toggleSelection: () => void }
  ) => React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
  pagination?: {
    pageSize?: number;
    showControls?: boolean;
  };
  sortable?: boolean;
  selectable?: boolean;
  globalFilter?: boolean;
  loading?: boolean;
  onSort?: (sortKey: string, direction: 'asc' | 'desc') => void;
  onSelectionChange?: (selectedItems: T[]) => void;
  meta?: {
    page?: number;
    total?: number;
    totalPages?: number;
  };
}

const Table = <T extends { id: string }>({
  headers,
  data = [],
  renderRow,
  emptyState,
  className = '',
  pagination = { pageSize: 10, showControls: true },
  sortable = false,
  selectable = false,
  globalFilter = true,
  loading = false,
  onSort,
  onSelectionChange,
  meta,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const previousDataRef = useRef<T[]>([]);

  // Memoized calculations
  const pageSize = pagination?.pageSize || 10;

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortKey as keyof T];
      const bValue = b[sortKey as keyof T];
      const isString = typeof aValue === 'string' && typeof bValue === 'string';

      if (isString) {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === 'asc'
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    });
  }, [data, sortKey, sortDirection]);

  const filteredData = useMemo(() => {
    if (!globalFilterValue) return sortedData;

    return sortedData.filter((item) =>
      headers.some((header) => {
        const value = String(item[header.key as keyof T] || '');
        return value.toLowerCase().includes(globalFilterValue.toLowerCase());
      })
    );
  }, [sortedData, globalFilterValue, headers]);

  const totalPages = useMemo(
    () => meta?.totalPages || Math.ceil(filteredData.length / pageSize),
    [meta, filteredData, pageSize]
  );

  const paginatedData = useMemo(
    () =>
      filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredData, currentPage, pageSize]
  );

  const allSelected = useMemo(
    () =>
      selectable &&
      filteredData.length > 0 &&
      filteredData.every((item) => selectedRows.includes(item.id)),
    [selectable, filteredData, selectedRows]
  );

  // Handlers
  const toggleRowSelection = useCallback((id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const toggleAllSelection = useCallback(() => {
    setSelectedRows((prev) =>
      allSelected
        ? prev.filter((id) => !filteredData.some((item) => item.id === id))
        : [...prev, ...filteredData.map((item) => item.id)]
    );
  }, [allSelected, filteredData]);

  const handleSort = useCallback(
    (key: string) => {
      if (!sortable) return;

      const newDirection =
        sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';

      setSortKey(key);
      setSortDirection(newDirection);
      onSort?.(key, newDirection);
    },
    [sortable, sortKey, sortDirection, onSort]
  );

  // Sync selection changes
  useEffect(() => {
    if (onSelectionChange) {
      const selectedItems = filteredData.filter((item) =>
        selectedRows.includes(item.id)
      );
      onSelectionChange(selectedItems);
    }
  }, [selectedRows, filteredData, onSelectionChange]);

  // Reset page when data changes
  useEffect(() => {
    if (
      JSON.stringify(previousDataRef.current) !== JSON.stringify(filteredData)
    ) {
      setCurrentPage(1);
      previousDataRef.current = [...filteredData];
    }
  }, [filteredData]);

  return (
    <div className={`overflow-x-auto rounded-lg border ${className}`}>
      {globalFilter && (
        <div className='p-4 border-b'>
          <input
            type='text'
            placeholder='Cari semua kolom...'
            value={globalFilterValue}
            onChange={(e) => setGlobalFilterValue(e.target.value)}
            className='w-full max-w-xs px-3 py-2 border rounded-md text-sm'
          />
        </div>
      )}

      {loading && (
        <div className='absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center'>
          <FiLoader className='animate-spin text-2xl text-primary' />
        </div>
      )}

      <table className='w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            {selectable && (
              <th className='w-12 px-4 py-3'>
                <input
                  type='checkbox'
                  checked={allSelected}
                  onChange={toggleAllSelection}
                  className='form-checkbox h-4 w-4 text-primary'
                />
              </th>
            )}

            {headers.map((header) => (
              <th
                key={header.key}
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  header.className || 'text-gray-500'
                }`}
              >
                <div className='flex items-center gap-2'>
                  {header.label}
                  {sortable && header.sortable && (
                    <button
                      onClick={() => handleSort(header.key)}
                      className='flex flex-col'
                    >
                      <FiChevronUp
                        className={`w-3 h-3 ${
                          sortKey === header.key && sortDirection === 'asc'
                            ? 'text-primary'
                            : 'text-gray-300'
                        }`}
                      />
                      <FiChevronDown
                        className={`w-3 h-3 -mt-1 ${
                          sortKey === header.key && sortDirection === 'desc'
                            ? 'text-primary'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className='divide-y divide-gray-200 bg-white'>
          {paginatedData.map((item) =>
            renderRow(item, {
              isSelected: selectedRows.includes(item.id),
              toggleSelection: () => toggleRowSelection(item.id),
            })
          )}

          {filteredData.length === 0 && !loading && (
            <tr>
              <td
                colSpan={headers.length + (selectable ? 1 : 0)}
                className='px-6 py-4 text-center'
              >
                {emptyState || 'Tidak ada data'}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {pagination?.showControls && (
        <div className='flex items-center justify-between px-4 py-3 border-t'>
          <div className='flex items-center gap-4'>
            <span className='text-sm'>
              Menampilkan{' '}
              {Math.min((currentPage - 1) * pageSize + 1, filteredData.length)}{' '}
              - {Math.min(currentPage * pageSize, filteredData.length)} dari{' '}
              {filteredData.length}
            </span>
          </div>

          <div className='flex gap-2'>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || loading}
              className='px-3 py-1 border rounded text-sm disabled:opacity-50'
            >
              Sebelumnya
            </button>

            <span className='px-3 py-1 text-sm'>
              Halaman {currentPage} dari {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || loading}
              className='px-3 py-1 border rounded text-sm disabled:opacity-50'
            >
              Berikutnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
