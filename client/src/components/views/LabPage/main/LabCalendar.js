import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
 
// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import './style/calendar.css'

function LabCalendar() {
    return (
        <div>
            <Calendar
            usageStatistics={false}
            view="month"
            useCreationPopup={true}
            useDetailPopup={true}
            />

        </div>
    );
}

export default LabCalendar;
