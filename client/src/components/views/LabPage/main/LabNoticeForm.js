
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const LabNoticeForm = () =>{
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const onTitleChange = (event)=>{
        const {target:{value}} = event;
        setTitle(value);
    }
    const onContentChange = (event, editor) =>{
        const data = editor.getData();
        setContent(data);
    }
    return(
        <div className="form-wrapper">
            <input className="title-input" 
            type="text" 
            placeholder="제목"
            onChange={onTitleChange}
            />
            <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor)=>onContentChange(event, editor)}
            />
        </div>)
}

export default LabNoticeForm;