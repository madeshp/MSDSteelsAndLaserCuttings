# MSD Steel and Laser Cuttings - React Website

A modern React conversion of the MSD Steel and Laser Cuttings website, featuring precision laser cutting services.

## 🚀 Features

- **Modern React Architecture**: Built with Vite for fast development and optimized builds
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Email Integration**: EmailJS integration for contact form submissions (replacing PHP backend)
- **Interactive Gallery**: Modern image gallery with lightbox functionality
- **Smooth Animations**: CSS animations and transitions for enhanced user experience
- **SEO Optimized**: Meta tags and structured content for better search engine visibility

## 🛠 Technologies Used

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **EmailJS**: Client-side email sending service
- **Styled Components**: CSS-in-JS styling solution
- **React Router**: Client-side routing
- **FontAwesome**: Modern icon library

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/msd-steel-react.git
cd msd-steel-react
```

2. Install dependencies:
```bash
npm install
```

3. Set up EmailJS:
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Create an email service and template
   - Update the EmailJS configuration in `src/services/emailService.js`

4. Start the development server:
```bash
npm run dev
```

## 🔧 Configuration

### EmailJS Setup
1. Sign up for EmailJS at https://www.emailjs.com/
2. Create a new email service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `{{from_name}}` - Customer name
   - `{{from_email}}` - Customer email
   - `{{phone}}` - Customer phone
   - `{{service}}` - Selected service
   - `{{budget}}` - Project budget
   - `{{message}}` - Project details
4. Update the configuration in `src/services/emailService.js`

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation header
│   ├── Hero.jsx        # Hero section
│   ├── Services.jsx    # Services showcase
│   ├── Gallery.jsx     # Project gallery
│   ├── Contact.jsx     # Contact form
│   └── Footer.jsx      # Footer component
├── hooks/              # Custom React hooks
├── services/           # External services (EmailJS)
├── styles/             # Global styles and themes
└── App.jsx            # Main application component
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
The built files in the `dist` folder can be deployed to any static hosting service.

## 📧 Contact Form

The contact form uses EmailJS to send emails directly from the client-side, eliminating the need for a PHP backend. Features include:

- Real-time form validation
- Loading states and success messages
- Error handling and user feedback
- Required field validation
- Email format validation

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth hover animations
- Responsive grid layouts
- Interactive gallery with lightbox
- Professional typography with Inter font
- Mobile-optimized navigation

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About MSD Steel and Laser Cuttings

Professional laser cutting services with cutting-edge technology and expert craftsmanship. Specializing in:

- Precision Laser Cutting
- Decorative Panels
- Custom Parts
- Architectural Elements

---

**Original Static Website**: Converted from static HTML/CSS/JS to modern React application
**Email Backend**: Migrated from PHP to EmailJS for serverless email handling