# Firebase Deployment Guide

## Prerequisites
1. Install Firebase CLI globally:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

## Configuration Steps
1. Initialize Firebase in your project:
```bash
firebase init
```

2. During initialization:
   - Select "Hosting"
   - Choose your Firebase project or create a new one
   - Use "build" as your public directory (since this is a React app)
   - Configure as a single-page app: Yes
   - Don't overwrite index.html: No

3. Add build script to package.json if not present:
```json
{
  "scripts": {
    "build": "react-scripts build"
  }
}
```

4. Build your application:
```bash
npm run build
```

5. Deploy to Firebase:
```bash
firebase deploy
```

## Configuration Files
The following files will be created during initialization:
- `.firebaserc` - Contains your project ID
- `firebase.json` - Contains your Firebase configuration
- `.firebase/` directory - Contains cache and deployment info