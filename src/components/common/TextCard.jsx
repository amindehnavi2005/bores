import React from 'react'

export const TextCard = ({ startColor, endColor, title, subtitle }) => {
    return (
        <div className={`bg-gradient-to-t  from-${startColor} to-${endColor} p-6 rounded-lg shadow-md`}>
            <h3 className="text-xl font-semibold text-black mb-4">{title}</h3>
            <p className="text-black text-sm sm:text-base">{subtitle}</p>
        </div>
    )
}
