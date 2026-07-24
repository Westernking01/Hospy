"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, Loader2, FileImage } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  onRemove: () => void;
  defaultImage?: string;
  folder?: string;
}

export function FileUpload({ onUploadComplete, onRemove, defaultImage, folder = "general" }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const supabase = createClient();

  const handleFile = async (file: File) => {
    setError(null);

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    setIsUploading(true);
    
    // Optimistic Preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("public-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("public-images")
        .getPublicUrl(data.path);

      onUploadComplete(publicUrl);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image.");
      setPreview(defaultImage || null); // Revert on failure
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full space-y-2">
      {error && (
        <div className="text-xs font-medium text-red-500 bg-red-500/10 p-2 rounded-md border border-red-500/20">
          {error}
        </div>
      )}

      {preview ? (
        <div className="relative w-full h-44 rounded-lg border border-border overflow-hidden bg-muted/40 group">
          <img src={preview} alt="Preview" className="w-full h-full object-cover transition-opacity duration-300" />
          
          {isUploading && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
              <span className="text-xs font-medium text-foreground">Uploading...</span>
            </div>
          )}

          {!isUploading && (
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center duration-200">
              <button
                type="button"
                onClick={handleRemove}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors flex items-center justify-center gap-1.5 px-3"
              >
                <X className="w-4 h-4" />
                <span className="text-xs font-medium">Remove Image</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            w-full h-44 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors duration-200
            ${isDragging ? "border-primary bg-primary/5" : "border-border bg-muted/20 hover:bg-muted/40"}
          `}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFile(e.target.files[0]);
              }
            }}
          />
          <div className="flex flex-col items-center justify-center space-y-3 text-muted-foreground">
            <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center shadow-sm">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-medium text-foreground">
                <span className="text-primary hover:underline">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs">SVG, PNG, JPG or GIF (max. 5MB)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
