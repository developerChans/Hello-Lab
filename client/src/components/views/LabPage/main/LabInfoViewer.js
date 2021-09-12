import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

const LabInfoViewer = ({info}) =>{
  return (
  <>
    <Viewer
      initialValue={info}
    />
  </>
  );
}

export default LabInfoViewer;