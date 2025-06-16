# Jason Yu - Resume Website

A modern, responsive resume website built with Bootstrap, Sass, and vanilla JavaScript.

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Accessibility**: ARIA labels, semantic markup, and keyboard navigation
- **Performance**: Minified CSS/JS, optimized images, and fast loading
- **SEO Optimized**: Proper meta tags and structured content

## 🛠️ Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **SCSS/CSS3**: Modern styling with variables and mixins
- **JavaScript**: Vanilla JS for smooth scrolling and interactions
- **Bootstrap 4**: Grid system and responsive utilities
- **Font Awesome**: Icon library
- **Sass**: CSS preprocessing

## 📦 Project Structure

```
├── css/                 # Compiled CSS files
├── scss/               # Source SCSS files
│   ├── _variables.scss # Color and spacing variables
│   ├── _mixins.scss    # Reusable mixins
│   ├── _global.scss    # Global styles
│   ├── _nav.scss       # Navigation styles
│   ├── _custom-styles.scss # Custom component styles
│   └── resume.scss     # Main SCSS file
├── js/                 # JavaScript files
├── img/                # Images and assets
├── vendor/             # Third-party libraries
├── index.html          # Main HTML file
├── package.json        # Project dependencies
└── build.sh            # Build script
```

## 🔧 Development

### Prerequisites

- Node.js (v14 or higher)
- npm

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yordlejason/yordlejason.github.io.git
   cd yordlejason.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

### Available Scripts

- `npm run build` - Compile SCSS to CSS and minify
- `npm run watch` - Watch SCSS files for changes and auto-compile
- `npm run serve` - Start a local development server

### Manual Build

You can also use the build script directly:
```bash
./build.sh
```

## 🎨 Customization

### Colors and Theming

Edit `scss/_variables.scss` to customize:
- Primary color scheme
- Typography settings
- Spacing and layout variables

### Content

Update `index.html` to modify:
- Personal information
- Work experience
- Projects and achievements
- Contact information

### Styling

Modify SCSS files in the `scss/` directory:
- `_global.scss` - Global styles and typography
- `_nav.scss` - Navigation styling
- `_custom-styles.scss` - Custom component styles

## 🚀 Deployment

The site is deployed to GitHub Pages and automatically updates when changes are pushed to the main branch.

**Live Site**: [https://yordlejason.github.io](https://yordlejason.github.io)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

While this is a personal resume website, suggestions for improvements are welcome! Feel free to open an issue or submit a pull request.

## 📞 Contact

- **Email**: yordlejason@gmail.com
- **LinkedIn**: [linkedin.com/in/doordash](https://www.linkedin.com/in/doordash/)
- **GitHub**: [github.com/yordlejason](https://github.com/yordlejason)

---

*Built with ❤️ by Jason Yu*

After downloading, simply edit the HTML and CSS files included with the template in your favorite text editor to make changes. These are the only files you need to worry about, you can ignore everything else! To preview the changes you make to the code, you can open the `index.html` file in your web browser.

### Advanced Usage

After installation, run `npm install` and then run `gulp dev` which will open up a preview of the template in your default browser, watch for changes to core template files, and live reload the browser when changes are saved. You can view the `gulpfile.js` to see which tasks are included with the dev environment.

#### Gulp Tasks

- `gulp` the default task that builds everything
- `gulp dev` browserSync opens the project in your default browser and live reloads when changes are made
- `gulp sass` compiles SCSS files into CSS
- `gulp minify-css` minifies the compiled CSS file
- `gulp minify-js` minifies the themes JS file
- `gulp copy` copies dependencies from node_modules to the vendor directory

## Bugs and Issues

Have a bug or an issue with this template? [Open a new issue](https://github.com/BlackrockDigital/startbootstrap-resume/issues) here on GitHub or leave a comment on the [template overview page at Start Bootstrap](http://startbootstrap.com/template-overviews/resume/).

## Custom Builds

You can hire Start Bootstrap to create a custom build of any template, or create something from scratch using Bootstrap. For more information, visit the **[custom design services page](https://startbootstrap.com/bootstrap-design-services/)**.

## About

Start Bootstrap is an open source library of free Bootstrap templates and themes. All of the free templates and themes on Start Bootstrap are released under the MIT license, which means you can use them for any purpose, even for commercial projects.

* https://startbootstrap.com
* https://twitter.com/SBootstrap

Start Bootstrap was created by and is maintained by **[David Miller](http://davidmiller.io/)**, Owner of [Blackrock Digital](http://blackrockdigital.io/).

* http://davidmiller.io
* https://twitter.com/davidmillerskt
* https://github.com/davidtmiller

Start Bootstrap is based on the [Bootstrap](http://getbootstrap.com/) framework created by [Mark Otto](https://twitter.com/mdo) and [Jacob Thorton](https://twitter.com/fat).

## Copyright and License

Copyright 2013-2018 Blackrock Digital LLC. Code released under the [MIT](https://github.com/BlackrockDigital/startbootstrap-resume/blob/gh-pages/LICENSE) license.
