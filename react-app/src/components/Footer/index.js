import React from "react";
import './footer.css';



function Footer () {

    return (
        <div className="footer-container">
            <div className="footer-wrapper">
                <div className="footer-content">
                    <h1 className="footer-title">Meet The Developers</h1>
                    <div className="developers-container">
                        <div className="developer-content">
                            <div className="developers-github">
                                <a href='https://github.com/chauchau000' target='_blank'>
                                <i className="fa-brands fa-github fa-xl"></i>
					            </a>
                            </div>
                            <div className="developers-name">Adrienne Tran</div>
                        </div>
                        <div className="developer-content">
                            <div className="developers-github">
                                <a href='https://github.com/yassin30000' target='_blank'>
                                    <i className="fa-brands fa-github fa-xl"></i>
                                </a>
                            </div>
                            <div className="developers-name">Yassin Tantawy</div>
                        </div>
                        <div className="developer-content">
                            <div className="developers-github">
                                <a href='https://github.com/Korozami' target='_blank'>
                                    <i className="fa-brands fa-github fa-xl"></i>
                                </a>
                            </div>
                            <div className="developers-name">Kevin Sy</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
