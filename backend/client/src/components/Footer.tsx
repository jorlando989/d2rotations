import { FC } from 'react';
import './styles/component.css';

const Footer: FC = () => {
    return (
        <div className='footer bg-dark display-in-row'>
            <span>Developed by jorlando989</span>
            <a href="https://github.com/jorlando989/d2rotations"><i className="fa-brands fa-github footerIcon"></i></a>
        </div>
    );
};

export default Footer;