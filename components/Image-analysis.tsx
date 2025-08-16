import React from "react";
import { useTranslations } from "next-intl";

function ImageAnalysis({
  handleAnalyzeClick,
  fileInputRef,
  files,
  setFiles,
}: {
    handleAnalyzeClick: React.MouseEventHandler<HTMLButtonElement>;
    fileInputRef: React.RefObject<HTMLInputElement | null>; 
    files: FileList | undefined;
    setFiles: React.Dispatch<React.SetStateAction<FileList | undefined>>;
    symptoms: string;
    setSymptoms: React.Dispatch<React.SetStateAction<string>>;
    assessSymptoms: () => void;
}) {
  const t = useTranslations();
  const [isDragging, setIsDragging] = React.useState(false);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      // Replace existing files with dropped ones (keeps current props contract)
      setFiles(e.dataTransfer.files as FileList);
      e.dataTransfer.clearData();
    }
  };
  return (
    <div>
      <div className="space-y-8">
        {/* Image Analysis */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{t("image_analysis")}</h2>
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              {t("upload_medical_image")}
            </label>

            {/* Dropzone */}
            <div
              className={`relative flex flex-col items-center justify-center w-full rounded-lg border-2 transition-colors p-6 text-center mb-3 cursor-pointer select-none
              ${isDragging ? "border-primary bg-primary/5" : "border-dashed border-gray-300 hover:border-primary"}`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              aria-label={t("upload_medical_image")}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-gray-400 mb-2"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 7.5L12 3m0 0L7.5 7.5M12 3v13.5"
                />
              </svg>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-primary">{t("choose_file")}</span>
                <span className="mx-1">{t("or")}</span>
                <span className="font-medium">Drag & drop images here</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG • {t("multiple")}</p>

              {/* Hidden input to keep native selection */}
              <input
                type="file"
                className="hidden"
                onChange={(e) => e.target.files && setFiles(e.target.files)}
                multiple
                ref={fileInputRef}
                accept="image/*"
              />
            </div>

            {/* File status */}
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>
                {files?.length
                  ? `${files.length} ${t("files_selected")}`
                  : t("no_file_selected")}
              </span>
              {files?.length ? (
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => {
                    // Clear via ref if available; otherwise just reset state
                    if (fileInputRef.current) fileInputRef.current.value = "";
                    setFiles(undefined);
                  }}
                >
                  {t("clear")}
                </button>
              ) : null}
            </div>

            <button
              onClick={handleAnalyzeClick}
              className="bg-primary text-primary-foreground rounded-lg px-4 py-2 w-full"
            >
              {t("analyze_image")}
            </button>
          </div>
        </div>


      </div>
    </div>
  );
}

export default ImageAnalysis;
