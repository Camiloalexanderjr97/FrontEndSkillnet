import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className='outer'>
            <div className='inner d-flex flex-column justify-content-center'>
                <img src="/img/404.svg" alt="" height="200vw"/>
                <button className="mt-4 btn btn-primary" onClick={() => navigate(-1)}>
                    Regresar
                </button>
            </div>
        </div>
    )
}

export default NotFound;
