# Google OAuth Scope Usage Justification

## Requested Scopes

1. `userinfo.email` and `userinfo.profile`
   - Required for user authentication and account creation
   - Used to personalize the user experience
   - Essential for communication regarding account status and updates

2. `youtube.readonly`
   - Required to access YouTube videos for reaction creation
   - Used to fetch video metadata (title, description, thumbnails)
   - Necessary for synchronizing reaction timing with original content

3. `youtube.upload`
   - Required for publishing reaction videos directly to user's YouTube channel
   - Used to streamline the content creation workflow
   - Essential for our core service functionality

## Data Usage Details

### Profile Information
- Name: Used for personalization and display within the application
- Email: Required for account management and communications
- Profile Picture: Used for user interface personalization

### YouTube Data
- Video Information: Used to create synchronized reactions
- Channel Details: Required for proper video attribution
- Upload Capability: Essential for publishing reaction content

## Security Measures

1. Data Encryption
   - All data transmission uses TLS 1.3
   - Data at rest is encrypted using AES-256

2. Access Controls
   - Role-based access control
   - Regular security audits
   - Automated threat detection

3. Data Retention
   - User data is retained only as long as necessary
   - Clear data deletion policies
   - Regular data cleanup procedures

## User Control

Users have complete control over their data:
- Can revoke access at any time
- Can delete their account and associated data
- Can export their data in standard formats

## Compliance

We comply with:
- GDPR requirements
- YouTube API Services Terms of Service
- Google API Services User Data Policy