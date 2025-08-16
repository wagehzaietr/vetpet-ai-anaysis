import React from "react";
import { Stethoscope, AlertTriangle, List, Percent } from "lucide-react";
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

const PetAnalysis: React.FC<PetAnalysisProps> = ({ analysisData }) => {
    const t = useTranslations()
  if (!analysisData) return null;

  const confidence = analysisData.confidence ?? null;
  const barColor = getConfidenceColor(confidence ?? undefined);

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
        {t("petAnalysis.aiAnalysis")}
      </h3>

      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        {"text" in analysisData && analysisData.text ? (
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">
            {analysisData.text}
          </p>
        ) : (
          <div className="space-y-6">
            {analysisData.condition && (
              <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                <div className="flex-shrink-0">
                  <Stethoscope size={18} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold text-gray-800 text-base">{t("petAnalysis.condition")}</p>
                  </div>
                  <p className="text-gray-700 mt-1 text-base">{analysisData.condition}</p>
                </div>
              </div>
            )}
            {analysisData.when_to_seek_vet && (
              <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                <div className="flex-shrink-0">
                  <Stethoscope size={18} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold text-gray-800 text-base">{t("petAnalysis.whenToSeekVet")}</p>
                  </div>
                  <p className="text-gray-700 mt-1 text-base">{analysisData.when_to_seek_vet}</p>
                </div>
              </div>
            )}
            {analysisData.home_care && (
              <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                <div className="flex-shrink-0">
                  <Stethoscope size={18} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold text-gray-800 text-base">{t("petAnalysis.homeCare")}</p>
                  </div>
                  <p className="text-gray-700 mt-1 text-base">{analysisData.home_care}</p>
                </div>
              </div>
            )}

            {analysisData.severity && (
              <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                <div className="flex-shrink-0">
                  <AlertTriangle size={18} className="text-amber-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold text-gray-800 text-base">{t("petAnalysis.severity")}</p>
                  </div>
                  <p className="text-gray-700 mt-1 text-base">{analysisData.severity}</p>
                </div>
              </div>
            )}

            {analysisData.recommendations && (
              <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                <div className="flex-shrink-0">
                  <List size={18} className="text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-base">{t("petAnalysis.recommendations")}</p>
                  {Array.isArray(analysisData.recommendations) && analysisData.recommendations.length > 0 ? (
                    <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                      {analysisData.recommendations.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic mt-2">{t("petAnalysis.noRecommendations")}</p>
                  )}
                </div>
              </div>
            )}

            {confidence !== null && confidence !== undefined && (
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Percent size={18} className="text-sky-600" />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-base mb-2">{t("petAnalysis.confidence")}</p>

                  <div className="flex items-center gap-3">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`${barColor} h-3 rounded-full transition-all duration-500 ease-out`}
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
          <p className="text-gray-500 italic text-base mt-3">{t("petAnalysis.noAnalysisInfo")}</p>
        )}
      </div>
    </div>
  );
};

export default PetAnalysis;