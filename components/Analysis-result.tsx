import React from "react";
import { Stethoscope, AlertTriangle, List, Percent, Heart, Home, Clock } from "lucide-react";
import { useTranslations } from 'next-intl';

interface AnalysisData {
  text?: string;
  condition?: string;
  severity?: string;
  recommendations?: string[];
  confidence?: number; // 0-100
  when_to_seek_vet?: string;
  home_care?: string[];
}

interface PetAnalysisProps {
  analysisData: AnalysisData | null;
}

const getConfidenceColor = (value: number | undefined) => {
  if (value === undefined || value === null) return "bg-gray-300";
  if (value >= 80) return "bg-emerald-500";
  if (value >= 50) return "bg-yellow-400";
  return "bg-rose-500";
};

const AnalysisSection: React.FC<{
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  lastItem?: boolean;
}> = ({ icon, title, content, lastItem = false }) => (
  <div className={`flex items-start gap-4 ${!lastItem ? 'pb-5 border-b border-gray-100' : ''}`}>
    <div className="flex-shrink-0 mt-1">
      {icon}
    </div>
    <div className="flex-1">
      <p className="font-semibold text-gray-800 text-base">{title}</p>
      <div className="mt-1.5 text-gray-700 text-base">
        {content}
      </div>
    </div>
  </div>
);

const PetAnalysis: React.FC<PetAnalysisProps> = ({ analysisData }) => {
  const t = useTranslations();

  if (!analysisData) return null;

  const confidence = analysisData.confidence ?? null;
  const barColor = getConfidenceColor(confidence ?? undefined);

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
        <h3 className="text-2xl font-bold text-gray-800">{t("petAnalysis.aiAnalysis")}</h3>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="p-6">
          {"text" in analysisData && analysisData.text ? (
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">
                {analysisData.text}
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {analysisData.condition && (
                <AnalysisSection
                  icon={<Heart size={18} className="text-blue-600" />}
                  title={t("petAnalysis.condition")}
                  content={<p>{analysisData.condition}</p>}
                />
              )}
              
              {analysisData.when_to_seek_vet && (
                <AnalysisSection
                  icon={<Clock size={18} className="text-amber-500" />}
                  title={t("petAnalysis.whenToSeekVet")}
                  content={<p>{analysisData.when_to_seek_vet}</p>}
                />
              )}
              
              {analysisData.home_care && (
                <AnalysisSection
                  icon={<Home size={18} className="text-green-600" />}
                  title={t("petAnalysis.homeCare")}
                  content={
                    Array.isArray(analysisData.home_care) ? (
                      <ul className="list-disc list-inside space-y-1">
                        {analysisData.home_care.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{analysisData.home_care}</p>
                    )
                  }
                />
              )}
              
              {analysisData.severity && (
                <AnalysisSection
                  icon={<AlertTriangle size={18} className="text-amber-500" />}
                  title={t("petAnalysis.severity")}
                  content={<p>{analysisData.severity}</p>}
                />
              )}
              
              {analysisData.recommendations && (
                <AnalysisSection
                  icon={<List size={18} className="text-indigo-600" />}
                  title={t("petAnalysis.recommendations")}
                  content={
                    Array.isArray(analysisData.recommendations) && analysisData.recommendations.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {analysisData.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">{t("petAnalysis.noRecommendations")}</p>
                    )
                  }
                />
              )}
              
              {confidence !== null && confidence !== undefined && (
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex-shrink-0 mt-1">
                    <Percent size={18} className="text-sky-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-base mb-2.5">{t("petAnalysis.confidence")}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`${barColor} h-3 rounded-full transition-all duration-700 ease-out`}
                          style={{ width: `${confidence}%` }}
                        />
                      </div>
                      <span className="text-gray-700 font-medium text-sm min-w-[44px] text-right">
                        {confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {Object.keys(analysisData).length === 0 && (
            <div className="py-4 text-center">
              <p className="text-gray-500 italic text-base">{t("petAnalysis.noAnalysisInfo")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetAnalysis;