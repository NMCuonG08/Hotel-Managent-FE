import  { useRef, useState } from 'react';
import { addHotelImages, addRoomImages } from "../../utils/APIFunctions"

const DragAndDropImage = ({ hotelId, roomId }) => {
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    

    function selectFiles() {
        fileInputRef.current.click();
    }

    function onFileSelect(e) {
        const files = e.target.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.split('/')[0] !== 'image') continue; 
            if (!images.some((img) => img.name === file.name)) {
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: file.name,
                        url: URL.createObjectURL(file),
                        file:file
                    },
                ]);
            }
        }
    }
    
    function deleteImage(index) {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }

    function onDragOver(e) {
        e.preventDefault();
        setIsDragging(true);
        e.dataTransfer.dropEffect = 'copy';
    }

    function onDragLeave(e) {
        e.preventDefault();
        setIsDragging(false);
    }

    function onDrop(e) {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.split('/')[0] !== 'image') continue; 
            if (!images.some((img) => img.name === file.name)) {
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: file.name,
                        url: URL.createObjectURL(file),
                        file:file
                    },
                ]);
            }
        }
    }

    const handleAddImage = async (e) => {
        e.preventDefault()
        try {
           if(hotelId != null) {
            const success = await addHotelImages(hotelId, images);
           }
           else if (roomId != null) {
                const success = await addRoomImages(roomId, images);
           }
            
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    return (
        <div className='card'>
            <div className='top'>
                <p> Add more images by Drag and Drop Image Uploading</p>
            </div>
            <div
                className={`drag-area ${isDragging ? 'dragging' : ''}`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                {isDragging ? (
                    <span className='select'> Drop Image here</span>
                ) : (
                    <>
                        Drag and drop here or{' '}
                        <span className='select' role='button' onClick={selectFiles}>
                            Browse
                        </span>
                    </>
                )}
                <input type='file' name='file' className='file' multiple ref={fileInputRef} onChange={onFileSelect} style={{ display: 'none' }} />
            </div>
            <div className='container'>
                {images.map((image, index) => (
                    <div className='image' key={index}>
                        <span className='delete' onClick={() => deleteImage(index)}>
                            &times;
                        </span>
                        <img src={image.url} name={image.name} />
                    </div>
                ))}
            </div>
            <button type='submit' onClick={handleAddImage} >Upload</button>
        </div>
    );
};

export default DragAndDropImage;
