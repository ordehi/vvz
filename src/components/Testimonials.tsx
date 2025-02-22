import React from 'react';
import Image from 'next/image';
import {
  TestimonialsProps,
  TestimonialItemProps,
  CardProps,
} from '@/types/types';

const SafelistClasses = () => (
  <div className='hidden rotate-0 rotate-180 peer-checked:rotate-180' />
);

const Card: React.FC<CardProps> = ({ className = '', children }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

const TestimonialItem: React.FC<TestimonialItemProps> = ({
  testimonial,
  index,
}) => {
  const isEven = index % 2 === 0;
  const hasAdditionalText = !!testimonial.additionalText;

  return (
    <div className='mb-8'>
      <div className='relative'>
        <input
          type='checkbox'
          id={`toggle-${index}`}
          className='peer sr-only'
        />

        <label
          htmlFor={`toggle-${index}`}
          className={`group block ${
            hasAdditionalText ? 'cursor-pointer' : 'cursor-default'
          }`}
        >
          <Card
            className={`relative flex flex-col items-center md:flex-row ${
              isEven ? '' : 'md:flex-row-reverse'
            } p-6 pb-12 md:pb-6`}
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
            </div>
          </Card>
        </label>

        {hasAdditionalText && (
          <>
            <label
              htmlFor={`toggle-${index}`}
              className={`chevron-container ${
                isEven ? 'chevron-right' : 'chevron-left'
              }`}
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
                className='chevron'
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

            <div className='peer-checked:block hidden'>
              <Card
                className={`
                  mt-2
                  bg-gray-50
                  overflow-hidden
                  p-6
                  border-t-4
                  border-blue-500
                  shadow-lg
                `}
              >
                <p className='text-gray-700'>{testimonial.additionalText}</p>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function Testimonials({ config }: TestimonialsProps) {
  return (
    <div className='container mx-auto px-4 py-8'>
      <SafelistClasses />
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
}
