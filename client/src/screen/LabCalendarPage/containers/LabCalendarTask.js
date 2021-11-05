import {useState} from 'react'
import ReactColorPicker from '@super-effective/react-color-picker';

const LabCalendarTask = () =>{
    const [color, setColor] = useState('#3cd6bf');
    const [calendarName, setCalendarName] = useState();

    const onColorChange = (updatedColor) => {
      setColor(updatedColor);
    };
    const onNameChange = (event) =>{
      const {target:{value}} = event;
      setCalendarName(value)
    }
    return(
        <div>
            <form>
                <label for="name">이름</label>
                <input name="name" type="text" onChange={onNameChange}/>
                <label>색상</label>
                <ReactColorPicker color={color} onChange={onColorChange}/>
            </form>
        </div>)
}
export default LabCalendarTask;