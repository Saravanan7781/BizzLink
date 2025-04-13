import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import "../../Css/Pages/EntrepreneurPitchForm.css";
import axios from "axios";
import Cookies from "js-cookie"; 
import { useAuth } from "../../Store/AuthContext";

function EntrepreneurPitchForm() {
  const { register, handleSubmit } = useForm();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth(); 
  const { url } = useAuth();
  
  const onSubmit = async (data) => {
  try {
    setLoading(true);

    const formData = new FormData();
    
    formData.append("user_id", userData.id);
    formData.append("post_title", data.projectName);
    formData.append("post_desc", data.description);
    formData.append("funding_range", data.fundingRange);
    formData.append("investment_stage", data.investmentStage);
    formData.append("business_type", data.businessType);
    formData.append("business_field", data.businessField);
    formData.append("location", data.location);
    formData.append("website_link", data.website || "");
    formData.append("team_size", data.teamSize);
    formData.append("registered_entity", data.registeredEntity);
    // console.log(images)
    images.forEach((image) => {
      formData.append("images", image); // must match `upload.array('images')`
      // console.log();
    });

    const res = await axios.post(`${url}/api/posts/createPost`, formData, {
    headers: {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${Cookies.get("user")}`,
  },
});


    formData.forEach((value, key) => {
  console.log(`Formdata ${key}:`, value);
});
    alert("Pitch submitted successfully!");
    // setImages([]);
  } catch (err) {
    console.error(err);
    alert("Error submitting pitch!");
  } finally {
    setLoading(false);
  }
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
    <div className="entrePitchFormContainer">
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

        <select className="entrePitchFormInputs" {...register("businessType")} required>
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

        <label className="image-upload-entrePitch">
          Upload Images (Max 5)
          <input
            className="entrePitchFormInputs"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </label>

        <div className="image-preview-entrePitch">
          {images.map((img, index) => (
            <p key={index}>{img.name}</p>
          ))}
        </div>

        <button type="submit" className="entrePitchButton" disabled={loading}>
          {loading ? "Submitting..." : "Submit Pitch"}
        </button>
      </form>
    </div>
  );
} 

export default EntrepreneurPitchForm;
