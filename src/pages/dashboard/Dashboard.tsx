import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Card from '../../components/card/Card';

const Dashboard = () => {
  return (
    <div>
      <Breadcrumb main='Dashboard' sub='Dashboard' />
      <div className='flex flex-col h-screen'>
        <h1 className='text-4xl font-bold'>Welcome to the Dashboard</h1>
        <p className='mt-4 text-lg'>
          This is your dashboard where you can manage your tasks and projects.
        </p>
        <div className='flex flex-row gap-8 w-screen mt-8'>
          <Card
            children={
              <div className='p-4'>
                <h2 className='text-2xl font-semibold'>Card Title</h2>
                <p className='mt-2 text-gray-600'>
                  This is a simple card component.
                </p>
              </div>
            }
          />
          <Card
            children={
              <div className='p-4'>
                <h2 className='text-2xl font-semibold'>Card Title</h2>
                <p className='mt-2 text-gray-600'>
                  This is a simple card component.
                </p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
