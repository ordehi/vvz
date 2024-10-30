'use client';

import ContactForm from '@/components/ContactForm';
import { contactFormConfig } from '@/config/components/contactForm.client';
import { FormDataType } from '@/types/types';

export default function Contact() {
  const handleSubmit = async (data: FormDataType) => {
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  };

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <ContactForm
          config={contactFormConfig}
          onSubmit={handleSubmit}
          className='bg-transparent shadow-none'
        />
      </main>
    </div>
  );
}
