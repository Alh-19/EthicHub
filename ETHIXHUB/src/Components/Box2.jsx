import { useEffect, useContext, useState } from "react";
import { DataContext } from "../Data/DataContextProvider";

const Box2 = () => {
    const { loading, error, data } = useContext(DataContext);

    useEffect(() => {
        if (loading) return;
        if (error) {
            console.error(`Error! ${error.message}`);
            return;
        }
    }, [loading, error, data]);

    return (
    <>
    
    </>
    )
}

export default Box2
