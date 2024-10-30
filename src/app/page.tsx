import Button from '@/components/Button';
import { FiArrowRight, FiPhone, FiMail } from 'react-icons/fi';

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        {/* Hero Section */}
        <div className='flex flex-col items-center sm:items-start gap-6 max-w-2xl'>
          <h1 className='text-4xl sm:text-6xl font-bold text-center sm:text-left'>
            Transform Your Business with Smart Analytics
          </h1>
          <p className='text-lg text-gray-600 text-center sm:text-left'>
            Leverage our cutting-edge data analytics platform to make informed
            decisions and drive growth for your business.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
            <Button variant='primary' size='lg' icon={<FiArrowRight />}>
              Get Started
            </Button>
            <Button variant='outline' size='lg'>
              View Demo
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 w-full max-w-2xl'>
          <div className='p-6 border rounded-lg'>
            <h3 className='text-xl font-semibold mb-2'>Real-time Analytics</h3>
            <p className='text-gray-600 mb-4'>
              Monitor your business metrics in real-time with our advanced
              dashboard.
            </p>
            <Button variant='ghost' size='sm' icon={<FiArrowRight />}>
              Learn more
            </Button>
          </div>
          <div className='p-6 border rounded-lg'>
            <h3 className='text-xl font-semibold mb-2'>Predictive Insights</h3>
            <p className='text-gray-600 mb-4'>
              Make data-driven decisions with our AI-powered predictions.
            </p>
            <Button variant='ghost' size='sm' icon={<FiArrowRight />}>
              Learn more
            </Button>
          </div>
        </div>

        {/* Contact Section */}
        <div className='flex flex-col sm:flex-row gap-4 mt-8'>
          <Button
            variant='secondary'
            size='md'
            icon={<FiPhone />}
            href='/contact'
          >
            Schedule a Call
          </Button>
          <Button variant='secondary' size='md' icon={<FiMail />}>
            Contact Sales
          </Button>
        </div>
      </main>
    </div>
  );
}
