# EmailJS Setup Instructions

## Setting up Newsletter Subscription

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create a free account
3. Verify your email address

### 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the setup instructions to connect your email account
5. Copy the **Service ID** from the service you just created

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Set up your template with these variables:
   - **To Email**: Your email address (where you'll receive notifications)
   - **From Name**: `{{from_name}}`
   - **From Email**: `{{reply_to}}`
   - **Subject**: `New Newsletter Subscription`
   - **Message Body**:
     ```
     Hello {{to_name}},

     You have a new newsletter subscriber!

     Subscriber Email: {{user_email}}

     They have agreed to receive occasional updates about your blog posts and creative projects.

     Best regards,
     Your Portfolio Newsletter System
     ```
4. Save the template and copy the **Template ID**

### 4. Get Your Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### 5. Update Configuration
1. Open `/src/config/emailjs.js`
2. Replace the placeholder values:
   ```javascript
   export const EMAILJS_CONFIG = {
     SERVICE_ID: 'your_actual_service_id', // ← Replace this
     TEMPLATE_ID: 'your_actual_template_id', // ← Replace this
     PUBLIC_KEY: 'your_actual_public_key' // ← Replace this
   }
   ```

### 6. Test the Newsletter Signup
1. Run your development server: `npm run dev`
2. Navigate to a blog post
3. Try subscribing with your email
4. Check your email to confirm you received the notification

## Troubleshooting

### Common Issues:
- **"Invalid service ID"**: Double-check your Service ID in the config
- **"Template not found"**: Verify your Template ID
- **Emails not sending**: Check your email service configuration in EmailJS dashboard
- **CORS errors**: EmailJS handles CORS automatically, but make sure you're using the correct public key

### Rate Limits:
- Free plan: 200 emails/month
- Emails are sent from your connected email service (Gmail, etc.)

## Security Notes:
- Never commit your actual EmailJS credentials to version control
- Consider using environment variables for production deployment
- The public key is safe to expose (it's meant for client-side use)

## Need Help?
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Check browser console for detailed error messages
