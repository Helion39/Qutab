# Qutab Deployment Guide

## Environment Variables for Production

When deploying to Hostinger, set these environment variables:

### Required Production Settings
```bash
# Django Settings
SECRET_KEY=your-super-secret-production-key-here
DEBUG=False
FRONTEND_URL=https://qutab.co.id
BACKEND_URL=https://qutab.co.id

# Database (if using PostgreSQL)
DB_NAME=qutab_production
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432

# Zendit Payment Gateway (when registered)
ZENDIT_API_KEY=your-zendit-api-key
ZENDIT_SECRET_KEY=your-zendit-secret-key
ZENDIT_API_URL=https://api.zendit.id/v1
ZENDIT_CALLBACK_URL=https://qutab.co.id/api/payments/webhook/
```

## Referral Link Behavior After Deployment

### Development (Current)
- **Referral Link**: `http://127.0.0.1:8000/r/XK7mP2q/`
- **Records Click**: ✅ Saves to database
- **Redirects to**: `http://localhost:3030/?ref=XK7mP2q`

### Production (After Deployment)
- **Referral Link**: `https://qutab.co.id/r/XK7mP2q/`
- **Records Click**: ✅ Saves to database  
- **Redirects to**: `https://qutab.co.id/?ref=XK7mP2q`

## How the Referral System Works

### 1. **Link Generation**
The system generates referral links that go through the backend first:
```
Backend URL + /r/{affiliate_code}/
```

### 2. **Click Tracking Flow**
```
User clicks: http://127.0.0.1:8000/r/XK7mP2q/
↓
Backend records click in ReferralClick table
↓
Backend redirects to: http://localhost:3030/?ref=XK7mP2q
```

### 3. **Environment-Aware Redirects**
The system automatically detects the environment:
- **Development**: Redirects to `localhost:3030`
- **Production**: Redirects to your domain

## Frontend Configuration

Update your frontend API base URL in `Qutab/src/services/api.ts`:

```typescript
// The system is already configured to be environment-aware:
const API_URL = import.meta.env.VITE_API_URL || (
    import.meta.env.PROD 
        ? 'https://qutab.co.id/api'  // Production
        : 'http://127.0.0.1:8000/api' // Development
);
```

## Testing Referral System Locally

### 1. **Get Your Referral Link**
- Login to affiliate dashboard
- Go to "Links" section  
- Copy the main referral link (e.g., `http://127.0.0.1:8000/r/XK7mP2q/`)

### 2. **Test Click Tracking**
- Open the referral link in a new browser tab
- Should redirect to `http://localhost:3030/?ref=XK7mP2q`
- Check affiliate dashboard - clicks should increase

### 3. **Test Purchase Tracking**
- Use the "Test Komisi (Simulasi)" button in dashboard
- Or manually create orders with the referral code
- Commission should be automatically created

## Hostinger Deployment Steps

1. **Upload Files**
   - Upload backend to `/public_html/api/` or subdomain
   - Upload frontend build to `/public_html/`

2. **Set Environment Variables**
   ```bash
   FRONTEND_URL=https://qutab.co.id
   BACKEND_URL=https://qutab.co.id
   DEBUG=False
   ```

3. **Database Setup**
   - Create MySQL/PostgreSQL database
   - Run migrations: `python manage.py migrate`
   - Create superuser: `python manage.py createsuperuser`

4. **Static Files**
   - Run: `python manage.py collectstatic`

5. **Test Referral System**
   - Get affiliate code from dashboard
   - Test link: `https://qutab.co.id/r/{code}/`
   - Should redirect to: `https://qutab.co.id/?ref={code}`

## Why This Approach Works

✅ **Environment Detection**: System automatically uses correct URLs for dev/prod
✅ **Click Tracking**: Every click is recorded before redirect
✅ **Cross-Port Support**: Handles localhost:8000 → localhost:3030 properly
✅ **Production Ready**: Seamlessly switches to production domains
✅ **No Manual Changes**: No code changes needed when deploying

The referral system will work perfectly in both development and production!