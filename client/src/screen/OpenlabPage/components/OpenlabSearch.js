import 'screen/OpenlabPage/styles/OpenlabSearch.css'
import {BiSearch} from 'react-icons/bi'
const OpenlabSearch = () =>{
    return(
        <div className="openlab-search">
            검색
            <form>
                <input type="text"/>
                <button className="openlab-search-submit" type="submit">
                    <BiSearch color="#525252" style={{
                        'position': 'relative',
                        'top': '-4px'
                    }}/>
                </button>
            </form>
        </div>
    )
}

export default OpenlabSearch;