import React from 'react';
import '../styles/header-footer.css';

function Footer() {

    return (
        <div>
                <div className="footer bg-[#dfcfb69e] border-solid border-0 border-t border-zinc-500 mt-3 content-center">
                    <p className="text-indigo-700 text-center text-xs tracking-wider uppercase">© Developed by <a className="underline" href="https://rumeysagelgi.com/" target="_blank" rel="noreferrer">Rumeysa Gelgi</a> | 2024</p>
                </div>
        </div>
    );
}

export default Footer;