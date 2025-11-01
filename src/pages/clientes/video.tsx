import ApiyamCardLayout from './components/ApiyamLayout';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';

const SecureVideoPlayer = ({ videoId }: { videoId: string }) => {
    const [secureUrl, setSecureUrl] = useState<string | null>(null);
  
    useEffect(() => {
      // 🔒 Aquí pedirías al backend (Supabase Edge Function, etc.)
      // una URL firmada temporal para este videoId
      /*const fetchSignedUrl = async () => {
        const res = await fetch(`/api/get-secure-video?id=${videoId}`);
        const data = await res.json();
        setSecureUrl(data.url);
      };
      fetchSignedUrl();*/
    }, [videoId]);
  
    return (
      <div
        onContextMenu={(e) => e.preventDefault()} // 🚫 bloquea botón derecho
        style={{
          position: "relative",
          maxWidth: "900px",
          margin: "0 auto",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
        }}
      >
        <ReactPlayer
        
          src={"https://peru-hippopotamus-889756.hostingersite.com/uploads/510_video.mp4"}
          controls
          width="100%"
          height="100%"
          playing={false}
          
        />
        {/* Botón full screen */}
        {screenfull.isEnabled && (
          <button
            onClick={() => screenfull.request(document.querySelector(".react-player") as Element)}
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              padding: "10px",
              cursor: "pointer"
            }}
          >
            ⛶
          </button>
        )}
      </div>
    );
  }

export default function VideoPage() {
    return (
        <ApiyamCardLayout title="Burlesqa - Video">
            <SecureVideoPlayer videoId="510" />
        </ApiyamCardLayout>
    );
}

