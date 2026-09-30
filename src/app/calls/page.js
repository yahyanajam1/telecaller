"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CirclePause, CirclePlay, Headphones, Info, Mic, MicOff, PhoneCall, PhoneOff, Radio, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { AppShell, SectionCard, StatGrid } from "@/components/app-shell";
import { RecordTable } from "@/components/record-table";
import styles from "./page.module.css";

const sampleCalls = [
  { id: "inbound-lead", campaign: "Inbound inquiry", project: "Northline Tower", status: "Live", outcome: "Qualification in progress", duration: "04:18" },
  { id: "outbound-follow-up", campaign: "Tour follow-up", project: "Cedar Residences", status: "Queued", outcome: "Awaiting launch", duration: "--" },
  { id: "spanish-inquiry", campaign: "Spanish inquiry", project: "Harbor Loft", status: "Completed", outcome: "Tour booked", duration: "06:42" },
];

const steps = ["Who are we calling?", "What should the agent do?", "Review the call"];
const sessionSteps = [
  { title: "Open the conversation", instruction: "Introduce the agent and ask whether it is a good time to talk.", prompt: "Hi {firstName}, this is {agent} calling about {project}. Is now a good time?", reply: "Yes, I have a few minutes." },
  { title: "Understand their needs", instruction: "Ask one open question and listen for the reason behind their inquiry.", prompt: "What matters most to you as you look at homes in {project}?", reply: "I am comparing layouts and hoping to move this summer." },
  { title: "Qualify the timeline", instruction: "Clarify timing and answer using approved project information.", prompt: "That helps. What is your ideal move-in timeframe?", reply: "Ideally in the next two or three months." },
  { title: "Agree on a next step", instruction: "Offer one relevant next step and confirm the customer's preference.", prompt: "Would you like me to help arrange a tour that fits your schedule?", reply: "Yes, an afternoon visit would work." },
  { title: "Close and summarize", instruction: "Repeat the agreed action, thank the customer, and end politely.", prompt: "I will note an afternoon tour request. Thanks for your time, {firstName}.", reply: "Thank you. I look forward to it." },
];
const contacts = [
  { name: "Maya Chen", project: "Northline Tower", phone: "+1 (415) 555-0138" },
  { name: "Jordan Alvarez", project: "Cedar Residences", phone: "+1 (415) 555-0172" },
  { name: "Elena Brooks", project: "Harbor Loft", phone: "+1 (415) 555-0194" },
];

export default function CallsPage() {
  const [step, setStep] = useState(0);
  const [project, setProject] = useState("");
  const [contact, setContact] = useState("");
  const [goal, setGoal] = useState("Qualify interest and answer questions");
  const [agent, setAgent] = useState("Sofia Chen · Warm and conversational");
  const [activeSession, setActiveSession] = useState(null);
  const [sessionStep, setSessionStep] = useState(0);
  const [sessionPaused, setSessionPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [completedCall, setCompletedCall] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [recordings, setRecordings] = useState({});
  const [practiceReplies, setPracticeReplies] = useState({});
  const mediaRecorderRef = useRef(null);
  const microphoneStreamRef = useRef(null);
  const recordingChunksRef = useRef([]);
  const recordingStageRef = useRef(0);
  const recordingsRef = useRef({});
  const selectedContact = contacts.find((item) => item.name === contact);
  const projectContacts = contacts.filter((item) => item.project === project);
  const canContinue = step === 0 ? Boolean(project && contact) : step === 1 ? Boolean(goal && agent) : true;
  const visibleSessionSteps = activeSession ? sessionSteps : steps;
  const activeStage = sessionSteps[sessionStep];
  const formatDuration = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const personalize = (text) => text.replaceAll("{firstName}", activeSession?.contact.split(" ")[0] ?? "there").replaceAll("{agent}", activeSession?.agent ?? "the agent").replaceAll("{project}", activeSession?.project ?? "the project");

  useEffect(() => {
    if (!activeSession || sessionPaused) return undefined;
    const timer = setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
    return () => clearInterval(timer);
  }, [activeSession, sessionPaused]);

  useEffect(() => () => {
    window.speechSynthesis?.cancel();
    mediaRecorderRef.current?.stop();
    microphoneStreamRef.current?.getTracks().forEach((track) => track.stop());
    Object.values(recordingsRef.current).forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const focusSetup = () => {
    document.getElementById("call-setup")?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (activeSession) return;
    setStep(0);
    setCompletedCall(null);
  };

  const selectProject = (value) => {
    setProject(value);
    setContact(contacts.find((item) => item.project === value)?.name ?? "");
    setCompletedCall(null);
  };

  const runSimulation = () => {
    window.speechSynthesis?.cancel();
    Object.values(recordingsRef.current).forEach((url) => URL.revokeObjectURL(url));
    recordingsRef.current = {};
    setRecordings({});
    setPracticeReplies({});
    setVoiceError("");
    setActiveSession({
      contact: selectedContact.name,
      project: selectedContact.project,
      goal,
      agent: agent.split(" · ")[0],
    });
    setCompletedCall(null);
    setSessionStep(0);
    setSessionPaused(false);
    setElapsedSeconds(0);
    requestAnimationFrame(() => document.getElementById("call-setup")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const endSession = (completed = false) => {
    window.speechSynthesis?.cancel();
    mediaRecorderRef.current?.stop();
    setCompletedCall({
      contact: activeSession.contact,
      project: activeSession.project,
      agent: activeSession.agent,
      duration: formatDuration(elapsedSeconds),
      result: completed ? "Walkthrough completed" : "Walkthrough ended early",
      finishedAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    });
    setActiveSession(null);
    setSessionPaused(false);
  };

  const advanceSession = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    if (sessionStep === sessionSteps.length - 1) {
      endSession(true);
      return;
    }
    setSessionStep((current) => current + 1);
  };

  const speakCurrentLine = () => {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      setVoiceError("Speech playback is not available in this browser. You can still read the suggested line.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(personalize(activeStage.prompt));
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setVoiceError("Microphone recording is not supported here. You can still follow the written conversation guide.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      microphoneStreamRef.current = stream;
      recordingStageRef.current = sessionStep;
      recordingChunksRef.current = [];
      const recorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) recordingChunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const audio = new Blob(recordingChunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (audio.size > 0) {
          const url = URL.createObjectURL(audio);
          const previousUrl = recordingsRef.current[recordingStageRef.current];
          if (previousUrl) URL.revokeObjectURL(previousUrl);
          recordingsRef.current = { ...recordingsRef.current, [recordingStageRef.current]: url };
          setRecordings(recordingsRef.current);
        }
        stream.getTracks().forEach((track) => track.stop());
        microphoneStreamRef.current = null;
        mediaRecorderRef.current = null;
        setIsRecording(false);
      };
      recorder.start();
      setVoiceError("");
      setIsRecording(true);
    } catch {
      microphoneStreamRef.current?.getTracks().forEach((track) => track.stop());
      microphoneStreamRef.current = null;
      setVoiceError("Microphone access was not granted. Allow microphone access in your browser, or continue with the written guide.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop();
  };

  const toggleSessionPause = () => {
    const nextPaused = !sessionPaused;
    if (isSpeaking) {
      if (nextPaused) window.speechSynthesis.pause();
      else window.speechSynthesis.resume();
    }
    setSessionPaused(nextPaused);
  };

  return (
    <AppShell title="Calls" subtitle="Voice operations" breadcrumb={["Workspace", "Calls"]} primaryActionLabel="Set up a call" onPrimaryAction={focusSetup} headerActionLabel="Set up a call" onHeaderAction={focusSetup}>
      <section id="call-setup" className={`${styles.setupPanel} ${activeSession ? styles.sessionPanel : ""}`} aria-labelledby={activeSession ? "session-title" : "setup-title"}>
        <div className={styles.setupHeader}>
          <div>
            <p className={styles.eyebrow}><Headphones size={14} /> {activeSession ? "In-call walkthrough" : "Guided setup"}</p>
            <h2 id={activeSession ? "session-title" : "setup-title"}>{activeSession ? `Call with ${activeSession.contact}` : "Prepare an outbound call"}</h2>
            <p className={styles.setupIntro}>{activeSession ? "Hear each agent line, practice a reply, and move through the conversation. This browser rehearsal does not dial a phone number." : "Set the recipient and agent instructions, review the call, then start a browser voice rehearsal."}</p>
          </div>
          <span className={`${styles.modeBadge} ${activeSession ? styles.sessionBadge : ""}`}><Radio size={14} /> {activeSession ? "Browser voice rehearsal" : "Browser rehearsal"}</span>
        </div>

        <ol className={styles.stepper} aria-label="Call setup progress">
          {visibleSessionSteps.map((item, index) => {
            const label = activeSession ? item.title : item;
            const currentStep = activeSession ? sessionStep : step;
            return <li key={label} className={index === currentStep ? styles.stepCurrent : index < currentStep ? styles.stepComplete : ""} aria-current={index === currentStep ? "step" : undefined}>
            <span className={styles.stepNumber}>{index < currentStep ? <Check size={14} /> : index + 1}</span>
            <span>{label}</span>
          </li>;
          })}
        </ol>

        <div className={styles.stepContent}>
          {activeSession ? <div className={styles.liveCallGrid}>
            <section className={styles.stageCard} aria-live="polite">
              <div className={styles.sessionStatus}><span className={styles.liveDot} />{sessionPaused ? "Paused" : "In progress"}<strong>{formatDuration(elapsedSeconds)}</strong></div>
              <span className={styles.stageCount}>Stage {sessionStep + 1} of {sessionSteps.length}</span>
              <h3>{activeStage.title}</h3>
              <p className={styles.stageInstruction}>{activeStage.instruction}</p>
              <div className={styles.agentPrompt}>
                <span>Suggested agent line</span>
                <p>“{personalize(activeStage.prompt)}”</p>
                <button className="btn btn-secondary" onClick={() => {
                  if (isSpeaking) {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  } else {
                    speakCurrentLine();
                  }
                }}>{isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}{isSpeaking ? "Stop voice" : "Speak line"}</button>
              </div>
              <div className={styles.operatorCue}><strong>Operator cue</strong><span>{activeSession.goal}. Let the customer finish before moving to the next stage.</span></div>
              <div className={styles.voicePractice}>
                <div><strong>Practice the reply aloud</strong><span>Use your microphone; recording stays in this browser tab.</span></div>
                <button className={isRecording ? "btn btn-danger" : "btn btn-secondary"} onClick={isRecording ? stopRecording : startRecording}>
                  {isRecording ? <><MicOff size={15} /> Stop recording</> : <><Mic size={15} /> Record reply</>}
                </button>
                {recordings[sessionStep] ? <audio className={styles.replyAudio} controls src={recordings[sessionStep]} aria-label={`Recorded practice reply for ${activeStage.title}`} /> : null}
                {voiceError ? <p className={styles.voiceError} role="alert">{voiceError}</p> : null}
              </div>
              <label className={styles.practiceTextLabel}>
                <span>Type a practice reply</span>
                <textarea className="textarea" rows={2} value={practiceReplies[sessionStep] ?? ""} onChange={(event) => setPracticeReplies((current) => ({ ...current, [sessionStep]: event.target.value }))} placeholder="Write what you would say as the customer" />
              </label>
              <div className={styles.stageControls}>
                <button className="btn btn-secondary" onClick={() => setSessionStep((current) => Math.max(0, current - 1))} disabled={sessionStep === 0 || sessionPaused}><ArrowLeft size={15} /> Previous</button>
                <button className="btn btn-primary" onClick={advanceSession} disabled={sessionPaused || isRecording}>{sessionStep === sessionSteps.length - 1 ? <><Check size={15} /> Finish walkthrough</> : <>Complete stage <ArrowRight size={15} /></>}</button>
              </div>
            </section>
            <section className={styles.transcriptPanel} aria-label="Scripted conversation preview">
              <div className={styles.transcriptHeader}><div><strong>Rehearsal transcript</strong><span>Sample lines with your recorded practice reply</span></div><Headphones size={17} /></div>
              <div className={styles.transcriptTurns}>
                {sessionSteps.slice(0, sessionStep + 1).map((turn, index) => <div className={styles.transcriptPair} key={turn.title}>
                  <p className={styles.agentTurn}><span>{activeSession.agent}</span>{personalize(turn.prompt)}</p>
                  <p className={styles.contactTurn}><span>{practiceReplies[index]?.trim() ? `${activeSession.contact} · Your reply` : `${activeSession.contact} · Sample reply`}</span>{practiceReplies[index]?.trim() || turn.reply}</p>
                  {recordings[index] ? <audio className={styles.transcriptAudio} controls src={recordings[index]} aria-label={`Recorded reply for ${sessionSteps[index].title}`} /> : null}
                  {index < sessionStep ? <span className={styles.turnComplete}><Check size={12} /> Stage complete</span> : null}
                </div>)}
              </div>
              <div className={styles.transcriptFooter}>Local voice rehearsal. Nothing is sent to a contact or uploaded.</div>
            </section>
          </div> : <>
          {step === 0 ? <div className={styles.formGrid}>
            <label className="form-group"><span className="label">1. Select a project</span>
              <select className="select" value={project} onChange={(event) => selectProject(event.target.value)}>
                <option value="">Choose a project</option>
                {[...new Set(contacts.map((item) => item.project))].map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="form-group"><span className="label">2. Select a contact</span>
              <select className="select" value={contact} onChange={(event) => { setContact(event.target.value); setCompletedCall(null); }} disabled={!project}>
                {!project ? <option value="">Choose a project first</option> : null}
                {projectContacts.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
              </select>
            </label>
            {selectedContact ? <div className={styles.contactPreview}><PhoneCall size={16} /><span><strong>{selectedContact.name}</strong><small>{selectedContact.phone} · {selectedContact.project}</small></span><span className={styles.sampleTag}>Sample contact</span></div> : null}
          </div> : null}

          {step === 1 ? <div className={styles.formGrid}>
            <label className="form-group"><span className="label">3. Choose the call objective</span>
              <select className="select" value={goal} onChange={(event) => { setGoal(event.target.value); setCompletedCall(null); }}>
                <option>Qualify interest and answer questions</option>
                <option>Follow up after a property tour</option>
                <option>Offer available appointment times</option>
              </select>
              <small className={styles.fieldHint}>This tells the agent what a successful conversation should accomplish.</small>
            </label>
            <label className="form-group"><span className="label">4. Choose a voice agent</span>
              <select className="select" value={agent} onChange={(event) => { setAgent(event.target.value); setCompletedCall(null); }}>
                <option>Sofia Chen · Warm and conversational</option>
                <option>Darius Patel · Direct and concise</option>
              </select>
              <small className={styles.fieldHint}>The agent uses the selected project&apos;s approved information.</small>
            </label>
          </div> : null}

          {step === 2 ? <div className={styles.reviewGrid}>
            <div className={styles.reviewDetails}>
              <p><span>Contact</span><strong>{selectedContact?.name || "Select a contact"}</strong></p>
              <p><span>Number</span><strong>{selectedContact?.phone || "Not set"}</strong></p>
              <p><span>Project</span><strong>{selectedContact?.project || "Not set"}</strong></p>
              <p><span>Objective</span><strong>{goal}</strong></p>
              <p><span>Voice agent</span><strong>{agent.split(" · ")[0]}</strong></p>
            </div>
            <div className={styles.previewScript}>
              <div className={styles.previewTitle}><Headphones size={16} /><strong>Conversation preview</strong></div>
              <p><span>Agent</span> “Hi {selectedContact?.name?.split(" ")[0] || "there"}, I&apos;m calling about {selectedContact?.project || "your inquiry"}. I&apos;d like to {goal.toLowerCase()}. Is now a good time?”</p>
              <p className={styles.previewNote}>Preview text only. No call, message, or charge will be made.</p>
            </div>
          </div> : null}
          </>}
        </div>

        {activeSession ? <div className={styles.sessionActions}>
          <button className="btn btn-danger" onClick={() => endSession(false)}><PhoneOff size={15} /> End walkthrough</button>
          <button className="btn btn-secondary" disabled={isRecording} onClick={toggleSessionPause}>{sessionPaused ? <CirclePlay size={15} /> : <CirclePause size={15} />}{sessionPaused ? "Resume" : "Pause"}</button>
        </div> : <div className={styles.stepActions}>
          {step > 0 ? <button className="btn btn-secondary" onClick={() => { setStep((current) => current - 1); setCompletedCall(null); }}><ArrowLeft size={15} /> Back</button> : <span className={styles.stepHint}>Step {step + 1} of {steps.length}</span>}
          {step < 2 ? <button className="btn btn-primary" disabled={!canContinue} onClick={() => { setStep((current) => current + 1); setCompletedCall(null); }}>Continue <ArrowRight size={15} /></button> : <button className="btn btn-primary" disabled={!selectedContact} onClick={runSimulation}><PhoneCall size={15} /> Start voice rehearsal</button>}
        </div>}

        {completedCall && !activeSession ? <div className={styles.simulationResult} role="status" aria-live="polite">
          <span className={styles.resultIcon}><Check size={17} /></span>
          <div><strong>{completedCall.result} · {completedCall.duration}</strong><p>{completedCall.agent} · {completedCall.contact} · {completedCall.project}</p><small>No phone call was placed. Connect a telephony provider to enable outbound calling.</small></div>
          <button className="btn btn-ghost" onClick={() => { setCompletedCall(null); setStep(0); }}><RotateCcw size={14} /> New walkthrough</button>
        </div> : null}
      </section>

      <StatGrid items={[
        { value: "01", label: "Live example", change: "Sample activity" },
        { value: "01", label: "Queued example", change: "Not connected" },
        { value: "01", label: "Completed example", change: "Sample activity" },
        { value: "Not connected", label: "Phone provider", change: "Simulation mode" },
      ]} />

      <div className={styles.notice}><Info size={17} /><p><strong>Browser rehearsal:</strong> Voice playback and microphone recording happen in this tab. The call records below are examples; no phone provider or live dialer is connected.</p></div>

      <SectionCard title="Example call activity" subtitle="Reference states for call monitoring. These are sample records, not live calls.">
        <RecordTable
          records={sampleCalls}
          columns={[{ key: "campaign", label: "Campaign" }, { key: "project", label: "Project" }, { key: "status", label: "Status" }, { key: "outcome", label: "Outcome" }, { key: "duration", label: "Duration" }]}
          detailHref={(call) => `/calls/${call.id}`}
          searchPlaceholder="Search campaigns or projects"
        />
      </SectionCard>
    </AppShell>
  );
}
