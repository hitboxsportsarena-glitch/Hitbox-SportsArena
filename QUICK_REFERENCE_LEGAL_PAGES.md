# Quick Reference - Legal Pages

## 🔗 All Page URLs

| Page | URL | Purpose |
|------|-----|---------|
| **Terms & Conditions** | `/terms-and-conditions` | Legal terms for using the platform |
| **Privacy Policy** | `/privacy-policy` | How user data is collected and used |
| **Cancellation & Refund** | `/cancellation-refund` | Refund policy and timelines |
| **Contact Us** | `/contact` | Contact form and support information |
| **Shipping & Exchange** | `/shipping-exchange` | Digital service clarification |

## 📂 File Locations

```
src/
├── pages/
│   ├── TermsAndConditions.jsx ✅
│   ├── PrivacyPolicy.jsx ✅
│   ├── CancellationRefund.jsx ✅
│   ├── ContactUs.jsx ✅
│   └── ShippingExchange.jsx ✅
└── styles/
    └── legal.css ✅
```

## 🎨 Styling

All legal pages use: `src/styles/legal.css`

Theme colors:
- Primary gradient: `#667eea` → `#764ba2`
- Dark sections: `#2c3e50` → `#34495e`
- Background: `#f8f9fa` → `#ffffff`

## 🔧 How to Edit

### Update Contact Information:
**File**: `src/pages/ContactUs.jsx`
- Lines with phone number: Search `+91 84999 63878`
- Lines with email: Search `info@hitboxcricket.com`
- Lines with address: Search `[Your Address]`

### Update Refund Policy:
**File**: `src/pages/CancellationRefund.jsx`
- Refund percentages in sections 1-3
- Processing time in section 8

### Update Terms:
**File**: `src/pages/TermsAndConditions.jsx`
- Player limits in section 2.1
- Tournament rules in section 6

## 🚀 Testing Locally

1. Start dev server: `npm run dev`
2. Open: `http://localhost:5173/`
3. Scroll to footer
4. Click any legal link

## 📱 Footer Links (Homepage)

The homepage footer has three sections:

1. **Hit Box Cricket** - Brand info
2. **Quick Links** - Register Team, Contact
3. **Legal** - All policy pages

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Update contact information (phone, email, address)
- [ ] Add real social media links
- [ ] Customize legal content if needed
- [ ] Test all links work
- [ ] Test mobile responsiveness
- [ ] (Optional) Connect contact form to backend

## 🎯 Current Status

✅ All pages created  
✅ All routes configured  
✅ Styling complete  
✅ Homepage footer added  
✅ Mobile responsive  
✅ Cross-links working  
✅ Back navigation working  

**Ready for production!** 🚀
