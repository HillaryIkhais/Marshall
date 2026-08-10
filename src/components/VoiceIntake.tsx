import { useState, useCallback, useRef } from "react";
import { Mic, MicOff } from "lucide-react";
import { supabase } from "../lib/supabase";

const waveformDelays = Array.from({ length: 24 }, () => Math.random() * 1.5);

const SAMPLE_TRANSCRIPT = `My name is Michael Vance. I'm calling about my claim denial for the spinal fusion surgery performed on March 15th, 2026. Health Shield PPO denied it as "Not Medically Necessary" and "Out of Network." But my surgeon, Dr. Elena Torres at Stanford, submitted three separate pre-authorization requests and got verbal approval on February 28th. I have the reference number: PA-44921. The hospital was listed in-network on their own provider portal when I checked in January. Now they're saying it was out-of-date. I've been in pain for four months waiting for this appeal.`;

export default function VoiceIntake() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [useRealSTT, setUseRealSTT] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // ─── Real Speechmatics RT — WebSocket flow ──────────────────────
  const startRealStream = useCallback(async () => {
    try {
      setUseRealSTT(true);
      setIsRecording(true);
      setTranscript("");

      const { data, error } = await supabase.functions.invoke("speechmatics-token", {
        body: {},
      });

      if (error || !data?.token) {
        console.error("Failed to get Speechmatics token:", error);
        setUseRealSTT(false);
        simulateDictation();
        return;
      }

      const ws = new WebSocket(`wss://eu.rt.speechmatics.com/v2?jwt=${data.token}`);
      wsRef.current = ws;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
        },
      });
      mediaStreamRef.current = stream;

      const audioContext = new AudioContext({ sampleRate: 16000 });
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            message: "StartRecognition",
            audio_format: {
              type: "raw",
              encoding: "pcm_s16le",
              sample_rate: 16000,
            },
            transcription_config: {
              language: "en",
              max_delay: 3,
              enable_partials: true,
            },
          })
        );

        processor.onaudioprocess = (e) => {
          if (ws.readyState === WebSocket.OPEN) {
            const inputData = e.inputBuffer.getChannelData(0);
            const pcmBuffer = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              pcmBuffer[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32768));
            }
            ws.send(pcmBuffer.buffer);
          }
        };

        source.connect(processor);
        processor.connect(audioContext.destination);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.message === "AddTranscript") {
          setTranscript(msg.metadata?.transcript || "");
        } else if (msg.message === "AddPartialTranscript") {
          setTranscript((msg.metadata?.transcript || "") + " …");
        }
      };

      ws.onerror = () => {
        console.warn("Speechmatics WS error — falling back to simulation");
        cleanupStream();
        setUseRealSTT(false);
        simulateDictation();
      };

      ws.onclose = () => {
        cleanupStream();
        setIsRecording(false);
      };
    } catch {
      console.warn("Mic access denied or unsupported — falling back to simulation");
      setUseRealSTT(false);
      simulateDictation();
    }
  }, []);

  const cleanupStream = useCallback(() => {
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
    wsRef.current?.close();
    wsRef.current = null;
  }, []);

  const stopRecording = useCallback(() => {
    cleanupStream();
    setIsRecording(false);
    if (useRealSTT) {
      wsRef.current?.send(JSON.stringify({ message: "EndOfStream" }));
    }
  }, [cleanupStream, useRealSTT]);

  // ─── Fallback: Simulated dictation ──────────────────────────────
  const simulateDictation = useCallback(() => {
    if (isSimulating) return;
    setUseRealSTT(false);
    setIsSimulating(true);
    setIsRecording(true);
    setTranscript("");

    const words = SAMPLE_TRANSCRIPT.split(" ");
    let wordIndex = 0;

    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        setTranscript((prev) => (prev ? prev + " " : "") + words[wordIndex]);
        wordIndex++;
      } else {
        clearInterval(interval);
        setIsRecording(false);
        setIsSimulating(false);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleToggle = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRealStream();
    }
  }, [isRecording, stopRecording, startRealStream]);

  return (
    <section aria-labelledby="voice-heading" className="animate-slide-up-fade" style={{ animationDelay: "100ms" }}>
      <h2 id="voice-heading" className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
        Speechmatics Voice Intake
      </h2>
      <div className="bg-bg-card rounded-card p-6 shadow-card border border-border">
        {/* Warm, human introduction */}
        <p className="text-sm text-foreground-muted leading-relaxed mb-5 italic">
          Tell MARSHALL what happened in your own words. Speak naturally&mdash;we&rsquo;ll handle the legal details.
        </p>

        {/* Audio Waveform Visualization */}
        <div className="relative flex items-center justify-center gap-[2px] h-16 bg-bg-card-alt rounded-xl mb-4 overflow-hidden border border-border">
          {waveformDelays.map((delay, i) => (
            <span
              key={i}
              className="waveform-bar"
              style={{
                animation: isRecording ? `audio-waveform ${0.4 + delay}s ease-in-out infinite` : "none",
                animationDelay: `${delay}s`,
                height: isRecording ? `${12 + Math.random() * 28}px` : "6px",
                opacity: isRecording ? 1 : 0.25,
                transition: "height 150ms ease-out, opacity 150ms ease-out",
              }}
              aria-hidden="true"
            />
          ))}
          {!isRecording && !transcript && (
            <span className="absolute text-xs text-foreground-muted select-none">
              Your voice will appear here as you speak…
            </span>
          )}
        </div>

        {/* Transcription Output */}
        <div
          className="min-h-[100px] max-h-[200px] overflow-y-auto custom-scrollbar bg-bg-card-alt rounded-xl p-4 border border-border mb-4 font-sans text-sm text-foreground leading-relaxed"
          aria-live="polite"
          aria-atomic="true"
          aria-label="Transcription output"
          role="log"
        >
          {transcript ? (
            <span>
              {transcript}
              {isRecording && <span className="animate-typing-cursor ml-0.5">&nbsp;</span>}
            </span>
          ) : (
            <span className="text-foreground-muted italic">
              Your transcript will appear here during dictation…
            </span>
          )}
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="flex items-center justify-center gap-2 mb-4 text-xs font-semibold text-destructive">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-40" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive" />
            </span>
            Listening &mdash; speak clearly
          </div>
        )}

        {/* Action Button — Large, friendly, human */}
        <button
          onClick={handleToggle}
          disabled={isSimulating}
          aria-pressed={isRecording}
          aria-label={isRecording ? "Stop recording" : "Tap to tell your story"}
          className={`
            w-full flex flex-col items-center justify-center gap-2 px-6 py-6 rounded-button font-semibold
            transition-all duration-200 ease-out
            cursor-pointer
            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            active:scale-[0.97]
            ${isRecording
              ? "bg-destructive/5 text-destructive border-2 border-destructive/25 hover:bg-destructive/10"
              : "bg-primary text-on-primary hover:bg-primary/90 shadow-md hover:shadow-lg"
            }
          `}
        >
          {isRecording ? (
            <>
              <MicOff className="w-6 h-6" aria-hidden="true" />
              <span className="text-sm">Stop Recording</span>
            </>
          ) : (
            <>
              <span
                className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mb-1 transition-all duration-300 ${
                  !isRecording ? "animate-soft-breathe" : ""
                }`}
                aria-hidden="true"
              >
                <Mic className="w-7 h-7" />
              </span>
              <span className="text-base">Tap to Tell Your Story</span>
              <span className="text-xs font-normal opacity-80">
                Speechmatics real-time transcription
              </span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
