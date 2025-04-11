// Theme management
class ThemeManager {
    constructor() {
        this.darkMode = false;
        this.init();
    }

    init() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            this.enableDarkMode();
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                this.darkMode = e.matches;
                this.updateTheme();
            }
        });
    }

    toggleTheme() {
        this.darkMode = !this.darkMode;
        this.updateTheme();
        localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    }

    enableDarkMode() {
        this.darkMode = true;
        this.updateTheme();
    }

    updateTheme() {
        const root = document.documentElement;
        if (this.darkMode) {
            root.style.setProperty('--background-color', '#1a1a1a');
            root.style.setProperty('--text-color', '#ffffff');
            root.style.setProperty('--card-bg', '#2d2d2d');
            root.style.setProperty('--border-color', '#3d3d3d');
            root.style.setProperty('--primary-color', '#3498db');
            root.style.setProperty('--text-light', '#a0a0a0');
        } else {
            root.style.setProperty('--background-color', '#f5f6fa');
            root.style.setProperty('--text-color', '#2c3e50');
            root.style.setProperty('--card-bg', '#ffffff');
            root.style.setProperty('--border-color', '#ecf0f1');
            root.style.setProperty('--primary-color', '#2c3e50');
            root.style.setProperty('--text-light', '#7f8c8d');
        }
    }
}

// Animation utilities
const animate = {
    fadeIn: (element, duration = 300) => {
        element.style.opacity = 0;
        element.style.display = 'block';
        element.style.transition = `opacity ${duration}ms`;
        setTimeout(() => element.style.opacity = 1, 10);
    },
    
    fadeOut: (element, duration = 300) => {
        element.style.opacity = 1;
        element.style.transition = `opacity ${duration}ms`;
        element.style.opacity = 0;
        setTimeout(() => element.style.display = 'none', duration);
    },
    
    slideDown: (element, duration = 300) => {
        element.style.display = 'block';
        const height = element.scrollHeight;
        element.style.overflow = 'hidden';
        element.style.height = 0;
        element.style.transition = `height ${duration}ms`;
        setTimeout(() => element.style.height = height + 'px', 10);
    }
};

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});
