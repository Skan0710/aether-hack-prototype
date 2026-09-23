import React, { useState } from 'react';
import { Mic, Play, Pause, AlertOctagon, CheckCircle2, Volume2 } from 'lucide-react';

interface VoiceNoteSimulatorProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  probability: number;
  transcription: string;
}

export const VoiceNoteSimulator: React.FC<VoiceNoteSimulatorProps> = ({
  enabled,
  onToggle,
  probability,
  transcription,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="p-4 rounded-xl bg-navy-850 border border-navy-750 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-navy-800 border border-navy-700 flex items-center justify-center text-cyan-400">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white">Voice Note Pre-Payment Analysis</span>
            <p className="text-[11px] text-slate-400">Evaluate acoustic neural clone probability</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-navy-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
        </label>
      </div>

      {enabled ? (
        <div className="pt-2 border-t border-navy-800 space-y-3 animate-in fade-in duration-200">
          {/* Audio Player bar */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-900 border border-navy-750">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0 hover:bg-rose-500/30 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-300 flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-rose-400" />
                  <span>voice_note_incoming.ogg</span>
                </span>
                <span className="text-rose-400 font-semibold">{probability}% AI Likely</span>
              </div>
              {/* Simulated Waveform bars */}
              <div className="flex items-center gap-1 h-5 py-1">
                {[40, 70, 95, 30, 80, 100, 60, 85, 90, 45, 75, 95, 80, 30, 60, 90, 100, 40].map(
                  (val, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 rounded-full transition-all ${
                        isPlaying ? 'animate-pulse bg-rose-400' : 'bg-navy-700'
                      }`}
                      style={{ height: `${val}%` }}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Transcript Box */}
          <div className="p-3 rounded-lg bg-navy-900/60 border border-navy-800 text-xs">
            <div className="text-[10px] text-slate-400 uppercase font-mono mb-1">
              Acoustic Transcript:
            </div>
            <p className="text-slate-200 italic leading-relaxed">
              "{transcription}"
            </p>
          </div>

          {/* Neural Classifier Signal */}
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs">
            <div className="flex items-center gap-1.5 text-rose-400 font-medium">
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>DeepFake Classifier: Synthetic Artifacts Detected</span>
            </div>
            <span className="font-mono font-bold text-rose-300">{probability}% AI-Generated</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
          <span>No voice note attached. Standard text and payee screening applied.</span>
        </div>
      )}
    </div>
  );
};
