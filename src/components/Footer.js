import React from 'react'
import '../App.css';
import { faGithub, faInstagram, faLinkedin, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { config, library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faGithub, faInstagram, faLinkedin)
config.familyPrefix = "fa"

const Footer = () => {
    return (
        <footer className="footer-distributed mt-4">
            <div className="footer-right">
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/sai-krishna-karnati/"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                <a target="_blank" rel="noreferrer" href="https://github.com/saikrishna7004/"><FontAwesomeIcon icon={faGithub} /></a>
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/saikrishna7004/"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
            <div className="footer-left">
                <p className="footer-links">
                    <a className="link-1" target="_blank" rel="noreferrer" href="https://saikrishna.epizy.com/mysites/">My Sites</a>
                </p>
                <p>Karnati Sai Krishna &copy; 2022</p>
            </div>
        </footer>
    )
}

export default Footer
