"use client";
import { useChat } from "@ai-sdk/react";
import React, { useState, useRef, useEffect } from "react";
import { DefaultChatTransport } from "ai";
import { useTranslations } from "next-intl";
import ImageAnalysis from "./Image-analysis";
import PetAnalysis from "./Analysis-result";
import { ShimmeringText } from "./ui/ShimmeringText";

function AiAnalysis() {
  const t = useTranslations();
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const [symptoms, setSymptoms] = useState("");
  const [riskLevel, setRiskLevel] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [clearedCount, setClearedCount] = useState(0);

  // 1) Normal chat hook -> general conversation (no medical analysis UI)
  const {
    messages: chatMessages,
    sendMessage: sendChatMessage,
    status: chatStatus,
  } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  // 2) Analysis hook -> only used when the user explicitly analyzes
  const {
    messages: analysisMessages,
    sendMessage: sendAnalysisMessage,
    status: analysisStatus,
  } = useChat({
    transport: new DefaultChatTransport({ api: "/api/ai-analysis" }),
    onFinish: () => setShowResults(true),
  });

  const ClearChat = () =>{
    setClearedCount(chatMessages.length);
  }

  const isBusyChat = chatStatus === "submitted" || chatStatus === "streaming";
  const isBusyAnalysis = analysisStatus === "submitted" || analysisStatus === "streaming";

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [chatMessages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() && !(files && files.length)) return; // avoid empty submissions
    // Normal chat should not include files; keep it text-only for clarity
    sendChatMessage({ text: input.trim() });
    setInput("");
    // Do not clear files on normal chat send
  };

  // Messages to display after a clear action
  const visibleMessages = chatMessages.slice(clearedCount);

  // Separate click handler for the Analyze Image button (button onClick expects MouseEvent)
  const handleAnalyzeClick: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    // Clear visible chat by skipping messages up to current length
    setClearedCount(chatMessages.length);
    if (!input.trim() && !(files && files.length)) return; // avoid empty submissions
    // Send to analysis endpoint, which will trigger results view
    sendAnalysisMessage({ text: input.trim(), files });
    setInput("");
    setFiles(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // ✅ reset file input
    }
  };

  const assessSymptoms = () => {
    const highRiskKeywords = [
      "difficulty breathing",
      "severe bleeding",
      "seizures",
      "unable to stand",
      "pale gums",
    ];
    const moderateRiskKeywords = [
      "vomiting",
      "diarrhea",
      "lethargy",
      "loss of appetite",
      "excessive thirst",
    ];

    const lowerSymptoms = symptoms.toLowerCase();

    if (highRiskKeywords.some((keyword) => lowerSymptoms.includes(keyword))) {
      setRiskLevel("high");
    } else if (
      moderateRiskKeywords.some((keyword) => lowerSymptoms.includes(keyword))
    ) {
      setRiskLevel("moderate");
    } else {
      setRiskLevel("call_doctor");
    }
    setShowResults(true);
  };

  const renderResults = () => {
    const latestMessage = analysisMessages
      .filter((m) => m.role === "assistant")
      .slice(-1)[0];
    let analysisData: any = null;

    if (latestMessage) {
      const textPart =
        latestMessage.parts.find((part) => part.type === "text")?.text || "";

      try {
        // Extract JSON if present (handles AI wrapping text with ```json ... ``` or raw JSON)
        const jsonMatch = textPart.match(/```json([\s\S]*?)```/i);
        const jsonString = jsonMatch ? jsonMatch[1].trim() : textPart.trim();

        analysisData = JSON.parse(jsonString);
      } catch (e) {
        // fallback to plain text
        analysisData = { text: textPart };
      }
    }

    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("petAnalysis.resultsTitle")}
        </h2>

        {analysisData && <PetAnalysis analysisData={analysisData} />}
        {/* Symptoms Reported */}
        {symptoms && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">
              {t("petAnalysis.symptomsReported")}
            </h3>
            <p className="text-gray-700">{symptoms}</p>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => {setShowResults(false), ClearChat()}}
          className="mt-6 bg-primary text-primary-foreground rounded-lg px-4 py-2 w-full"
        >
          {t("petAnalysis.back")}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {showResults ? (
          renderResults()
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-8">
              {t("petAnalysis.title")}
            </h1>
            <p className="text-center text-gray-600 mb-8">
              {t("petAnalysis.subtitle")}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Chatbot */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {t("chat.title")}
                </h2>
                <div
                  className="h-96 overflow-y-auto mb-4 border rounded-lg p-4 bg-gray-50"
                  aria-live="polite"
                  aria-busy={isBusyChat}
                >
                  {visibleMessages
                    .filter((m) => m.role !== "system")
                    .map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 ${
                          message.role === "user" ? "text-right" : ""
                        }`}
                      >
                        <div
                          className={`inline-block p-3 rounded-lg max-w-xs md:max-w-md ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-gray-200"
                          }`}
                        >
                          {message.parts.map((part, index) => {
                            if (part.type === "text") {
                              return (
                                <div
                                  key={`${message.id}-${index}`}
                                  className="whitespace-pre-wrap"
                                >
                                  {part.text}
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    ))}
                  {isBusyChat && (
                    
                    <ShimmeringText text={t("thinking")}/>
                  )}
                  {visibleMessages.length === 0 && (
                    <div className="text-gray-500">{t("chat.welcome")}</div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                  <label htmlFor="chat-input" className="sr-only">
                    {t("chat.placeholder")}
                  </label>
                  <input
                    id="chat-input"
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("chat.placeholder")}
                    type="text"
                    disabled={isBusyChat}
                  />
                  <button
                    className={`bg-primary text-primary-foreground rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    type="submit"
                    disabled={isBusyChat || !input.trim()}
                    aria-disabled={isBusyChat || !input.trim()}
                    aria-label={t("send")}
                  >
                    {t("send")}
                  </button>
                </form>
              </div>

              <ImageAnalysis isBusy={isBusyAnalysis} handleAnalyzeClick={handleAnalyzeClick} fileInputRef={fileInputRef} files={files} setFiles={setFiles} symptoms={symptoms} setSymptoms={setSymptoms} assessSymptoms={assessSymptoms}  />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AiAnalysis;

