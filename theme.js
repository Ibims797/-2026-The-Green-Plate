(function () {
    const storageKey = 'greenPlateTheme';
    const legacyStorageKey = 'theme';
    const root = document.documentElement;

    function readStoredTheme() {
        try {
            const storedTheme = localStorage.getItem(storageKey) || localStorage.getItem(legacyStorageKey);
            return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null;
        } catch (error) {
            return null;
        }
    }

    function writeStoredTheme(theme) {
        try {
            localStorage.setItem(storageKey, theme);
            localStorage.setItem(legacyStorageKey, theme);
        } catch (error) {
            // The visible theme still changes if storage is unavailable.
        }
    }

    function preferredTheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function updateToggleButtons(theme) {
        document.querySelectorAll('[data-theme-toggle], #theme-toggle').forEach((button) => {
            const isDark = theme === 'dark';
            button.setAttribute('aria-label', isDark ? 'Light Mode aktivieren' : 'Dark Mode aktivieren');
            button.setAttribute('aria-pressed', String(isDark));
            button.title = isDark ? 'Light Mode aktivieren' : 'Dark Mode aktivieren';
        });
    }

    function applyTheme(theme) {
        root.dataset.theme = theme;
        root.style.colorScheme = theme;

        if (document.body) {
            document.body.classList.toggle('dark-mode', theme === 'dark');
        }

        updateToggleButtons(theme);
    }

    applyTheme(readStoredTheme() || preferredTheme());

    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(root.dataset.theme || readStoredTheme() || preferredTheme());

        document.querySelectorAll('[data-theme-toggle], #theme-toggle').forEach((button) => {
            button.addEventListener('click', () => {
                const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
                applyTheme(nextTheme);
                writeStoredTheme(nextTheme);
            });
        });
    });
})();
