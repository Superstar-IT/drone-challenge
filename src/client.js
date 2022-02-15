import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


function App() {
    const [file, setFile] = useState('');
    const [instruction, setInstruction] = useState('');
    const [count, setCount] = useState(0);
    const [error, setError] = useState('');
    const [progress, setProgess] = useState(0);
    const fileInput = useRef();

    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0];
        setFile(file);
    }

    const uploadFile = () => {
        const formData = new FormData();
        formData.append('file', file); // appending file
        axios.post('http://localhost:4001/instruction', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(res => {
            setInstruction(res.data.instruction)
            setCount(res.data.billBoards)
            setError('')
        }).catch(err => setError(err.response.data.msg));
    }

    return (
        <div>
            <div>
                <input type="file" ref={fileInput} onChange={handleChange} />
                <div className="progessBar" style={{ width: progress }}>
                   {progress}
                </div>
                <button onClick={uploadFile}>
                   Upload
                </button>
            <hr />
            </div>
            <div>
                <p>BillBoards Counts Part 1: {count}</p>
                <p>BillBoards Counts Part 2: {count}</p>
                { error && <p>Error: {error}</p> }
            </div>
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('app'));
