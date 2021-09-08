import axios from 'axios'
import { actionCreators } from "_actions/lab_action";
import {connect} from 'react-redux';

const MyPageLab = ({data, replaceLab, lab}) =>{

    const onDashboardHandler = (section) => {
        
        // 실제 동작 시 lab 페이지로 정보 넘겨줘야 함
        // lab 페이지는 정보 받아서 해당 lab 페이지 출력해야 함
        axios
        .get(`/app/lab/${section.id}`)
        .then((response) => {
            console.log(response)
            const {name, pname, id} = response.data[0]
            const newLab = {
                name: name, 
                pname:pname, 
                id:id,
                category: "main",
                tab: "info"
            };
            replaceLab(newLab);
            window.location.href=`/lab/${id}`;
        });
    }


    return (
    <>
    {lab && lab.map((section) => (
    <li key={section.id}>
        <div type="button" onClick={() => onDashboardHandler(section)} className="dashboard_card">
            <img className="lab_img" src={section.imgPath}/>
            <p className="lab_name">{section.name} 연구실</p>
            <p className="prof">{section.pname} 교수</p>
        </div>
    </li>  
    ))}
    </>);
}

const mapStateToProps = (state)=>{
    return{data: state}
}
const mapDispatchToProps = (dispatch) =>{
    return {
      replaceLab: (lab) => dispatch(actionCreators.replaceLab(lab))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps) (MyPageLab);
  