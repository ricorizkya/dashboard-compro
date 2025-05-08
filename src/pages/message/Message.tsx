import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageData } from '../../types/Messages';
import { fetchMessages } from '../../services/messages';
import axios from 'axios';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Table from '../../components/table/Table';
import { MdEdit } from 'react-icons/md';
import { backendToFrontendDate } from '../../utils/utils';

const Message = () => {
  const navigate = useNavigate();
  const [messageData, setMessageData] = useState<MessageData[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedMessage, setSelectedMessage] = useState<MessageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchMessages();
        if (isMounted) {
          setMessageData(
            response.data.map((item: MessageData) => ({
              ...item,
              id: String(item.id),
            }))
          );
        }
      } catch (error) {
        if (isMounted) {
          setError(
            axios.isAxiosError(error)
              ? 'Terjadi kesalahan saat memuat data'
              : 'Terjadi kesalahan jaringan'
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectionChange = useCallback((selectedItems: MessageData[]) => {
    setSelectedMessage(selectedItems);
  }, []);

  const productHeaders = useMemo(
    () => [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'company', label: 'Company', sortable: true },
      { key: 'phone', label: 'Phone', sortable: true },
      { key: 'date', label: 'Schedule Date', sortable: true },
      { key: 'product', label: 'Service/Product', sortable: true },
      { key: 'description', label: 'Description', sortable: true },
      { key: 'action', label: 'Action', sortable: true },
    ],
    []
  );

  const tableData = useMemo(() => {
    if (messageData === null) return [];
    return messageData.map((item) => ({
      ...item,
      id: String(item.id),
    }));
  }, [messageData]);

  return (
    <div className='p-4'>
      <Breadcrumb main='Dashboard' sub='Messages' />

      <div className='flex flex-row justify-between items-center mb-4'>
        <span className='text-4xl text-black font-medium'>Data Messages</span>
      </div>

      {error && <p className='text-red-500'>{error}</p>}

      <Table
        selectable={true}
        headers={productHeaders}
        data={tableData}
        renderRow={(item, { isSelected, toggleSelection }) => (
          <tr key={item.id} className={isSelected ? 'bg-blue-50' : ''}>
            <td className='px-4 py-2'>
              <input
                type='checkbox'
                checked={isSelected}
                onChange={toggleSelection}
                className='form-checkbox h-4 w-4 text-primary'
              />
            </td>
            <td className='px-6 py-4 font-medium'>{item.name}</td>
            <td className='px-6 py-4 font-medium'>{item.company}</td>
            <td className='px-6 py-4 font-medium'>{item.phone}</td>
            <td className='px-6 py-4 font-medium'>
              {backendToFrontendDate(item.date_schedule)}
            </td>
            <td className='px-6 py-4 font-medium'>{item.product_name}</td>
            <td className='px-6 py-4 font-medium'>{item.description}</td>
            <td className='px-6 py-4'>
              <div className='flex gap-3 text-lg'>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/portfolio/reviews/edit/${item.id}`);
                  }}
                  className='text-blue-600 hover:text-blue-800'
                >
                  <MdEdit />
                </button>
              </div>
            </td>
          </tr>
        )}
        pagination={{
          pageSize: 10,
          showControls: true,
        }}
        sortable
        loading={isLoading}
        onSelectionChange={handleSelectionChange}
        emptyState={
          <div className='text-gray-500 py-4 text-center'>
            Tidak ada data portfolio reviews
          </div>
        }
        className='mt-4 shadow-sm'
      />
    </div>
  );
};

export default Message;
