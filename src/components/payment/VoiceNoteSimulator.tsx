import React, { useState } from 'react';
import { Mic, Play, Pause, CheckCircle2 } from 'lucide-react';

interface VoiceNoteSimulatorProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  probability: number;
  transcription: string;
}

const WAVEFORM = [30, 55, 80, 45, 65, 90, 50, 70, 85, 40, 60, 75, 55, 35, 50, 70, 85, 45, 60, 40];

export const VoiceNoteSimulator: React.FC<VoiceNoteSimulatorProps> = ({
  enabled,
  onToggle,
  probability,
  transcription,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="p-4 rounded-xl bg-navy-850 border border-navy-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-slate-400">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-medium text-white">Attach a voice note</span>
            <p className="text-[11px] text-slate-500">Simulate an incoming voice message with this payment</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-navy-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
        </label>
      </div>

      {enabled ? (
        <div className="pt-1 space-y-2.5 animate-in fade-in duration-200">
          {/* Chat-style incoming voice memo bubble */}
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-[10px] font-semibold text-emerald-400 shrink-0">
              {(transcription ? 'M' : 'M')}
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-navy-800 border border-navy-700 px-3.5 py-2.5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 hover:bg-emerald-500/25 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div className="flex-1 flex items-center gap-0.5 h-6">
                  {WAVEFORM.map((val, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 rounded-full transition-colors ${
                        isPlaying ? 'bg-emerald-400' : 'bg-navy-600'
                      }`}
                      style={{ height: `${val}%` }}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-slate-500 shrink-0">0:14</span>
              </div>
            </div>
          </div>

          {/* Risk pill under bubble */}
          <div className="flex items-center gap-2 pl-9">
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
              {probability}% AI Voice Match
            </span>
          </div>

          {/* Transcript */}
          <div className="ml-9 p-3 rounded-lg bg-navy-900/60 border border-navy-800 text-xs">
            <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Transcript</div>
            <p className="text-slate-300 italic leading-relaxed">"{transcription}"</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>No voice note attached — standard text and payee screening applies.</span>
        </div>
      )}
    </div>
  );
};
