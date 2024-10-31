import Testimonials from '@/components/Testimonials';
import { testimonialsConfig } from '@/config/components/testimonials.client';

export default function TestimonialsPage() {
  return (
    <div className='min-h-screen p-8'>
      <Testimonials config={testimonialsConfig} />
    </div>
  );
}
