import React from "react";
import { useTranslations } from "next-intl";
import AITextLoading from "./ui/ai-text-loading";
import Image from "next/image";

function ImageAnalysis({
  handleAnalyzeClick,
  fileInputRef,
  files,
  setFiles,
  isBusy,
}: {
    handleAnalyzeClick: React.MouseEventHandler<HTMLButtonElement>;
    fileInputRef: React.RefObject<HTMLInputElement | null>; 
    files: FileList | undefined;
    setFiles: React.Dispatch<React.SetStateAction<FileList | undefined>>;
    symptoms: string;
    setSymptoms: React.Dispatch<React.SetStateAction<string>>;
    assessSymptoms: () => void;
    isBusy: boolean;
}) {
  const t = useTranslations();
  const [isDragging, setIsDragging] = React.useState(false);
  // Preview URLs for the selected images
  const [previews, setPreviews] = React.useState<string[]>([]);

  // Generate and cleanup object URLs when files change
  React.useEffect(() => {
    if (!files || files.length === 0) {
      setPreviews([]);
      return;
    }
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [files]);

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
        <div className="bg-card rounded-lg shadow-lg p-6">
          <h2 className="text-xl text-secondary font-semibold mb-4">{t("image_analysis")}</h2>
          <div className="mb-6">
            <label className="block text-text mb-2 font-medium">
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
                className="w-10 h-10 text-text mb-2"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 7.5L12 3m0 0L7.5 7.5M12 3v13.5"
                />
              </svg>
              <p className="text-sm text-text">
                <span className="font-medium text-primary">{t("choose_file")}</span>
                <span className="mx-1">{t("or")}</span>
                <span className="font-medium">{t("drag_drop_here")}</span>
              </p>
              <p className="text-xs text-text mt-1">PNG, JPG, JPEG • {t("multiple")}</p>

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
            <div className="flex items-center justify-between text-sm text-text mb-4">
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

            {/* Previews */}
            {previews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {previews.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative w-full aspect-video overflow-hidden rounded-md border"
                  >
                    <Image
                      width={500}
                      height={500}
                      loading="eager"
                      src={src}
                      alt={`preview-${idx}`}
                      className="w-full h-full object-cover"
                    />
                    {files && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-text text-[10px] px-1 py-0.5 truncate">
                        {Array.from(files)[idx]?.name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
              
            {isBusy ? <div><AITextLoading className="text-primary/70"/></div> : <button
              onClick={handleAnalyzeClick}
              className="bg-primary text-primary-foreground rounded-lg px-4 py-2 w-full"
              disabled={isBusy}
              >
              {t("analyze_image")}
            </button>}
          </div>
        </div>


      </div>
    </div>
  );
}

export default ImageAnalysis;
