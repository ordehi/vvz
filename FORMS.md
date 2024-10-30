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

## Security considerations

The outlined approach offers a baseline of security, but it has some vulnerabilities that need addressing to be secure for production use. Here’s an analysis of its security and recommendations for improvement:

### 1. **Environment Variable Security**

- **Pros**:
  - Keeping sensitive information like `DATABASE_URL` in an environment variable is a standard practice to separate code from secrets.
- **Cons**:
  - Environment variables can still be exposed if misconfigured (e.g., in a public `.env` file or in logs).
- **Recommendations**:
  - Use a secrets manager (e.g., AWS Secrets Manager, HashiCorp Vault, or Doppler) to store and manage credentials.
  - Avoid committing the `.env` file to version control by including it in `.gitignore`.
  - Set strict permissions on the `.env` file to limit access only to authorized users.

### 2. **Database Connection String (`DATABASE_URL`)**

- **Pros**:
  - It's a common and accepted way to connect to databases.
- **Cons**:
  - Storing username and password directly in the connection string can be risky.
- **Recommendations**:
  - Enable SSL connections for the database to encrypt data in transit.
  - Consider using IAM-based authentication (where available, e.g., AWS RDS IAM) instead of static credentials.
  - Use temporary or rotating credentials where possible to minimize risk if exposed.

### 3. **Prisma Client Security**

- **Pros**:
  - Prisma provides ORM-like security features, such as input validation and type safety, reducing some security risks like SQL injection.
- **Cons**:
  - Misconfigurations or missing validation logic can still expose the system to attacks.
- **Recommendations**:
  - Use robust data validation libraries (e.g., Zod, as mentioned) for both user input and database queries.
  - Implement strict error handling to avoid leaking database information through error messages.

### 4. **Role-based Database Access**

- **Pros**:
  - Assigning different roles for different database users (e.g., read-only for certain actions) adds an additional security layer.
- **Recommendations**:
  - Implement roles with the principle of least privilege, limiting permissions based on the service's specific needs.
  - Use separate database users for different environments (e.g., development vs. production) and operations (e.g., read vs. write).

### 5. **Additional Security Layers**

- **Enable database-specific security features**: Such as row-level security, data masking, and access logs.
- **Use parameterized queries**: Prisma does this by default, but always ensure queries are parameterized to prevent SQL injection.
- **Rate limiting and input sanitization**: Implement rate limiting, input sanitization, and other security best practices at the API level to prevent abuse and injection attacks.
- **Regularly audit and rotate credentials**: Even with good security practices, regularly updating credentials reduces the impact of potential leaks.

### Overall Assessment

The approach provides a reasonable level of security for development or early-stage projects but is not sufficient for production. The biggest risks come from potential exposure of static credentials, lack of encryption in transit, and possible misconfiguration of the environment variables.

By incorporating the recommended practices, you can significantly enhance the security of the system for production deployments.
