import "./HomePage.css";
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

export function HomePage() {
    const user = useSelector(state => state.session.user);

        return (
            <>
                <div className="background">
                    
                </div>
            </>
        )
}
