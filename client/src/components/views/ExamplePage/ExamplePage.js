import { useEffect } from "react";
import axios from 'axios';
<<<<<<< HEAD
import MenuBar from '../MenuBar/MenuBar';

function ExamplePage() {
    return (
        <MenuBar/>
    );
=======

function ExamplePage() {
    useEffect(() => {
        axios.get('/test').then((response) => console.log(response.data));
    }, []);

    return <div> example here </div>
>>>>>>> 52ded8f6f785539dafa16c51431d72dd6ca4fe4d
}

export default ExamplePage;