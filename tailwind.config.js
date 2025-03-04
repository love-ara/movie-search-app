/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            typography: ({ theme }) => ({
                black: {
                    css: {
                        '--tw-prose-links': theme('colors.link'),
                    },
                },
            }),
        },
    },
    plugins: [require("tailwindcss-animate"),
        ('@tailwindcss/typography')
    ],
};
