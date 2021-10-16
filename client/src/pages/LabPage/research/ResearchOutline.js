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

import './style/markdown.css'

export default function() {
    const text = useRef();
    const [outline, setOutline] = useState();
    const [editing, setEditing] = useState(false);

    const onSubmit = () =>{
        const editorInstance = text.current.getInstance();
        const content = editorInstance.getMarkdown();
        // content 데이터 보내기
        setEditing(prev => !prev);
    }
    const toggleEditing = ()=>{
        setEditing(prev => !prev);
    }

    useEffect(()=>{
        // outline 데이터 불러오기
        setOutline("어쩌고")
        console.log(outline);
    }, [])
    
    return(
        <div>
            {editing? <>
            <Editor
                initialValue="불러온 Outline 데이터"
                usageStatistics={false}
                plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
                ref={text}
            />
            <button className="md-save" onClick={onSubmit}>저장</button></>:
            <><button className="md-edit" onClick={toggleEditing}>수정</button>
            <Viewer
              initialValue="{outline}"
      	    />
            </>}
        </div>
    );
}