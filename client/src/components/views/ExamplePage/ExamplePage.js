import { useEffect } from "react";
import axios from 'axios';

function ExamplePage() {
    useEffect(() => {
        axios.get('/test').then((response) => console.log(response.data));
    }, []);

    return <div> example here </div>
}

export default ExamplePage;