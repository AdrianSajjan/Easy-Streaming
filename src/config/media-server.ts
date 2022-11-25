export const mediaServerConfig = {
  rtmp: {
    port: process.env.RMTP_PORT ? parseInt(process.env.RMTP_PORT) : 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: process.env.MEDIA_PORT ? parseInt(process.env.MEDIA_PORT) : 8000,
    mediaroot: "./media",
    allow_origin: "*",
  },
  trans: {
    ffmpeg: "E:/Development/Easy-Streaming/Easy-Streaming-API/ffmpeg/bin/ffmpeg.exe",
    tasks: [
      {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
        mp4: true,
        mp4Flags: "[movflags=frag_keyframe+empty_moov]",
      },
    ],
  },
};
