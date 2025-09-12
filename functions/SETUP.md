# Firebase Functions Setup

## Environment Variables

### For Local Development
1. Copy `service-account-key.example.json` to `service-account-key.json`
2. Fill in your actual service account credentials
3. Run `npm run serve` to start local development

### For Production/CI/CD
Set these environment variables in your deployment platform:

```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
# OR set individual credentials:
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_PRIVATE_KEY_ID=your-private-key-id
GOOGLE_CLOUD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
GOOGLE_CLOUD_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_CLOUD_CLIENT_ID=your-client-id
```

## GitHub Actions Setup

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add these secrets:
   - `GOOGLE_CLOUD_PROJECT_ID`
   - `GOOGLE_CLOUD_PRIVATE_KEY_ID`
   - `GOOGLE_CLOUD_PRIVATE_KEY`
   - `GOOGLE_CLOUD_CLIENT_EMAIL`
   - `GOOGLE_CLOUD_CLIENT_ID`

## Deploy

```bash
cd functions
npm run build
firebase deploy --only functions
```

## Security Notes

- **NEVER** commit `service-account-key.json` to version control
- Use environment variables for production deployments
- Rotate service account keys regularly
- The file is already added to `.gitignore`
