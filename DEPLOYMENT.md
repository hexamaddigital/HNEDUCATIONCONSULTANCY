# Deployment Guide for Hostinger

## Quick Deploy Steps

### 1. Build the Project
```bash
npm run build
```

This creates a `dist` folder with all production files.

### 2. Upload to Hostinger

Upload all files from the `dist` folder to your Hostinger public_html directory:

**Important Files:**
- `.htaccess` - Already included in the build (fixes 404 errors on refresh)
- `index.html` - Main entry point
- `assets/` - All CSS, JS, and other assets

### 3. Hostinger File Manager Method

1. Login to Hostinger control panel
2. Go to File Manager
3. Navigate to `public_html`
4. Delete old files (if any)
5. Upload all files from the `dist` folder
6. Make sure `.htaccess` file is present in public_html

### 4. FTP Method

```
Host: ftp.yourdomain.com
Username: your-ftp-username
Password: your-ftp-password
Port: 21
```

Upload the contents of `dist` folder to `/public_html`

## Important Notes

### 404 Error Fix
The `.htaccess` file in the `public` folder automatically fixes the 404 error that occurs when refreshing pages. It redirects all requests to index.html, allowing React Router to handle the routing.

If you still get 404 errors after deployment:
1. Verify `.htaccess` is in the root directory (public_html)
2. Check if your hosting has mod_rewrite enabled (Hostinger has it by default)

### Environment Variables
Make sure your `.env` file on Hostinger has:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Browser Caching
The `.htaccess` file includes caching headers for optimal performance:
- Images: 1 year
- CSS/JS: 1 month
- HTML: 1 hour

### Security Headers
Security headers are automatically added via `.htaccess`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: enabled

## Troubleshooting

### Issue: 404 on page refresh
**Solution:** Make sure `.htaccess` file exists in public_html root

### Issue: Blank page after deployment
**Solution:** Check browser console for errors. Usually missing environment variables.

### Issue: Images not loading
**Solution:** Verify all files from `dist` folder were uploaded, including the `assets` folder

### Issue: WhatsApp/Call buttons not working
**Solution:** Clear browser cache and hard reload (Ctrl+Shift+R)

## Post-Deployment Checklist

- [ ] Test all pages (navigate and refresh)
- [ ] Test all forms (Contact, Lead Capture, Tourist Visa)
- [ ] Test WhatsApp button
- [ ] Test Call Now button (on mobile)
- [ ] Test PDF downloads
- [ ] Verify lead capture popup appears
- [ ] Check Admin panel functionality
- [ ] Test on mobile devices
- [ ] Check page load speed

## Performance Tips

1. **Enable Cloudflare** (if available on Hostinger)
2. **Verify GZIP compression** is working (check .htaccess)
3. **Check image optimization** - All images should be compressed
4. **Monitor Core Web Vitals** using Google PageSpeed Insights

## Support

For deployment issues, contact Hostinger support or check:
- Hostinger Knowledge Base: https://support.hostinger.com
- React Router Deployment Docs: https://reactrouter.com/en/main/guides/deploying
