'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Image as ImageIcon, Film } from 'lucide-react';

const VideoWishes = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState('/Snapchat-811123980.mp4');
  const [mediaType, setMediaType] = useState('video'); // 'video' or 'image'
  const [showControls, setShowControls] = useState(true);

  // All media files (videos and images) from public folder
  const mediaFiles = [
    { name: 'Snapchat-811123980', type: 'video', path: '/Snapchat-811123980.mp4', icon: '🎬' },
  ];

  const videoFormats = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
  const imageFormats = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const selectMedia = (media) => {
    setSelectedMedia(media.path);
    setMediaType(media.type);
    setCurrentTime(0);
    setIsPlaying(false);
    
    // Reset video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const getMediaName = (path) => {
    return path.split('/').pop().replace(/\.[^/.]+$/, '');
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || mediaType !== 'video') return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [mediaType]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-4 md:p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 overflow-y-auto">
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.5); }
          50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.8); }
        }
        .media-container { animation: pulse-glow 3s ease-in-out infinite; }
        .media-thumbnail {
          transition: all 0.3s ease;
        }
        .media-thumbnail:hover {
          transform: scale(1.05);
        }
        .media-thumbnail.active {
          ring: 3px rgb(236, 72, 153);
          transform: scale(1.05);
        }
      `}</style>

      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent mb-2">
            📸 Gallery & Videos
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Click to select and play photos and videos with sound
          </p>
        </div>

        {/* Media Player */}
        <div className="media-container rounded-2xl overflow-hidden bg-black shadow-2xl mb-6 flex items-center justify-center min-h-64 md:min-h-96">
          {mediaType === 'video' ? (
            <video
              ref={videoRef}
              src={selectedMedia}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-auto max-h-96 md:max-h-full"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            />
          ) : (
            <img
              src={selectedMedia}
              alt="Birthday memory"
              className="w-full h-auto max-h-96 md:max-h-full object-contain"
            />
          )}
        </div>

        {/* Media Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 space-y-4">
          {/* Progress Bar - Only for Video */}
          {mediaType === 'video' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-600 min-w-10">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                className="flex-1 h-2 bg-gradient-to-r from-pink-300 to-rose-300 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(244 114 156) 0%, rgb(244 114 156) ${
                    (currentTime / duration) * 100
                  }%, rgb(243 232 255) ${(currentTime / duration) * 100}%, rgb(243 232 255) 100%)`
                }}
              />
              <span className="text-xs font-semibold text-gray-600 min-w-10">
                {formatTime(duration)}
              </span>
            </div>
          )}

          {/* Main Controls */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* Play/Pause Button - Only for Video */}
            {mediaType === 'video' && (
              <button
                onClick={togglePlayPause}
                className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg transform hover:scale-110 transition-all"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause size={24} fill="white" />
                ) : (
                  <Play size={24} fill="white" />
                )}
              </button>
            )}

            {/* Reset Button - Only for Video */}
            {mediaType === 'video' && (
              <button
                onClick={handleReset}
                className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-lg transform hover:scale-105 transition-all"
                title="Reset video"
              >
                <RotateCcw size={20} />
              </button>
            )}

            {/* Volume Control - Only for Video */}
            {mediaType === 'video' && (
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                <button
                  onClick={toggleMute}
                  className="text-gray-700 hover:text-pink-500 transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}

            {/* Media Type Badge */}
            <div className="flex items-center gap-1 bg-purple-100 rounded-full px-3 py-2 text-purple-700 font-semibold text-sm">
              {mediaType === 'video' ? (
                <>
                  <Film size={16} /> Video
                </>
              ) : (
                <>
                  <ImageIcon size={16} /> Photo
                </>
              )}
            </div>
          </div>
        </div>

        {/* Media Gallery */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="font-bold text-pink-700 mb-4 flex items-center gap-2">
            <span className="text-xl">📂</span> Your Photos & Videos ({mediaFiles.length})
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mediaFiles.map((media) => (
              <button
                key={media.path}
                onClick={() => selectMedia(media)}
                className={`relative group rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
                  selectedMedia === media.path
                    ? 'ring-4 ring-pink-500 scale-105'
                    : 'hover:shadow-lg'
                }`}
              >
                {/* Thumbnail */}
                <div className="w-full h-24 sm:h-28 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center relative overflow-hidden">
                  {media.type === 'video' ? (
                    <>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <Film size={32} className="text-white z-10" />
                    </>
                  ) : (
                    <>
                      <img
                        src={media.path}
                        alt={media.name}
                        className="w-full h-full object-cover"
                      />
                    </>
                  )}
                </div>

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  {media.type === 'video' && (
                    <Play size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity fill-white" />
                  )}
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs font-semibold truncate">
                    {media.name}
                  </p>
                </div>

                {/* Selected Badge */}
                {selectedMedia === media.path && (
                  <div className="absolute top-1 right-1 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>

          {mediaFiles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No media files found in the public folder.</p>
              <p className="text-xs mt-2">Add .mp4, .jpg, .png files to the public folder to display them here.</p>
            </div>
          )}
        </div>

        {/* Info Message */}
        <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl p-6 border border-pink-300 text-center mb-6">
          <h3 className="font-bold text-pink-700 mb-2 flex items-center justify-center gap-2">
            <span className="text-xl">💡</span> How to Add More Media
          </h3>
          <ul className="text-gray-700 text-sm space-y-1">
            <li>📁 Add photos/videos to the <code className="bg-white px-1 rounded">public</code> folder</li>
            <li>📹 Supported: MP4, WebM, JPG, PNG, GIF, and more</li>
            <li>🎵 Videos play with full audio/sound support</li>
            <li>⚡ Files automatically appear in the gallery</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoWishes;
