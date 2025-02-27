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
      <h2>Post Your Pitch</h2>

      <input {...register("projectName")} placeholder="Project Name" required />
      <input {...register("fundingRange")} type="number" placeholder="Funding Range ($)" required />

      <select {...register("investmentStage")} required>
        <option value="">Select Investment Stage</option>
        <option value="seed">Seed</option>
        <option value="seriesA">Series A</option>
        <option value="seriesB">Series B</option>
      </select>

      <select {...register("businessType")} required>
        <option value="">Select Business Type</option>
        <option value="b2b">B2B</option>
        <option value="b2c">B2C</option>
        <option value="saas">SaaS</option>
      </select>

      <input {...register("businessField")} placeholder="Business Field (e.g., AI, Medicine)" required />
      <input {...register("location")} placeholder="Location (City, Country)" required />
      <input {...register("website")} type="url" placeholder="Website Link (Optional)" />

      <textarea {...register("description")} placeholder="Brief Project Description" required />

      <input {...register("teamSize")} type="number" placeholder="Team Size" required />

      <label className="checkbox-label">
        <input type="checkbox" {...register("registeredEntity")} />
        Registered Entity
      </label>

      {/* Image Upload */}
      <label className="image-upload">
        Upload Images (Max 5)
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      </label>
      <div className="image-preview">
        {images.map((img, index) => (
          <p key={index}>{img.name}</p>
        ))}
      </div>

      <button type="submit">Submit Pitch</button>
    </form>
  );
}

export default EntrepreneurPitchForm;
