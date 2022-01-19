import React from 'react';

import Nav from '../Nav'
import Footer from '../Footer'

import './index.css';

import icon_chat from '../img/icon-chat.png'
import icon_money from '../img/icon-money.png'
import icon_security from '../img/icon-security.png'


class Home extends React.Component {  
    
    render() {
        return (
            <div className="App">
                <Nav />
                <main>
                    <div className="hero">
                        <section className="hero-content">
                            <h2 className="sr-only">Promoted Content</h2>
                            <p className="subtitle">No fees.</p>
                            <p className="subtitle">No minimum deposit.</p>
                            <p className="subtitle">High interest rates.</p>
                            <p className="text">Open a savings account with Argent Bank today!</p>
                        </section>
                    </div>
                    <section className="features">
                        <h2 className="sr-only">Features</h2>
                        <div className="feature-item">
                            <img src={icon_chat} alt="Chat Icon" className="feature-icon" />
                            <h3 className="feature-item-title">You are our #1 priority</h3>
                            <p>
                                Need to talk to a representative? You can get in touch through our
                                24/7 chat or through a phone call in less than 5 minutes.
                            </p>
                        </div>
                        <div className="feature-item">
                            <img
                                src={icon_money}
                                alt="Chat Icon"
                                className="feature-icon"
                            />
                            <h3 className="feature-item-title">More savings means higher rates</h3>
                            <p>
                                The more you save with us, the higher your interest rate will be!
                            </p>
                        </div>
                        <div className="feature-item">
                            <img
                                src={icon_security}
                                alt="Chat Icon"
                                className="feature-icon"
                            />
                            <h3 className="feature-item-title">Security you can trust</h3>
                            <p>
                                We use top of the line encryption to make sure your data and money
                                is always safe.
                            </p>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        )};
}

export default Home;
