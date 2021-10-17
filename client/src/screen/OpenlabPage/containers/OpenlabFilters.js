import OpenlabSearch from 'screen/OpenlabPage/components/OpenlabSearch'
import OpenlabFilter from 'screen/OpenlabPage/components/OpenlabFilter'
const OpenlabFilters = () =>{
    return(
        <div className="openlab-filters-container"
            style={{
                'position': 'absolute',
                'width': '850px',
                'height': '100px',
                'left': '50%',
                'transform': 'translate(-50%)',
                'top': '220px',
            }}
        >
            <OpenlabSearch/>
            <OpenlabFilter/>
        </div>
    )
}
export default OpenlabFilters;