import React from 'react'
import { BadgePlus } from 'lucide-react'
import { useNavigate,useLocation } from 'react-router-dom'

function EntrePostCreation() {
    const navigate = useNavigate();
    const params = useLocation().pathname;
    const handleClick = () => {
        navigate('/pitch');
    }

    return (
        <>
            {
                (params !== '/pitch') ?
                    (
                        <div className="entrePostCreationContainer" onClick={handleClick}>
                            <BadgePlus />
                        </div>
                    ) : <></>
            }
        </>
    )
}


    export default EntrePostCreation;