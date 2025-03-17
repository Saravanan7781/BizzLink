import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../Css/Pages/EntrepreneurPitchForm.css";

function EntrepreneurPitchForm() {
  const { register, handleSubmit, watch } = useForm();
  const [images, setImages] = useState([]);

  const onSubmit = (data) => {
    console.log("Pitch Data:", { ...data, images });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (images.length + files.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    setImages([...images, ...files]);
  };

  return (
    <form className="pitch-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="entrePitchHeading">Post Your Pitch</h2>

      <input className="entrePitchFormInputs" {...register("projectName")} placeholder="Project Name" required />
      <input className="entrePitchFormInputs" {...register("fundingRange")} type="number" placeholder="Funding Range ($)" required />

      <select className="entrePitchFormInputs" {...register("investmentStage")} required>
        <option value="">Select Investment Stage</option>
        <option value="seed">Seed</option>
        <option value="seriesA">Series A</option>
        <option value="seriesB">Series B</option>
      </select>

      <select className="entrePitchFormInputs"  {...register("businessType")} required>
        <option value="">Select Business Type</option>
        <option value="b2b">B2B</option>
        <option value="b2c">B2C</option>
        <option value="saas">SaaS</option>
      </select>

      <input className="entrePitchFormInputs" {...register("businessField")} placeholder="Business Field (e.g., AI, Medicine)" required />
      <input className="entrePitchFormInputs" {...register("location")} placeholder="Location (City, Country)" required />
      <input className="entrePitchFormInputs" {...register("website")} type="url" placeholder="Website Link (Optional)" />

      <textarea className="entrePitchFormInputs" {...register("description")} placeholder="Brief Project Description" required />

      <input className="entrePitchFormInputs" {...register("teamSize")} type="number" placeholder="Team Size" required />

      <label className="checkbox-label">Registered Entity
        <input className="checkbox-label-check" type="checkbox" {...register("registeredEntity")} />
      </label>

      {/* Image Upload */}
      <label className="image-upload-entrePitch">
        Upload Images (Max 5)
        <input className="entrePitchFormInputs" type="file" accept="image/*" multiple onChange={handleImageUpload} />
      </label>
      <div className="image-preview-entrePitch">
        {images.map((img, index) => (
          <p key={index}>{img.name}</p>
        ))}
      </div>

      <button type="submit" className="entrePitchButton">Submit Pitch</button>
    </form>
  );
}

export default EntrepreneurPitchForm;
