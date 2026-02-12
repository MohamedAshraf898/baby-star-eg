window.setLanguage = function (lang) {
    console.log('Setting language to:', lang);
    if (!window.translations || !window.translations[lang]) {
        console.error('Translations not found for:', lang);
        return;
    }
    //hi
    localStorage.setItem('baby_star_lang', lang);
    document.documentElement.lang = lang;

    if (lang === 'ar') {
        document.body.classList.add('rtl');
        document.documentElement.setAttribute('dir', 'rtl');
        var bs = document.querySelector('#bootstrap-css');
        if (bs) bs.setAttribute('href', 'css/bootstrap-rtl.css'); // Optional if you have RTL bootstrap
    } else {
        document.body.classList.remove('rtl');
        document.documentElement.setAttribute('dir', 'ltr');
        var bs = document.querySelector('#bootstrap-css');
        if (bs) bs.setAttribute('href', 'css/bootstrap.css');
    }

    updateContent(lang);
    updateSlider(lang);
}

function updateContent(lang) {
    console.log('Updating content for:', lang);
    var elements = document.querySelectorAll('[data-i18n]');
    console.log('Found elements to translate:', elements.length);
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (window.translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = window.translations[lang][key];
            } else {
                element.innerHTML = window.translations[lang][key]; // Use innerHTML to allow HTML tags like <br>
            }
        } else {
            console.warn('Missing translation for key:', key);
        }
    });
}

function updateSlider(lang) {
    // Only reload if absolutely necessary, otherwise try to update text layers
    // Revolution slider might need a re-init or just a page reload to handle RTL properly
    // For now, we rely on the data-i18n updates in the DOM which might work if layers are simple text
}

window.toggleLanguage = function () {
    const currentLang = localStorage.getItem('baby_star_lang') || 'en';
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    console.log('Toggling language from', currentLang, 'to', newLang);
    localStorage.setItem('baby_star_lang', newLang);
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('baby_star_lang') || 'en';
    setLanguage(savedLang);
});
