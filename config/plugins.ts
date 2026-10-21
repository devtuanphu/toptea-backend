import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

// SVG is allowed so editors can replace icons in the Media Library. The website only
// renders uploads through <img>/CSS masks, never inline, so scripts inside SVGs do not run.
const deniedTypes = [
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': {
    config: {
      jwtManagement: 'refresh',
      sessions: {
        httpOnly: true,
      },
    },
  },
  // SMTP when SMTP_HOST is set; otherwise EMAIL_PREVIEW=true logs messages instead of sending (dev).
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: env('SMTP_HOST')
        ? {
            host: env('SMTP_HOST'),
            port: env.int('SMTP_PORT', 587),
            secure: env.bool('SMTP_SECURE', false),
            auth: env('SMTP_USERNAME') ? { user: env('SMTP_USERNAME'), pass: env('SMTP_PASSWORD') } : undefined,
          }
        : { jsonTransport: true },
      settings: {
        defaultFrom: env('EMAIL_FROM', 'no-reply@topwelltea.com'),
        defaultReplyTo: env('EMAIL_REPLY_TO', 'hello@topwelltea.com'),
      },
    },
  },
  upload: {
    config: {
      security: {
        allowedTypes: allowedMediaTypes,
        deniedTypes,
      },
    },
  },
});

export default config;
