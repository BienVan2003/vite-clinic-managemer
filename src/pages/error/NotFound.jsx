import { useEffect, useState } from 'react';
import './NotFound.css';

const NotFound = () => {
    const [digits, setDigits] = useState({
        firstDigit: 0,
        secondDigit: 0,
        thirdDigit: 0,
    });
    const [i, setI] = useState(0);

    useEffect(() => {
        const randomNum = () => Math.floor(Math.random() * 9) + 1;

        const updateDigit = (digit, value) => setDigits((prevDigits) => ({ ...prevDigits, [digit]: value }));

        const startLoop = (digit, limit, selector) => {
            return setInterval(() => {
                if (i > limit) {
                    clearInterval(selector);
                    updateDigit(digit, digit === 'firstDigit' || digit === 'thirdDigit' ? 4 : 0);
                } else {
                    updateDigit(digit, randomNum());
                    setI((prevI) => prevI + 1);
                }
            }, 30);
        };

        const loop3 = startLoop('thirdDigit', 40);
        const loop2 = startLoop('secondDigit', 80);
        const loop1 = startLoop('firstDigit', 100);

        // Clear intervals when component unmounts
        return () => {
            clearInterval(loop1);
            clearInterval(loop2);
            clearInterval(loop3);
        };
    }, [i]);

    return (
        <div className="error">
            <div className="container-floud">
                <div className="col-xs-12 ground-color text-center">
                    <div className="container-error-404">
                        <div className="clip">
                            <div className="shadow">
                                <span className={`digit thirdDigit`}>{digits.thirdDigit}</span>
                            </div>
                        </div>
                        <div className="clip">
                            <div className="shadow">
                                <span className={`digit secondDigit`}>{digits.secondDigit}</span>
                            </div>
                        </div>
                        <div className="clip">
                            <div className="shadow">
                                <span className={`digit firstDigit`}>{digits.firstDigit}</span>
                            </div>
                        </div>
                        <div className="msg">
                            OH!<span className="triangle"></span>
                        </div>
                    </div>
                    <h2 className="h1">Sorry! Page not found</h2>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
