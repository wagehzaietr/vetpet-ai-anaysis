"use client";
import { useChat } from "@ai-sdk/react";
import React, { useState, useRef } from "react";
import { DefaultChatTransport } from "ai";
import Image from "next/image";
import { useTranslations } from "next-intl";

function AiAnalysis() {
  const t = useTranslations();
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const [symptoms, setSymptoms] = useState("");
  const [riskLevel, setRiskLevel] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ai-analysis",
    }),
    onFinish: () => setShowResults(true),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input, files });
    setInput("");
    setFiles(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const assessSymptoms = () => {
    const highRiskKeywords = ["difficulty breathing", "severe bleeding", "seizures", "unable to stand", "pale gums"];
    const moderateRiskKeywords = ["vomiting", "diarrhea", "lethargy", "loss of appetite", "excessive thirst"];
    
    const lowerSymptoms = symptoms.toLowerCase();
    
    if (highRiskKeywords.some(keyword => lowerSymptoms.includes(keyword))) {
      setRiskLevel("high");
    } else if (moderateRiskKeywords.some(keyword => lowerSymptoms.includes(keyword))) {
      setRiskLevel("moderate");
    } else {
      setRiskLevel("call_doctor");
    }
    setShowResults(true);
  };

  const getRiskColor = () => {
    switch (riskLevel) {
      case "high": return "bg-red-100 border-red-500 text-red-700";
      case "moderate": return "bg-yellow-100 border-yellow-500 text-yellow-700";
      case "call_doctor": return "bg-blue-100 border-blue-500 text-blue-700";
      default: return "bg-gray-100 border-gray-500";
    }
  };

  const renderResults = () => {
    const latestMessage = messages.filter(m => m.role === 'assistant').slice(-1)[0];
    
    // Attempt to parse the message as JSON
    let formattedJson = null;
    let isJson = false;
    if (latestMessage) {
      try {
        const textPart = latestMessage.parts.find(part => part.type === 'text')?.text;
        if (textPart) {
          formattedJson = JSON.stringify(JSON.parse(textPart), null, 2);
          isJson = true;
        }
      } catch (e) {
        // Not valid JSON, fall back to text
      }
    }

    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('petAnalysis.resultsTitle')}</h2>
        
        {/* Summary Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{t('petAnalysis.summary')}</h3>
          <div className={`p-4 border-l-4 rounded ${getRiskColor()}`}>
            <h4 className="font-bold mb-2">
              {riskLevel === 'high' && t('high_risk')}
              {riskLevel === 'moderate' && t('moderate_risk')}
              {riskLevel === 'call_doctor' && t('call_doctor')}
            </h4>
            <p className="text-sm">
              {riskLevel === 'high' && t('high_risk_advice')}
              {riskLevel === 'moderate' && t('moderate_risk_advice')}
              {riskLevel === 'call_doctor' && t('call_doctor_advice')}
            </p>
          </div>
        </div>

        {/* AI Analysis Details */}
        {latestMessage && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{t('petAnalysis.aiAnalysis')}</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {isJson && formattedJson ? (
                <pre className="text-sm font-mono bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                  {formattedJson}
                </pre>
              ) : (
                latestMessage.parts.map((part, index) => (
                  part.type === 'text' && (
                    <p key={`${latestMessage.id}-${index}`} className="text-gray-700 whitespace-pre-wrap">
                      {part.text}
                    </p>
                  )
                ))
              )}
            </div>
          </div>
        )}

        {/* Symptoms Reported */}
        {symptoms && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{t('petAnalysis.symptomsReported')}</h3>
            <p className="text-gray-700">{symptoms}</p>
          </div>
        )}

        {/* Recommendations */}
        <div>
          <h3 className="text-xl font-semibold mb-4">{t('petAnalysis.recommendations')}</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li>{t('petAnalysis.recommendation1')}</li>
            <li>{t('petAnalysis.recommendation2')}</li>
            <li>{t('petAnalysis.recommendation3')}</li>
          </ul>
        </div>

        {/* Back Button */}
        <button
          onClick={() => setShowResults(false)}
          className="mt-6 bg-primary text-primary-foreground rounded-lg px-4 py-2 w-full"
        >
          {t('petAnalysis.back')}
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
            <h1 className="text-3xl font-bold text-center mb-8">{t('petAnalysis.title')}</h1>
            <p className="text-center text-gray-600 mb-8">{t('petAnalysis.subtitle')}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Chatbot */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">{t('chat.title')}</h2>
                <div className="h-96 overflow-y-auto mb-4 border rounded-lg p-4 bg-gray-50">
                  {messages.filter(m => m.role !== 'system').map((message) => (
                    <div key={message.id} className={`mb-4 ${message.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-3 rounded-lg max-w-xs md:max-w-md ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-gray-200'}`}>
                        {message.parts.map((part, index) => {
                          if (part.type === 'text') {
                            return <div key={`${message.id}-${index}`} className="whitespace-pre-wrap">{part.text}</div>;
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  ))}
                  {(status === 'submitted' || status === 'streaming') && (
                    <div className="text-gray-500">{t('thinking')}</div>
                  )}
                  {messages.length === 0 && (
                    <div className="text-gray-500">{t('chat.welcome')}</div>
                  )}
                </div>
                
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('chat.placeholder')}
                    type="text"
                  />
                  <button className="bg-primary text-primary-foreground rounded-lg px-4 py-2" type="submit">
                    {t('send')}
                  </button>
                </form>
              </div>
              
              {/* Right Column - Analysis */}
              <div className="space-y-8">
                {/* Image Analysis */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">{t('image_analysis')}</h2>
                  <div className="mb-6">
                    <label className="block mb-2 font-medium">{t('upload_medical_image')}</label>
                    <div className="flex items-center gap-3 mb-4">
                      <label className="bg-primary text-primary-foreground px-4 py-2 rounded-lg cursor-pointer">
                        {t('choose_file')}
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => e.target.files && setFiles(e.target.files)}
                          multiple
                          ref={fileInputRef}
                          accept="image/*"
                        />
                      </label>
                      <span>{files?.length ? `${files.length} ${t('files_selected')}` : t('no_file_selected')}</span>
                    </div>
                    <button 
                      onClick={handleSubmit}
                      className="bg-primary text-primary-foreground rounded-lg px-4 py-2 w-full"
                    >
                      {t('analyze_image')}
                    </button>
                  </div>
                </div>
                
                {/* Symptoms Risk Assessment */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">{t('symptoms_risk_assessment')}</h2>
                  <div className="mb-4">
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 mb-3"
                      rows={3}
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      placeholder={t('describe_symptoms')}
                    />
                    <button 
                      onClick={assessSymptoms}
                      className="bg-primary text-primary-foreground rounded-lg px-4 py-2 w-full"
                    >
                      {t('assess_risk')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AiAnalysis;