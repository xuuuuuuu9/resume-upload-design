import { useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from 'react'

function UploadIcon() {
  return (
    <svg className="upload-icon" width="58" height="44" viewBox="0 0 58 44" fill="none" aria-hidden="true">
      <path d="M12.5 33.5C6.7 33.5 3 29.7 3 24.5c0-5.1 3.9-9.1 8.9-9.1.9-7 6.9-12.4 14.2-12.4 6.1 0 11.5 3.8 13.4 9.4 1.2-.4 2.5-.7 3.9-.7 6.4 0 11.6 5.1 11.6 11.4 0 6.4-5.2 11.4-11.6 11.4H38" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M29 40V20m0 0-7 7m7-7 7 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Progress() {
  return (
    <div className="progress" aria-label="Step 3 of 3">
      <div className="progress-line" />
      <div className="progress-points" aria-hidden="true">
        <span className="progress-point complete">✓</span>
        <span className="progress-point complete">✓</span>
        <span className="progress-point current">3</span>
      </div>
    </div>
  )
}

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [message, setMessage] = useState('')

  function openPicker() {
    inputRef.current?.click()
  }

  function handleSelection(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0]
    if (selected) {
      setFile(selected)
      setMessage('')
    }
  }

  function handleDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault()
    setIsDragging(false)
    const selected = event.dataTransfer.files?.[0]
    if (selected) {
      setFile(selected)
      setMessage('')
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openPicker()
    }
  }

  return (
    <main className="page">
      <section className="intro" aria-labelledby="intro-title">
        <div className="intro-copy">
          <h1 id="intro-title">finish!<br />Upload your resume</h1>
          <p>Upload your resume, the platform will help you parse and optimize, you can also skip this step</p>
        </div>
        <img className="illustration" src="/assets/resume-illustration.png" alt="Blue cat beside a phone and chat bubbles" />
      </section>

      <section className="upload-card" aria-labelledby="upload-title">
        <h2 id="upload-title">Upload file</h2>
        <input ref={inputRef} className="file-input" type="file" id="resume-file" onChange={handleSelection} aria-label="Choose a resume file" />
        <div
          className={`drop-zone${isDragging ? ' is-dragging' : ''}`}
          role="button"
          tabIndex={0}
          aria-label="Choose or drop your resume file"
          onClick={openPicker}
          onKeyDown={handleKeyDown}
          onDragEnter={(event) => { event.preventDefault(); setIsDragging(true) }}
          onDragOver={(event) => { event.preventDefault(); setIsDragging(true) }}
          onDragLeave={(event) => { event.preventDefault(); setIsDragging(false) }}
          onDrop={handleDrop}
        >
          <UploadIcon />
          <p className="drop-copy">Drag your resume file to this area, or click on the area to select the appropriate file to upload</p>
          {file && <p className="selected-file" aria-live="polite">Selected: {file.name}</p>}
        </div>
        <div className="actions">
          <button className="action action-secondary" type="button" onClick={() => setMessage('This is the last step in the provided design.')}>Last step</button>
          <button className="action action-primary" type="button" onClick={() => setMessage(file ? `Selected file: ${file.name}` : 'You can finish without uploading a resume.')}>finish</button>
        </div>
        <p className="action-message" role="status">{message}</p>
        <Progress />
      </section>
    </main>
  )
}
