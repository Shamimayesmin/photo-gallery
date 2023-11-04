/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SingleImage from "./SingleImage";
import FilterButtons from "./FilterButtons";
import imageData from "../../data";
import DragAndDrop from "./DragAndDrop";
import SampleOne from "./SampleOne";
import SampleTwo from "./SampleTwo";

const ImageGallery = () => {
	const [images, setImages] = useState(imageData);
	const [selectedImages, setSelectedImages] = useState([]);
	const [isDrag, setIsDrag] = useState(false);
	const [dragImage, setDragImage] = useState(null);
	const [draggedImageIndex, setDraggedImageIndex] = useState(null);
	const [draggedIndex, setDraggedIndex] = useState(null);
	const [draggedImage, setDraggedImage] = useState(null);
	const handleImageSelect = (imageId) => {
		// Toggle the selected state of an image
		setSelectedImages((prevSelectedImages) => {
			if (prevSelectedImages.includes(imageId)) {
				return prevSelectedImages.filter((id) => id !== imageId);
			} else {
				return [...prevSelectedImages, imageId];
			}
		});
	};

	const deleteSelectedImages = () => {
		const remainingImages = images.filter(
			(image) => !selectedImages.includes(image.id)
		);
		setImages(remainingImages);
		setSelectedImages([]); // Clear selected images after deletion
	};

	const handleFileChange = (e) => {
		const selectedFiles = e.target.files;
		console.log("Selected files:", selectedFiles);

		const newImages = Array.from(selectedFiles).map((file, index) => {
			const id = images.length + index + 1;
			const photo = URL.createObjectURL(file);
			console.log("Created URL for file:", photo);

			return { id, photo };
		});

		console.log("New images:", images, newImages);
		setImages([...images, ...newImages]);
		// setImageFiles([]);
	};

	// const handleDragStart = (img) => {
	// 	setIsDrag(true);
	// 	setDragImage(img);
	// };

	const handleDragOver = (e) => {
		e.preventDefault();

		if (e.target && e.target.children[0] && e.target.children[0].alt) {
			setDraggedImageIndex(e.target.children[0].alt);
		}
	};

	

	// const handleDrop = (selectedIndex) => {
	// 	console.log("Before drop - dragImage:", dragImage);
	// 	console.log("Before drop - images:", images);
	// 	setIsDrag(false);

	// 	if (dragImage && dragImage.id) {
	// 		const updatedImages = images.map((image, index) => {
	// 			if (index === selectedIndex) {
	// 				return { ...dragImage };
	// 			} else {
	// 				return { ...image };
	// 			}
	// 		});

	// 		console.log("After drop - updatedImages:", updatedImages);
	// 		setImages(updatedImages);
	// 		setIsDrag(null);
	// 	}

	// 	console.log("After drop - images:", images);
	// };

	const handleDragStart = (e, index) => {
		setDraggedIndex(index);
	};

	const handleDragEnd = () => {
		setDraggedIndex(null);
	};

	const handleDrop = (targetIndex) => {
		if (draggedIndex === null || targetIndex === draggedIndex) return;

		const newImages = [...images];
		const [draggedImage] = newImages.splice(draggedIndex, 1);
		newImages.splice(targetIndex, 0, draggedImage);

		setImages(newImages);
	};
	return (
		<>
			<FilterButtons
				// handleReorderImages={handleReorderImages}
				selectedImages={selectedImages}
				deleteSelectedImages={deleteSelectedImages}
			/>

			<div
				className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 m-8"
				onDragOver={handleDragOver}
			>
				{images.map((item, index) => (
					<SingleImage
						key={item.id}
						item={item}
						selectedImages={selectedImages}
						index={index}
						handleImageSelect={handleImageSelect}
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}
						isDragging={index === draggedIndex}
						onDrop={() => handleDrop(index)}
					></SingleImage>
				))}

				{/* last section */}
				<DragAndDrop handleFileChange={handleFileChange} />
			</div>
		</>
	);
};

export default ImageGallery;
