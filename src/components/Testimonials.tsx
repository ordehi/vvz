import React from 'react';
import { TestimonialsConfig, Testimonial } from '@/types/types';
import Image from 'next/image';

const TestimonialItem: React.FC<{
  testimonial: Testimonial;
  index: number;
}> = ({ testimonial, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col items-center mb-8 md:flex-row ${
        isEven ? '' : 'md:flex-row-reverse'
      } bg-white text-black p-4 rounded-lg shadow-md`}
    >
      <div className='w-full flex justify-center mb-4 md:w-1/2 md:mb-0'>
        <Image
          src={testimonial.image}
          alt='Testimonial'
          width={150}
          height={150}
          className='rounded-full'
        />
      </div>
      <div className='w-full text-center md:w-1/2 md:text-left'>
        <p>{testimonial.text}</p>
        {testimonial.additionalText && (
          <details className='group'>
            <summary className='text-blue-500 cursor-pointer'>
              Read More
            </summary>
            <p className='hidden group-open:block'>
              {testimonial.additionalText}
            </p>
          </details>
        )}
      </div>
    </div>
  );
};

export default function Testimonials({
  config,
}: {
  config: TestimonialsConfig;
}) {
  return (
    <div className='container mx-auto px-4 py-8 flex justify-center'>
      <div className='w-full max-w-2xl'>
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
