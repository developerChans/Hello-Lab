const MyPageLab = () =>{

    const [lab, setLab] = useState();


    useEffect(()=>{
        axios.get('/app/mypage')
        .then(response=>{
            const {id, name, pname} = response.data[0];
            setLab({
                id, name, pname
            })
        })
    }, [])
    
    return (
    <div>

    </div>);
}

export default MyPageLab;