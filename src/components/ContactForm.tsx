'use client';

import React, { useState, useEffect } from 'react';
import { ContactFormConfig } from '@/types/types';
import Button from './Button';

interface ContactFormProps {
  config: ContactFormConfig;
}

const ContactForm: React.FC<ContactFormProps> = ({ config }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    console.log(config);
  }, [config]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Perform client-side validation here if needed
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle successful form submission
      } else {
        // Handle form submission error
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div
      className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md'
      style={{ color: '#333' }} // Added inline style for text color
    >
      <h2 className='text-2xl font-bold mb-4'>{config.title}</h2>
      {config.description && (
        <p className='mb-6 text-gray-600'>{config.description}</p>
      )}
      <form onSubmit={handleSubmit}>
        {config.fields?.map((field) => (
          <div key={field.name} className='mb-4'>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                defaultValue=''
                className='w-full p-2 border rounded-md'
                onChange={handleChange}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                defaultValue=''
                className='w-full p-2 border rounded-md'
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        {config.submitButton && (
          <Button variant={config.submitButton.variant} type='submit'>
            {config.submitButton.text}
          </Button>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
