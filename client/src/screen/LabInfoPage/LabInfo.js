import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';


import chart from '@toast-ui/editor-plugin-chart';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';

import {useRef, useState, useEffect} from 'react'
import axios from 'axios'
import './styles/markdown.css'
import './styles/LabInfo.css'


const LabInfo = ({lab}) => {
    const text = useRef();
    const [info, setInfo] = useState();
    const [editing, setEditing] = useState(false);

    useEffect(()=>{
        axios.get(`/app/lab/${lab.id}/introduction`)
        .then(response => {
            if(response.data[0]){
                console.log(response)
                const {content} = response.data[0]
                setInfo(content)
            }
        })
    }, [])

    const onSubmit = (event) =>{
        event.preventDefault()

        const editorInstance = text.current.getInstance();
        const content = editorInstance.getMarkdown();
        
        axios.post(`/app/lab/${lab.id}/introduction`, {content:content})
        console.log(content)
        // toggleEditing()
        // window.location.reload()
    }


    const toggleEditing = ()=>{
        setEditing(prev => !prev);
    }

    return(
        <div>
              
            <div id="info-headline">
                <h3 id="info-headline-txt">연구실 소개</h3>
            {!editing && <>
            <button className="info-md-edit" onClick={toggleEditing}>수정</button>
            {info && <Viewer initialValue={info} />}
            </>}
            </div>
            {editing &&<>
            <Editor
                initialValue={info}
                usageStatistics={false}
                plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
                ref={text}
            />
            <div className="info-md-btns">
                <button className="info-md-save" onClick={onSubmit}>저장</button>
                <button className="info-md-cancel" onClick={toggleEditing}>취소</button>
            </div>
            </>
            }
        </div>
    );
}

export default LabInfo;
  
  