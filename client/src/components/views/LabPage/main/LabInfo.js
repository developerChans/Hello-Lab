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
import './style/markdown.css'


const LabInfo = ({data}) => {
    const text = useRef();
    const [info, setInfo] = useState();
    const [editing, setEditing] = useState(false);
    const [load, setLoad] = useState(false)

    useEffect(()=>{
        axios.get(`/app/lab/${data.lab.id}/introduction`)
        .then(response => {
            if(response.data[0]){
                console.log(response)
                const {content} = response.data[0]
                setInfo(content)
            }
        })
    }, [])

    const onSubmit = () =>{
        const editorInstance = text.current.getInstance();
        const content = editorInstance.getMarkdown();
        console.log(content)
        axios.post(`/app/lab/${data.lab.id}/introduction`, {content:content})

        setEditing(prev => !prev);
        window.location.reload()
    }
    const toggleEditing = ()=>{
        setEditing(prev => !prev);
    }

    return(
        <div>
            {editing? <>
            <Editor
                initialValue={info}
                usageStatistics={false}
                plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
                ref={text}
            />
            <button className="md-save" onClick={onSubmit}>저장</button></>:
            <>
            <button className="md-edit" onClick={toggleEditing}>수정</button>
            {info && <Viewer initialValue={info} />}
            </>}
        </div>
    );
}

export default LabInfo;
  
  