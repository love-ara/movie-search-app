import './globals.css';

export const metadata = {
    title: 'Movie Search App',
    description: 'Search for movies and view details',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    );
}