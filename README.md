# AI Law Academy India (Full-Stack)

Production-oriented course platform for Indian law students and legal professionals.

## Business rules implemented

- Course fee: **₹4000**
- Current discounted fee: **₹3000**
- One-time full payment only
- Full course unlock after successful payment
- Weekly online classes
- Completion certificate with unique verification ID
- Public certificate verification page

## Tech stack

- **Next.js 14** (App Router, TypeScript)
- **Prisma ORM**
- **SQLite** (can be switched to PostgreSQL in production)
- **JWT cookie authentication**
- **bcrypt hashed passwords**

## Modules included

### Public website
- Home, About, Courses, Course Detail, FAQ, Contact
- Terms & Conditions, Privacy Policy, Refund Policy, Disclaimer
- Certificate verification page

### Student
- Register/Login
- Dashboard (profile, purchased courses, lessons/modules, live schedules, progress, certificate status/download, payment status)

### Admin
- Login and dashboard
- Manage students, courses, payments, certificates, schedules, coupons, and website content

## Authentication & authorization flow

1. Student registers via `/register` -> password hashed using bcrypt.
2. Login via `/login` -> JWT signed and stored in httpOnly cookie.
3. Middleware protects `/student/*` and `/admin/*` routes.
4. Role-based checks enforce admin APIs.

## Payment flow (mock gateway for starter code)

1. Student clicks **Pay & Unlock Course** in course detail page.
2. `/api/payment/create-order` creates pending payment with discounted amount and optional coupon.
3. `/api/payment/verify` marks payment success, creates enrollment and initial progress record.
4. Certificate placeholder record is created with verification ID.
5. Admin can issue certificate by marking it issued and adding file URL.

## Certificate verification flow

- Public user enters verification ID on `/verify-certificate`.
- API `/api/certificate/verify?id=...` validates record and returns student/course/issue data if issued.

## Student registration fields

- Full name
- Email
- Mobile
- Password
- Law college/university
- Year/semester
- City/state
- Profession
- Optional profile photo URL

## Setup instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env values:
   ```bash
   cp .env.example .env
   ```
3. Push schema and seed sample data:
   ```bash
   npm run db:push
   npm run db:seed
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## Demo credentials

Use values from `.env`:
- Admin email: `ADMIN_EMAIL`
- Admin password: `ADMIN_PASSWORD`

## Mandatory disclaimers included

- Courses are educational and not legal advice.
- Certificates are course completion certificates.
- Dedicated terms/privacy/refund/disclaimer pages are provided.

## Production hardening checklist

- Replace mock payment with Razorpay/Stripe India flow + webhook verification.
- Use PostgreSQL + migration strategy.
- Add CSRF and rate limiting.
- Add audit logs and admin action tracking.
- Store certificate PDFs in S3-compatible storage.
