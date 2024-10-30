## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Form Handling Setup

The app includes a dynamic form system with database storage and email notifications. Follow these steps to set it up:

### 1. Install Dependencies

```bash
# Install required packages
npm install @prisma/client zod nodemailer
npm install prisma --save-dev
```

### 2. Database Setup

1. Initialize Prisma:

```bash
npx prisma init
```

2. Add this schema to your `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or "mysql" or "sqlite"
  url      = env("DATABASE_URL")
}

model ContactSubmission {
  id        String   @id @default(cuid())
  name      String?
  email     String?
  message   String?
  data      Json     // For storing additional dynamic fields
  status    String   @default("PENDING")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

3. Generate Prisma client and create database tables:

```bash
npx prisma generate
npx prisma db push
```

### 3. Environment Variables

Create or update your `.env` file with these variables:

```env
# Database
DATABASE_URL="your-database-connection-string"

# Email
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-smtp-username"
SMTP_PASS="your-smtp-password"
SMTP_FROM="noreply@your-domain.com"
ADMIN_EMAIL="your-email@domain.com"
```

### 4. Email Service Options

Choose one of these email service options:

#### Option A: SMTP Server (e.g., Gmail, Outlook)

- Use the existing setup with the SMTP environment variables above
- For Gmail, enable 2FA and create an App Password

#### Option B: SendGrid

1. Install SendGrid:

```bash
npm install @sendgrid/mail
```

2. Replace SMTP variables with:

```env
SENDGRID_API_KEY="your-api-key"
```

#### Option C: Development Testing

- Use [Mailtrap](https://mailtrap.io) for testing emails
- Get SMTP credentials from your Mailtrap inbox
- Update SMTP environment variables with Mailtrap credentials

### 5. Form Configuration

The form system is configurable through a config object. Example usage:

```typescript
// config/components/contactForm.client.ts
export const contactFormConfig = {
  title: 'Get in Touch',
  description: 'Fill out the form below and we will get back to you.',
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
```

### 6. Usage

Use the form component in your pages:

```typescript
import ContactForm from '@/components/ContactForm';
import { contactFormConfig } from '@/config/components/contactForm.client';

export default function Contact() {
  return (
    <div>
      <ContactForm config={contactFormConfig} className='max-w-lg mx-auto' />
    </div>
  );
}
```

### Troubleshooting

1. **Database Connection Issues**

   - Ensure your DATABASE_URL is correct
   - Check database server is running
   - Run `npx prisma db push` to sync schema

2. **Email Sending Issues**

   - Verify SMTP credentials are correct
   - Check spam folder during testing
   - Use Mailtrap in development to debug emails

3. **Form Validation Issues**
   - Check browser console for validation errors
   - Verify form config matches expected schema
   - Ensure all required fields are properly marked

### Additional Notes

- The form system uses Zod for validation
- All form submissions are stored in the database
- Email notifications are sent for each submission
- The system supports dynamic field configuration
- Custom styling can be applied through className prop

For more detailed configuration options and advanced usage, refer to the component documentation.
