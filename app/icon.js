import { ImageResponse } from 'next/og'

// 图标尺寸
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// 图标生成 - 圆形印章风格
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f0e8',
          borderRadius: '50%',
        }}
      >
        {/* 圆形印章 */}
        <div
          style={{
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#c8383f',
            borderRadius: '50%',
            boxShadow: '1px 1px 2px rgba(0,0,0,0.2)',
          }}
        >
          {/* 印章文字 */}
          <span
            style={{
              color: '#f5f0e8',
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: 'serif',
              lineHeight: 1,
            }}
          >
            
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
