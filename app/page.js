'use client';

import { useState, useEffect } from 'react';

// 将 hex 颜色转换为 rgba
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// 调整颜色亮度
function adjustBrightness(hex, percent) {
  const r = Math.min(255, Math.max(0, parseInt(hex.slice(1, 3), 16) + percent));
  const g = Math.min(255, Math.max(0, parseInt(hex.slice(3, 5), 16) + percent));
  const b = Math.min(255, Math.max(0, parseInt(hex.slice(5, 7), 16) + percent));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default function Home() {
  const [colorData, setColorData] = useState({ name: '槿紫', hex: '#806d9e' });
  const [poetryData, setPoetryData] = useState({
    title: '鹧鸪天',
    author: '苏轼',
    content: '殷勤昨夜三更雨，又得浮生一日凉'
  });

  useEffect(() => {
    // 加载颜色数据并随机选择一个
    fetch('/color.json')
      .then(res => res.json())
      .then(colors => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const selectedColor = colors[randomIndex];
        setColorData({
          name: selectedColor.name,
          hex: selectedColor.hex
        });
      })
      .catch(err => console.error('Failed to load colors:', err));

    // 加载诗词数据并随机选择一个
    fetch('/shici.json')
      .then(res => res.json())
      .then(poems => {
        const randomIndex = Math.floor(Math.random() * poems.length);
        const selectedPoem = poems[randomIndex];
        setPoetryData({
          title: selectedPoem.origin.title,
          author: selectedPoem.origin.author,
          content: selectedPoem.content
        });
      })
      .catch(err => console.error('Failed to load poems:', err));
  }, []);

  // 根据主色调生成波浪颜色
  const waveColors = {
    wave5: hexToRgba(adjustBrightness(colorData.hex, 60), 0.5),
    wave4: hexToRgba(adjustBrightness(colorData.hex, 40), 0.6),
    wave3: hexToRgba(adjustBrightness(colorData.hex, 20), 0.7),
    wave2: hexToRgba(adjustBrightness(colorData.hex, 0), 0.8),
    wave1: hexToRgba(adjustBrightness(colorData.hex, -20), 0.9),
  };

  return (
    <div className="relative max-h-screen overflow-hidden" style={{ backgroundColor: 'rgb(230, 230, 230)' }}>
      {/* 动态波浪背景层 - 使用SVG */}
      <div className="absolute inset-0 flex flex-col justify-end overflow-hidden" style={{ bottom: '-20px' }}>
        {/* 波浪层5 - 最远最浅 */}
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ height: '85%', width: '120%', minWidth: '1600px' }} viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            className="wave-path wave-path-5"
            fill={waveColors.wave5}
            d="M0,192 C180,140 360,220 540,180 C720,140 900,200 1080,160 C1260,120 1350,180 1440,160 L1440,320 L0,320 Z"
          />
        </svg>
        
        {/* 波浪层4 */}
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ height: '75%', width: '120%', minWidth: '1600px' }} viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            className="wave-path wave-path-4"
            fill={waveColors.wave4}
            d="M0,160 C120,200 240,140 420,180 C600,220 780,160 960,200 C1140,240 1320,180 1440,200 L1440,320 L0,320 Z"
          />
        </svg>
        
        {/* 波浪层3 */}
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ height: '65%', width: '120%', minWidth: '1600px' }} viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            className="wave-path wave-path-3"
            fill={waveColors.wave3}
            d="M0,200 C200,160 400,240 600,200 C800,160 1000,220 1200,180 C1320,160 1380,200 1440,180 L1440,320 L0,320 Z"
          />
        </svg>
        
        {/* 波浪层2 */}
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ height: '55%', width: '120%', minWidth: '1600px' }} viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            className="wave-path wave-path-2"
            fill={waveColors.wave2}
            d="M0,180 C150,220 300,160 500,200 C700,240 900,180 1100,220 C1250,250 1350,200 1440,220 L1440,320 L0,320 Z"
          />
        </svg>
        
        {/* 波浪层1 - 最近最深 */}
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ height: '45%', width: '120%', minWidth: '1600px' }} viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            className="wave-path wave-path-1"
            fill={waveColors.wave1}
            d="M0,220 C180,260 360,200 540,240 C720,280 900,220 1080,260 C1200,290 1320,250 1440,270 L1440,320 L0,320 Z"
          />
        </svg>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 flex min-h-screen">
        {/* 诗词内容区域 - 居中 */}
        <div className="flex-1 flex items-center justify-center p-8">
          {(() => {
            const sentences = poetryData.content.split(/[，。、；！？]/).filter(s => s.trim());
            const maxLength = Math.max(...sentences.map(s => s.length), 1);
            // 根据最长句子的字数动态调整字体大小，基准是7个字
            const fontScale = Math.min(1, 7 / maxLength);
            // 根据列数调整，基准是2列
            const columnScale = Math.min(1, 3 / (sentences.length + 1));
            const scale = Math.min(fontScale, columnScale);
            
            // 计算题目+作者的总字数（包括书名号），基准是10个字
            const titleLength = poetryData.title.length + 2 + poetryData.author.length + 1; // 「」+ 作者 + 间距
            const titleScale = Math.min(1, 10 / titleLength);
            
            return (
              <div 
                className="flex gap-2 md:gap-1 font-kai text-[#4a4458] tracking-widest"
                style={{ fontSize: `calc((2rem + 1.5vw) * ${scale})` }}
              >
                {/* 第一列 - 题目和作者 */}
                <div className="flex flex-col items-center" style={{ fontSize: `calc(0.7em * ${titleScale})` }}>
                  <p className="writing-vertical">「{poetryData.title}」</p>
                  <div className="mt-4 p-1 pt-1.5 bg-[#c8383f] text-white flex items-center justify-center font-bold rounded-sm shadow-lg" style={{ fontSize: '0.7em' }}>
                    <span className="writing-vertical">{poetryData.author}</span>
                  </div>
                </div>
                {/* 诗句内容 */}
                {sentences.map((sentence, index) => (
                  <p key={index} className="writing-vertical leading-relaxed">{sentence}</p>
                ))}
              </div>
            );
          })()}
        </div>

        {/* 右侧标题 - 贴着右上角 */}
        <div className="absolute top-0 right-0 items-start justify-center font-kai tracking-wider" style={{ fontSize: `calc((100px + 5vw) * ${2 / Math.max(2, colorData.name.length)})`, color: 'rgba(0, 0, 0, 0.15)' }}>
          <p className="writing-vertical">{colorData.name}</p>
        </div>
      </div>
    </div>
  );
}
