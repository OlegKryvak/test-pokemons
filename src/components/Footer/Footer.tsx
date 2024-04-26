import React from 'react';
import styles from './Footer.module.scss';

type FooterProps = {
    className?: string
}
const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <footer className={className ? className : styles.footer}>
            <div className={styles.footerContent}>
                <p>Made by Oleg Kryvak</p>
            </div>
        </footer>
    );
};

export default Footer;
