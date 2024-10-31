import React from 'react';
import { TestimonialsConfig, Testimonial } from '@/types/types';
import Image from 'next/image';

import { ReactNode } from 'react';

const Card = ({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

const TestimonialItem = ({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className='group mb-8'>
      <input type='checkbox' id={`toggle-${index}`} className='peer hidden' />

      <Card
        className={`relative flex flex-col items-center md:flex-row ${
          isEven ? '' : 'md:flex-row-reverse'
        } p-6`}
      >
        <div className='w-full flex justify-center mb-4 md:w-1/2 md:mb-0'>
          <div className='rounded-full overflow-hidden w-36 h-36 bg-gray-200'>
            <Image
              src={testimonial.image}
              alt='Testimonial'
              width={150}
              height={150}
              className='w-full h-full object-cover'
            />
          </div>
        </div>
        <div className='w-full text-center md:w-1/2 md:text-left'>
          <p className='text-gray-800'>{testimonial.text}</p>
          {testimonial.additionalText && (
            <div className='mt-4 flex justify-center md:justify-start'>
              <label
                htmlFor={`toggle-${index}`}
                className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer'
                aria-label={`Read more about this testimonial`}
              >
                <span className='sr-only'>
                  <span className='peer-checked:hidden'>
                    Read more about this testimonial
                  </span>
                  <span className='hidden peer-checked:inline'>
                    Show less content
                  </span>
                </span>
                <svg
                  className='w-5 h-5 text-gray-700 transition-transform peer-checked:rotate-180'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </label>
            </div>
          )}
        </div>
      </Card>

      {testimonial.additionalText && (
        <Card
          className={`
            mt-2
            transform
            h-0
            opacity-0
            transition-all
            duration-300
            ease-out
            peer-checked:h-auto
            peer-checked:opacity-100
            bg-gray-50
            overflow-hidden
            peer-checked:p-6
            border-t-4
            border-blue-500
            shadow-lg
          `}
        >
          <p className='text-gray-700'>{testimonial.additionalText}</p>
        </Card>
      )}
    </div>
  );
};

const Testimonials = ({ config }: { config: TestimonialsConfig }) => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-3xl mx-auto space-y-8'>
        {config.testimonials.map((testimonial, index) => (
          <TestimonialItem
            key={index}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
