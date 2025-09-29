

import React, { useState } from 'react';

const videoIds = [
    "dQw4w9WgXcQ", "A8n4kQ3QkP8", "yCjL-0D5-9U", "d2Wq-z6T1rQ", "v_v2F7-Jd7s",
    "TzB4f3rM-q0", "yCjL-0D5-9U", "d2Wq-z6T1rQ", "v_v2F7-Jd7s", "TzB4f3rM-q0"
];

const VideoItem: React.FC<{ videoId: string }> = ({ videoId }) => {
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    const handleVideoClick = (e: React.MouseEvent) => {
        // Prevent toggling sound if the mute button itself was clicked
        if ((e.target as HTMLElement).closest('button')) {
            return;
        }
        toggleMute();
    };

    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&modestbranding=1&showinfo=0&rel=0`;

    return (
        <div 
            className="relative flex-shrink-0 w-[200px] bg-stone-100 rounded-lg overflow-hidden shadow-md cursor-pointer group/video"
            onClick={handleVideoClick}
        >
            <div className="w-full" style={{ paddingTop: '177.77%' }}> {/* 9:16 aspect ratio */}
                <iframe
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    src={videoSrc}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <button
                onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 hover:bg-opacity-75 transition-opacity"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
                <i className={`fas ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}></i>
            </button>
        </div>
    );
};


const VideoReviews: React.FC = () => {
    return (
        <section id="video-reviews-section" className="mt-16 md:mt-24">
            <h3 className="text-3xl font-bold text-amber-900 mb-6 text-center animate-on-scroll">
                Customer Video Reviews
            </h3>
            <div className="marquee-container relative overflow-hidden">
                 <div 
                    className="marquee-videos flex gap-4 py-4"
                >
                    {[...videoIds, ...videoIds].map((id, index) => (
                       <VideoItem key={index} videoId={id} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoReviews;