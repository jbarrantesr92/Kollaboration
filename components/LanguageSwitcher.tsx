import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const LanguageSwitcherWhite: React.FC = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const languages = [
        { code: 'en', name: 'English', icon: '/usa.png' },
        { code: 'es', name: 'Español', icon: '/mexico.png' }
    ];

    // State to hold the current language
    const [currentLang, setCurrentLang] = useState({
        code: router.locale,
        name: languages.find(lang => lang.code === router.locale)?.name || 'Language',
        icon: languages.find(lang => lang.code === router.locale)?.icon || '/icons/globe.png'
    });

    // Update the current language when the locale changes
    useEffect(() => {
        const newLang = languages.find(lang => lang.code === router.locale);
        if (newLang) {
            setCurrentLang(newLang);
        }
    }, [router.locale]);

    const switchLocale = (locale: string) => {
        router.push(router.pathname, router.asPath, { locale });
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:text-white flex items-center bg-transparent">
                {currentLang.name}
                <img src='/caret-down-light.svg' className="ml-2 h-5 w-5" alt="caret down" /> {/* Chevron icon with custom color */}
            </button>
            {isOpen && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {languages.map(lang => (
                        <button key={lang.code} onClick={() => switchLocale(lang.code)} className="flex items-center w-full p-2 hover:bg-gray-100">
                            {lang.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcherWhite;
