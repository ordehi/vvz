'use client';

import { ContactFormConfig } from '@/types/types';

export const contactFormConfig: ContactFormConfig = {
  title: 'Get in Touch',
  description:
    'Fill out the form below and we will get back to you as soon as possible.',
  fields: [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Your Name',
      required: true,
      validation: {
        min: 2,
        message: 'Name must be at least 2 characters',
      },
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Your Email',
      required: true,
    },
    {
      name: 'phone',
      type: 'tel',
      placeholder: 'Phone Number',
      required: false,
      validation: {
        pattern: '^[0-9+-]+$',
        message: 'Please enter a valid phone number',
      },
    },
    {
      name: 'preferredDate',
      type: 'date',
      placeholder: 'Preferred Contact Date',
      required: false,
    },
    {
      name: 'message',
      type: 'textarea',
      placeholder: 'Your Message',
      required: true,
      validation: {
        min: 10,
        message: 'Message must be at least 10 characters',
      },
    },
  ],
  submitButton: {
    text: 'Send Message',
    variant: 'primary',
  },
};
