import { NextResponse } from 'next/server';
import { createValidationSchema } from '@/lib/validation';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { ContactFormConfig } from '@/types/types';

export async function POST(request: Request) {
  try {
    const { formData, config } = await request.json();

    // Create dynamic validation schema based on form config
    const validationSchema = createValidationSchema(config);

    // Validate the request body
    const validatedData = validationSchema.parse(formData);

    // Store in database - create dynamic data object
    const submission = await prisma.contactSubmission.create({
      data: {
        ...validatedData,
        status: 'PENDING',
      },
    });

    // Create email content from dynamic fields
    const emailContent = Object.entries(validatedData)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    // Send email notification
    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: 'New Contact Form Submission',
      text: emailContent,
    });

    return NextResponse.json(
      { message: 'Form submitted successfully', id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Form submission error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
