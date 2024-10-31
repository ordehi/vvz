'use client';

import React, { useState } from 'react';
import { Toast } from './Toast/Toast';
import { ContactFormProps, FormField, FormDataType } from '@/types/types';

const ContactForm: React.FC<ContactFormProps> = ({
  config,
  onSubmit,
  className = '',
}) => {
  const [formData, setFormData] = useState<FormDataType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (data: FormDataType): boolean => {
    const newErrors: Record<string, string> = {};

    config.fields.forEach((field) => {
      const value = data[field.name];

      if (field.required && !value) {
        newErrors[field.name] = 'This field is required';
      } else if (field.validation) {
        if (typeof value === 'string') {
          if (field.validation.min && value.length < field.validation.min) {
            newErrors[field.name] =
              field.validation.message ||
              `Minimum ${field.validation.min} characters required`;
          }
          if (field.validation.max && value.length > field.validation.max) {
            newErrors[field.name] =
              field.validation.message ||
              `Maximum ${field.validation.max} characters allowed`;
          }
          if (
            field.validation.pattern &&
            !new RegExp(field.validation.pattern).test(value)
          ) {
            newErrors[field.name] =
              field.validation.message || 'Invalid format';
          }
        }
      }

      if (
        field.type === 'email' &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))
      ) {
        newErrors[field.name] = 'Invalid email address';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      showToast('Please correct the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
        showToast('Message sent successfully!', 'success');
        setFormData({});
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showToast('Failed to send message. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldComponent = (field: FormField) => {
    const commonProps = {
      name: field.name,
      value:
        formData[field.name] instanceof Date
          ? (formData[field.name] as Date).toISOString().split('T')[0]
          : formData[field.name] || '',
      placeholder: field.placeholder,
      required: field.required,
      onChange: handleChange,
      disabled: isSubmitting,
      className: `w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
        ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}
        ${isSubmitting ? 'bg-gray-100' : 'bg-white'}`,
    };

    if (field.type === 'textarea') {
      return (
        <textarea {...commonProps} rows={4} value={String(commonProps.value)} />
      );
    }

    return (
      <input
        type={field.type}
        {...commonProps}
        value={String(commonProps.value)}
      />
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className='w-full bg-white rounded-lg shadow-sm p-6'>
        <h2 className='text-2xl font-bold mb-4'>{config.title}</h2>
        {config.description && (
          <p className='mb-6 text-gray-600'>{config.description}</p>
        )}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {config.fields?.map((field) => (
            <div key={field.name}>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                {field.placeholder}
                {field.required && <span className='text-red-500 ml-1'>*</span>}
              </label>
              {getFieldComponent(field)}
              {errors[field.name] && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
          <div className='mt-4'>
            <button
              type='submit'
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md text-white font-medium
                ${
                  isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                }
                transition-colors duration-200`}
            >
              {isSubmitting ? 'Sending...' : config.submitButton.text}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
