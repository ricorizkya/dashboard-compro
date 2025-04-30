import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp, FiLoader } from 'react-icons/fi';

interface TableProps<T extends { id: string }> {
  headers: {
    key: string;
    label: string;
    sortable?: boolean;
    // filterable?: boolean;
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
  onFilter?: (filterKey: string, value: string) => void;
  onSelectionChange?: (selectedItems: T[]) => void;
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
  // onFilter,
  onSelectionChange,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  // const [filters, setFilters] = useState<Record<string, string>>({});
  const [localData, setLocalData] = useState<T[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  // Pagination
  const pageSize = pagination?.pageSize || 10;
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Sorting
  useEffect(() => {
    if (sortKey) {
      const sorted = [...data].sort((a, b) => {
        const aValue = a[sortKey as keyof T];
        const bValue = b[sortKey as keyof T];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return sortDirection === 'asc'
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      });
      setLocalData(sorted);
    } else {
      setLocalData(data);
    }
  }, [sortKey, sortDirection, data]);

  // Filtering
  useEffect(() => {
    let filteredData = [...data];

    if (globalFilterValue) {
      filteredData = filteredData.filter((item) =>
        headers.some((header) => {
          const value = String(item[header.key as keyof T]);
          return value.toLowerCase().includes(globalFilterValue.toLowerCase());
        })
      );
    }

    setLocalData(filteredData);
  }, [globalFilterValue, data, headers]);

  // Selection
  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    if (selectedRows.length === localData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(localData.map((item) => item.id));
    }
  };

  useEffect(() => {
    if (onSelectionChange) {
      const selectedItems = data.filter((item) =>
        selectedRows.includes(item.id)
      );
      onSelectionChange(selectedItems);
    }
  }, [selectedRows, data, onSelectionChange]);

  // Handlers
  const handleSort = (key: string) => {
    if (!sortable) return;

    const newDirection =
      sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';

    setSortKey(key);
    setSortDirection(newDirection);
    onSort?.(key, newDirection);
  };

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
      {/* Loading State */}
      {loading && (
        <div className='absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center'>
          <FiLoader className='animate-spin text-2xl text-primary' />
        </div>
      )}

      {/* Table */}
      <table className='w-full divide-y divide-gray-200'>
        {/* Header */}
        <thead className='bg-gray-50'>
          <tr>
            {/* Selection Checkbox */}
            {selectable && (
              <th className='w-12 px-4 py-3'>
                <input
                  type='checkbox'
                  checked={
                    selectedRows.length === localData.length &&
                    localData.length > 0
                  }
                  onChange={toggleAllSelection}
                  className='form-checkbox h-4 w-4 text-primary'
                />
              </th>
            )}

            {/* Headers */}
            {headers.map((header) => (
              <th
                key={header.key}
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  header.className || 'text-gray-500'
                }`}
              >
                <div className='flex items-center gap-2'>
                  {header.label}

                  {/* Sorting Arrows */}
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

        {/* Body */}
        <tbody className='divide-y divide-gray-200 bg-white'>
          {localData.slice(startIndex, endIndex).map((item) =>
            renderRow(item, {
              isSelected: selectedRows.includes(item.id),
              toggleSelection: () => toggleRowSelection(item.id),
            })
          )}

          {/* Empty State */}
          {localData.length === 0 && !loading && (
            <tr>
              <td
                colSpan={headers.length + (selectable ? 1 : 0)}
                className='px-6 py-4 text-center'
              >
                {emptyState || 'No data available'}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {pagination?.showControls && (
        <div className='flex items-center justify-between px-4 py-3 border-t'>
          <div className='flex items-center gap-4'>
            <span className='text-sm'>
              Showing {startIndex + 1} - {Math.min(endIndex, localData.length)}{' '}
              of {localData.length}
            </span>

            <select
              value={pageSize}
              onChange={() => setCurrentPage(1)}
              className='border rounded px-2 py-1 text-sm'
              disabled={loading}
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>

          <div className='flex gap-2'>
            <button
              onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || loading}
              className='px-3 py-1 border rounded text-sm disabled:opacity-50'
            >
              Previous
            </button>

            <span className='px-3 py-1 text-sm'>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p: number) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages || loading}
              className='px-3 py-1 border rounded text-sm disabled:opacity-50'
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
