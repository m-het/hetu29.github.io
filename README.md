# Smooth Portfolio Website

A modern, responsive portfolio website with smooth animations and interactive elements, inspired by [andresthedesigner.com](https://www.andresthedesigner.com/).

## Features

- Light and dark theme with automatic system preference detection
- Custom cursor with hover effects
- Smooth page transitions and scroll animations
- Interactive navigation menu
- Responsive design that works on all devices
- Modern and clean UI with subtle animations
- Contact form with validation

## Technologies Used

- HTML5
- CSS3 (with modern CSS variables and flexbox/grid)
- JavaScript (Vanilla JS)
- GSAP (GreenSock Animation Platform) for animations
- ScrollTrigger for scroll-based animations
- Font Awesome for icons
- Local Storage for theme preference saving

## How to Use

1. Clone or download this repository
2. Open `index.html` in your browser
3. Customize the content to match your personal information and projects
4. Toggle between light and dark themes using the theme switch button in the header

## Customization

### Changing Colors

The color scheme can be easily modified by editing the CSS variables in the `:root` section of the `styles.css` file:

```css
:root {
    /* Light theme variables */
    --primary-color: #0066FF;
    --secondary-color: #1A1A1A;
    --text-color: #333333;
    --light-text: #FFFFFF;
    --dark-bg: #0D0D0D;
    --light-bg: #F8F8F8;
    --accent-color: #FF3366;
    /* ... */
}

/* Dark Theme Variables */
html[data-theme='dark'] {
    --primary-color: #59a7ff;
    --secondary-color: #FFFFFF;
    --text-color: #F0F0F0;
    /* ... */
}
```

### Updating Content

1. **Personal Information**: Edit the text in the hero section, about section, and contact information in `index.html`
2. **Projects**: Add or remove project cards in the projects section
3. **Skills**: Modify the skill bars and their percentages in the about section
4. **Images**: Replace the placeholder images with your own photos and project screenshots

### Theme Switch

The theme switch automatically:
- Saves the user's preference in local storage
- Respects the user's system preference if no saved preference
- Provides smooth transitions between themes

You can customize the appearance of the theme switch by editing the `.theme-switch` styles in CSS.

### Adding Pages

If you need additional pages:

1. Create a new HTML file based on the structure of `index.html`
2. Add links to the new page in the navigation menu
3. Ensure consistent styling across pages
4. Remember to include the theme switching functionality on each page

## Animation Customization

The animations are controlled in the `script.js` file using GSAP. You can modify:

- Animation durations
- Delay times
- Easing functions
- Scroll trigger points
- Animation properties (opacity, transform, etc.)

## Contact Form Setup

The contact form is currently set up to simulate sending a message. To make it functional:

1. Set up a server-side script to handle form submissions
2. Update the form submission code in `script.js` to send data to your server
3. Add proper error handling and success messages

## Browser Compatibility

This website works in all modern browsers including:

- Chrome
- Firefox
- Safari
- Edge

## Credits

- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- Animation library: [GSAP](https://greensock.com/gsap/)
- Placeholder images: [Unsplash](https://unsplash.com/)

## License

This project is open source and available under the MIT License. 