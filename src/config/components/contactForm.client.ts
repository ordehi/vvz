'use client';

import { ContactFormConfig } from '@/types/types';

export const contactFormConfig: ContactFormConfig = {
  title: 'Get in Touch',
  description:
    'Fill out the form below and we will get back to you as soon as possible.',
  fields: [
    { name: 'name', type: 'text', placeholder: 'Your Name', required: true },
    { name: 'email', type: 'email', placeholder: 'Your Email', required: true },
    {
      name: 'message',
      type: 'textarea',
      placeholder: 'Your Message',
      required: true,
    },
  ],
  submitButton: {
    text: 'Send Message',
    variant: 'primary',
  },
};
