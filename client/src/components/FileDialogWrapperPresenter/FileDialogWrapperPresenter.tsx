import React, { FC, useRef } from 'react';

interface FileDialogWrapperPresenterProps {
    onFileSelected: (file: File) => void,
    accept: string,
}

const FileDialogWrapperPresenter: FC<FileDialogWrapperPresenterProps> = (props) => {
    const inputFile = useRef<HTMLInputElement>(null);

    const handleOnClick = () => {
        inputFile.current?.click();
    }

    const handleOnFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        if (target.files == null) return;
        let file = target.files[0];
        props.onFileSelected(file);
    }

    return (
        <div onClick={handleOnClick}>
            { props.children }
            <input 
                type='file' 
                id='file'
                accept={props.accept}
                ref={inputFile}
                onChange={(e) => handleOnFileSelect(e)} 
                style={{display: 'none'}}/>
        </div>
    )
}

export default FileDialogWrapperPresenter;