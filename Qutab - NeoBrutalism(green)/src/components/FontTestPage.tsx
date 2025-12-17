import React from 'react';

export default function FontTestPage() {
  const fonts = [
    { name: 'Annyeong', cssVar: '--font-annyeong', fontFamily: "'Annyeong', sans-serif" },
    { name: 'Busan Garden', cssVar: '--font-busan-garden', fontFamily: "'Busan Garden', sans-serif" },
    { name: 'Gangnam', cssVar: '--font-gangnam', fontFamily: "'Gangnam', sans-serif" },
    { name: 'Hangeul Notes', cssVar: '--font-hangeul-notes', fontFamily: "'Hangeul Notes', sans-serif" },
  ];

  const testTexts = {
    korean: {
      heading: '구르반 타나 바타스',
      subheading: '이슬람 희생제',
      body: '지역 농부를 강화하면서 신성한 의무를 수행하세요. 이번 이들 아드하에 전국과 팔레스타인에 선을 전파하는 데 함께하세요.',
      short: '선한 일을 전파하세요',
    },
    english: {
      heading: 'Qurban Tanpa Batas',
      subheading: 'Idul Adha 1445H',
      body: 'Empowering local farmers while fulfilling your sacred duty. Join us in spreading goodness across the archipelago and to Palestine this Idul Adha.',
      short: 'Spread goodness',
    },
    mixed: {
      heading: 'Qurban Tanpa Batas / 구르반 타나 바타스',
      subheading: 'Idul Adha 1445H / 이들 아드하',
      body: 'Empowering local farmers / 지역 농부를 강화하면서',
      short: 'Goodness / 선',
    },
  };

  return (
    <div className="min-h-screen bg-[#fffbef] py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center border-b-4 border-black pb-6">
          <h1 className="text-6xl font-black text-black mb-4 uppercase tracking-tighter">
            Font Test Page
          </h1>
          <p className="text-xl font-medium text-black">
            Testing all custom Korean fonts for different typography use cases
          </p>
        </div>

        {/* Font Comparison Grid */}
        {fonts.map((font, index) => (
          <div key={font.name} className="mb-20 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000000] p-8">
            <div className="mb-6 pb-4 border-b-4 border-black">
              <h2 className="text-4xl font-black text-black uppercase" style={{ fontFamily: font.fontFamily }}>
                {font.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                CSS Variable: <code className="bg-gray-100 px-2 py-1 rounded">{font.cssVar}</code>
              </p>
            </div>

            {/* Typography Scale */}
            <div>
              {/* H1 - Large Heading */}
              <div className="mb-20">
                <label className="text-xs font-bold text-gray-500 uppercase mb-4 block">H1 - Large Heading</label>
                <h1 
                  className="text-6xl lg:text-8xl font-black leading-none tracking-tighter uppercase"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.korean.heading}
                </h1>
                <h1 
                  className="text-6xl lg:text-8xl font-black leading-none tracking-tighter uppercase mt-2"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.english.heading}
                </h1>
              </div>

              {/* H2 - Section Heading */}
              <div className="mb-20">
                <label className="text-xs font-bold text-gray-500 uppercase mb-4 block">H2 - Section Heading</label>
                <h2 
                  className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.korean.subheading}
                </h2>
                <h2 
                  className="text-4xl md:text-5xl font-black uppercase tracking-tighter"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.english.subheading}
                </h2>
              </div>

              {/* H3 - Subsection Heading */}
              <div className="mb-20">
                <label className="text-xs font-bold text-gray-500 uppercase mb-4 block">H3 - Subsection Heading</label>
                <h3 
                  className="text-3xl font-black uppercase tracking-tighter mb-2"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.korean.short}
                </h3>
                <h3 
                  className="text-3xl font-black uppercase tracking-tighter"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.english.short}
                </h3>
              </div>

              {/* Body Text */}
              <div className="mb-20">
                <label className="text-xs font-bold text-gray-500 uppercase mb-4 block">Body Text - Paragraph</label>
                <p 
                  className="text-lg leading-relaxed mb-4"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.korean.body}
                </p>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.english.body}
                </p>
              </div>

              {/* Small Text */}
              <div className="mb-20">
                <label className="text-xs font-bold text-gray-500 uppercase mb-4 block">Small Text</label>
                <p 
                  className="text-sm leading-relaxed mb-2"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.korean.short}
                </p>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.english.short}
                </p>
              </div>

              {/* Button Text */}
              <div className="mb-20">
                <label className="text-xs font-bold text-gray-500 uppercase mb-4 block">Button Text</label>
                <button 
                  className="px-8 py-4 bg-[#cecd34] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] uppercase font-bold"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.korean.short}
                </button>
                <button 
                  className="ml-4 px-8 py-4 bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] uppercase font-bold"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.english.short}
                </button>
              </div>

              {/* Mixed Language */}
              <div className="mb-20">
                <label className="text-xs font-bold text-gray-500 uppercase mb-4 block">Mixed Language (Korean + English)</label>
                <h2 
                  className="text-3xl font-black uppercase tracking-tighter mb-4"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.mixed.heading}
                </h2>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.mixed.body}
                </p>
              </div>

              {/* Character Set Test */}
              <div className="mb-20">
                <label className="text-xs font-bold text-gray-500 uppercase mb-4 block">Character Set Test</label>
                <div className="bg-gray-50 p-4 border-2 border-black">
                  <p className="text-2xl mb-2" style={{ fontFamily: font.fontFamily }}>
                    가나다라마바사아자차카타파하
                  </p>
                  <p className="text-2xl mb-2" style={{ fontFamily: font.fontFamily }}>
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  </p>
                  <p className="text-2xl mb-2" style={{ fontFamily: font.fontFamily }}>
                    abcdefghijklmnopqrstuvwxyz
                  </p>
                  <p className="text-2xl mb-2" style={{ fontFamily: font.fontFamily }}>
                    0123456789 !@#$%^&*()
                  </p>
                  <p className="text-2xl" style={{ fontFamily: font.fontFamily }}>
                    가나다 ABC 123
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Comparison Section */}
        <div className="mt-20 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000000] p-8">
          <h2 className="text-4xl font-black text-black uppercase mb-8 border-b-4 border-black pb-4">
            Side-by-Side Comparison
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fonts.map((font) => (
              <div key={font.name} className="border-2 border-black p-4">
                <h3 className="text-sm font-bold text-gray-600 mb-4 uppercase">{font.name}</h3>
                <h2 
                  className="text-2xl font-black uppercase mb-2"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.korean.heading}
                </h2>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {testTexts.korean.body.substring(0, 50)}...
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="mt-20 mb-8 bg-[#cecd34] border-4 border-black shadow-[8px_8px_0px_0px_#000000] p-8">
          <h2 className="text-4xl font-black text-black uppercase mb-6">
            Visual Assessment Notes
          </h2>
          <div className="bg-white border-2 border-black p-6">
            <p className="text-black font-medium mb-4">
              <strong>Instructions:</strong> Review each font above and note which works best for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-black">
              <li>Large headings (H1) - Bold, impactful statements</li>
              <li>Section headings (H2) - Clear hierarchy</li>
              <li>Body text - Readability and comfort</li>
              <li>Button text - Clarity and impact</li>
              <li>Mixed language - Korean + English compatibility</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

