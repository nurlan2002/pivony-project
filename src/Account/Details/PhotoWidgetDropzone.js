import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function PhotoWidgetDropzone({setFiles}) {
    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        textAlign: 'center',
        height: 200,
        outline: "none"
    }

    const dzActive = {
        borderColor: 'green'
    }

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, [setFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles} >
            <input {...getInputProps()} />  
            <i className="fa fa-upload fa-4x" aria-hidden="true"></i>
            <h2 style={{marginTop: "2rem"}}>Drop image here</h2>
        </div>
    )
}

export default PhotoWidgetDropzone
