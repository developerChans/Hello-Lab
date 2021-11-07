
import { render } from "react-dom";

import TUICalendar from '@toast-ui/react-calendar';
import { ISchedule, ICalendarInfo } from "tui-calendar";

import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import 'screen/LabCalendarPage/styles/LabCalendarPage.css'

import React, { useState, useCallback, useRef } from 'react'

import LabCalendarTask from "./containers/LabCalendarTask";

const start = new Date();
const end = new Date(new Date().setHours(start.getHours() + 1));

const schedules = [
  {
    calendarId: "1",
    category: "time",
    isVisible: true,
    title: "Study",
    id: "1",
    body: "Test",
    start,
    end
  },
  {
    calendarId: "2",
    category: "time",
    isVisible: true,
    title: "yes",
    id: "2",
    body: "something",
    start,
    end
  }
];

const calendars = [
  {
    id: "1",
    name: "My Calendar",
    color: "#83c36a",
    bgColor: "#83c36a",
    dragBgColor: "#83c36a",
    borderColor: "#83c36a"
  },
  {
    id: "2",
    name: "Company",
    color: "#00a9ff",
    bgColor: "#00a9ff",
    dragBgColor: "#00a9ff",
    borderColor: "#00a9ff"
  }
];

function LabCalendarPage({lab}) {

    const [taskAdd, setTaskAdd] = useState(false)

    const onTaskAddClick = () =>{
        setTaskAdd(true)
        console.log(taskAdd)
    }


    const calendarRef = useRef();

    const calendarInstance = calendarRef.current;
    console.log(calendarInstance);

    const onClickSchedule = useCallback(e => {
        console.log(e);
      }, []);
    
      const onBeforeCreateSchedule = useCallback(scheduleData => {
        console.log(scheduleData);
    
      const schedule = {
        id: String(Math.random()),
        title: scheduleData.title,
        isAllDay: scheduleData.isAllDay,
        start: scheduleData.start,
        end: scheduleData.end,
        category: scheduleData.isAllDay ? "allday" : "time",
        dueDateClass: "",
        location: scheduleData.location,
        raw: {
          class: scheduleData.raw["class"]
        },
        state: scheduleData.state
      };
    
        calendarRef.current.calendarInst.createSchedules([schedule]);
      }, []);
    
      const onBeforeDeleteSchedule = useCallback(res => {
        console.log(res);
    
        const { id, calendarId } = res.schedule;
    
        calendarRef.current.calendarInst.deleteSchedule(id, calendarId);
      }, []);
    
      const onBeforeUpdateSchedule = useCallback(e => {
        console.log(e);
    
        const { schedule, changes } = e;
    
        calendarRef.current.calendarInst.updateSchedule(
          schedule.id,
          schedule.calendarId,
          changes
        );
      }, []);
    
      function _getFormattedTime(time) {
        const date = new Date(time);
        const h = date.getHours();
        const m = date.getMinutes();
    
        return `${h}:${m}`;
      }
    
      function _getTimeTemplate(schedule, isAllDay) {
        var html = [];
    
        if (!isAllDay) {
          html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
        }
        if (schedule.isPrivate) {
          html.push('<span class="calendar-font-icon ic-lock-b"></span>');
          html.push(" Private");
        } else {
          if (schedule.isReadOnly) {
            html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
          } else if (schedule.recurrenceRule) {
            html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
          } else if (schedule.attendees.length) {
            html.push('<span class="calendar-font-icon ic-user-b"></span>');
          } else if (schedule.location) {
            html.push('<span class="calendar-font-icon ic-location-b"></span>');
          }
          html.push(" " + schedule.title);
        }
    
        return html.join("");
      }
    
      const templates = {
        time: function(schedule) {
          console.log(schedule);
          return _getTimeTemplate(schedule, false);
        }
      };


    return (
        <div>
            <div className="lab-calendar-headline">
                <h3 className="lab-calendar-headline-txt">연구실 일정</h3>
            </div>
            <div className="lab-calendar-container">
                <TUICalendar
                ref={calendarRef}
                usageStatistics={false}
                view="month"
                useCreationPopup={true}
                useDetailPopup={true}
                template={templates}
                calendars={calendars}
                schedules={schedules}
                onClickSchedule={onClickSchedule}
                onBeforeCreateSchedule={onBeforeCreateSchedule}
                onBeforeDeleteSchedule={onBeforeDeleteSchedule}
                onBeforeUpdateSchedule={onBeforeUpdateSchedule}    
                />
                <div className="task-add-container">
                    <button onClick={onTaskAddClick}>일정 추가</button>
                    <div>{taskAdd && <LabCalendarTask/>} </div>
                </div>
            </div>
        </div>
    );
}

export default LabCalendarPage;
