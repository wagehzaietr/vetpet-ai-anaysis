import React from 'react'
import { useTranslations } from 'next-intl';

function HelpSection() {
    const t = useTranslations()
  return (
    <div className='min-h-screen pt-[7rem] max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-8'>
            {t("petAnalysis.title")}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {t("petAnalysis.subtitle")}
          </p>
    </div>
  )
}

export default HelpSection