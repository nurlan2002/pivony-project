import React, { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import "./PhotoUploadWidget.css";
import { uploadPhoto } from "./firebase";

function PhotoUploadWidget({ setFiles, files }) {
    const [cropper, setCropper] = useState();

    useEffect(() => {
        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const uploadPhotoToStorage = async (file) => {
        await uploadPhoto(file);
        setFiles([]);
    };

    async function onCrop(e) {
        e.preventDefault();
        if (cropper) {
            const dataURI = cropper.getCroppedCanvas().toDataURL("image/jpeg");
            const blob = await (await fetch(dataURI)).blob();
            uploadPhotoToStorage(blob);
        }
    }

    return (
        <div className="stackable-grid-wrapper">
            <div className="stackable-grid-three">
                <div className="column-of-three">
                    <h3 className="heading-tertiary">STEP 1 - ADD PHOTO</h3>
                    <PhotoWidgetDropzone setFiles={setFiles} />
                </div>
                <div className="column-of-three">
                    <h3 className="heading-tertiary">STEP 2 - RESIZE IMAGE</h3>
                    {files && files.length > 0 && (
                        <PhotoWidgetCropper
                            setCropper={setCropper}
                            imagePreview={files[0].preview}
                        />
                    )}
                </div>
                <div className="column-of-three">
                    <h3 className="heading-tertiary">
                        STEP 3 - PREVIEW & UPLOAD
                    </h3>
                    {files && files.length > 0 && (
                        <>
                            <div
                                className="img-preview"
                                style={{ minHeight: 200, overflow: "hidden" }}
                            />
                            <div style={{marginTop: "2rem"}}>
                                <button class="btn btn--purple btn--mini" onClick={(e) => onCrop(e)}><i class="fa fa-check" aria-hidden="true"></i></button>
                                <button class="btn btn--purple btn--mini btn--inverted" onClick={() => setFiles([])}><i class="fa fa-times" aria-hidden="true"></i></button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PhotoUploadWidget;
