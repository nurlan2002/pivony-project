import React, { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import "./PhotoUploadWidget.css";
import { uploadPhoto } from "./firebase";
import { setLoading } from "./redux/App/app.actions";
import { connect } from "react-redux";

function PhotoUploadWidget({ setFiles, files, SetLoading }) {
    const [cropper, setCropper] = useState();

    useEffect(() => {
        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    async function onCrop(e) {
        e.preventDefault();
        if (cropper) {
            SetLoading(true);
            const dataURI = cropper.getCroppedCanvas().toDataURL("image/jpeg");
            const blob = await (await fetch(dataURI)).blob();
            await uploadPhoto(blob);
            setFiles([]);
            SetLoading(false);
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
                                <button className="btn btn--purple btn--mini" onClick={(e) => onCrop(e)}><i className="fa fa-check" aria-hidden="true"></i></button>
                                <button className="btn btn--purple btn--mini btn--inverted" onClick={() => setFiles([])}><i className="fa fa-times" aria-hidden="true"></i></button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        SetLoading: (l) => dispatch(setLoading(l))
    };
};

export default connect(null, mapDispatchToProps)(PhotoUploadWidget);
