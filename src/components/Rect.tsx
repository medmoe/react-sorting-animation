import React from "react";
interface iProps {
    height: number
}

const Rect: React.FC<iProps> = ({height}) => {
    return (
        <div className='rect' style={{height: height}}>

        </div>
    )
}

export default Rect;
