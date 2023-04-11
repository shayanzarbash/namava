/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'

const GoToTop = () => {

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div>
            <a href="#" className="scroll-to-top rounded" style={{ display: "inline" }} onClick={scrollTop}>TOP</a>
        </div>
    )
}

export default GoToTop;
