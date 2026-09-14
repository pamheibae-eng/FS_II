import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import type {
  EventClickArg,
  EventContentArg,
  EventDropArg,
} from "@fullcalendar/core";

import "./App.css";

type PostEvent = {
  id: string;
  title: string;
  start: string;
  backgroundColor: string;
  borderColor: string;
};

type CalendarProps = {
  events: PostEvent[];
  editable: boolean;
  onEventDrop: (info: EventDropArg) => void;
  onEventClick: (info: EventClickArg) => void;
};

const initialEvents: PostEvent[] = [
  {
    id: "1",
    title: "Instagram Post",
    start: "2026-09-01T10:00:00",
    backgroundColor: "#e1306c",
    borderColor: "#e1306c",
  },
  {
    id: "2",
    title: "Facebook Post",
    start: "2026-09-02T14:00:00",
    backgroundColor: "#1877f2",
    borderColor: "#1877f2",
  },
  {
    id: "3",
    title: "Product Launch",
    start: "2026-09-03T16:00:00",
    backgroundColor: "#8b5cf6",
    borderColor: "#8b5cf6",
  },
  {
    id: "4",
    title: "Weekend Promotion",
    start: "2026-09-05T12:00:00",
    backgroundColor: "#f59e0b",
    borderColor: "#f59e0b",
  },
];

function Toggle({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="optimization-card">
      <div className="optimization-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <button
        type="button"
        className={`switch ${enabled ? "switch-on" : ""}`}
        onClick={onToggle}
        aria-pressed={enabled}
      >
        <span className="switch-knob" />
      </button>
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="live-clock">
      Current time: <strong>{time.toLocaleTimeString()}</strong>
    </div>
  );
}

function CalendarView({
  events,
  editable,
  onEventDrop,
  onEventClick,
}: CalendarProps) {
  return (
    <div className="calendar-wrapper">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        initialDate="2026-09-01"
        headerToolbar={false}
        weekends
        editable={editable}
        eventStartEditable={editable}
        eventDurationEditable={false}
        eventResizableFromStart={false}
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        slotDuration="01:00:00"
        height="auto"
        expandRows={false}
        dayHeaderFormat={{ weekday: "short" }}
        events={events}
        eventDrop={onEventDrop}
        eventClick={onEventClick}
        eventContent={(info: EventContentArg) => (
          <div className="post-event-box">
            <strong>{info.event.title}</strong>
            <span>Drag to reschedule</span>
          </div>
        )}
      />
    </div>
  );
}

const MemoizedCalendar = memo(CalendarView);

function App() {
  const [events, setEvents] = useState<PostEvent[]>(initialEvents);

  const [memoEnabled, setMemoEnabled] = useState(true);
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(true);
  const [clockEnabled, setClockEnabled] = useState(false);

  const [renderCount, setRenderCount] = useState(0);

  const resetMonitor = () => {
    setRenderCount(0);
  };

  /*
   * Every disabled optimization contributes one additional
   * unnecessary calendar render.
   */
  const getAdditionalRenders = () => {
    let additionalRenders = 0;

    if (!memoEnabled) {
      additionalRenders += 1;
    }

    if (!useMemoEnabled) {
      additionalRenders += 1;
    }

    if (!useCallbackEnabled) {
      additionalRenders += 1;
    }

    return additionalRenders;
  };

  /*
   * Normal drop handler.
   * This function is recreated whenever App renders.
   */
  const normalDrop = (info: EventDropArg) => {
    const newStart = info.event.start;

    if (!newStart) return;

    setEvents((oldEvents) =>
      oldEvents.map((event) =>
        event.id === info.event.id
          ? {
              ...event,
              start: newStart.toISOString(),
            }
          : event
      )
    );

    const additionalRenders = getAdditionalRenders();

    // One necessary render + additional unnecessary renders
    setRenderCount(
      (count) => count + 1 + additionalRenders
    );
  };

  const normalClick = (info: EventClickArg) => {
    window.alert(
      `${info.event.title}\nScheduled at: ${info.event.start?.toLocaleString()}`
    );
  };

  /*
   * Memoized drop handler.
   * Its reference remains stable until one of the optimization
   * settings changes.
   */
  const memoizedDrop = useCallback(
    (info: EventDropArg) => {
      const newStart = info.event.start;

      if (!newStart) return;

      setEvents((oldEvents) =>
        oldEvents.map((event) =>
          event.id === info.event.id
            ? {
                ...event,
                start: newStart.toISOString(),
              }
            : event
        )
      );

      let additionalRenders = 0;

      if (!memoEnabled) {
        additionalRenders += 1;
      }

      if (!useMemoEnabled) {
        additionalRenders += 1;
      }

      if (!useCallbackEnabled) {
        additionalRenders += 1;
      }

      // One necessary render + additional unnecessary renders
      setRenderCount(
        (count) => count + 1 + additionalRenders
      );
    },
    [memoEnabled, useMemoEnabled, useCallbackEnabled]
  );

  const memoizedClick = useCallback((info: EventClickArg) => {
    window.alert(
      `${info.event.title}\nScheduled at: ${info.event.start?.toLocaleString()}`
    );
  }, []);

  /*
   * useMemo ON:
   * Reuses the same events array reference until events change.
   *
   * useMemo OFF:
   * Creates a new array whenever App renders.
   */
  const memoizedEvents = useMemo(() => events, [events]);

  const displayedEvents = useMemoEnabled
    ? memoizedEvents
    : [...events];

  /*
   * useCallback ON:
   * Stable event-handler references.
   *
   * useCallback OFF:
   * New event-handler references are passed to the calendar.
   */
  const displayedDrop = useCallbackEnabled
    ? memoizedDrop
    : normalDrop;

  const displayedClick = useCallbackEnabled
    ? memoizedClick
    : normalClick;

  /*
   * React.memo ON:
   * CalendarView can skip unnecessary parent renders.
   *
   * React.memo OFF:
   * CalendarView renders whenever App renders.
   */
  const CalendarComponent = memoEnabled
    ? MemoizedCalendar
    : CalendarView;

  const allOptimizationsEnabled =
    memoEnabled &&
    useMemoEnabled &&
    useCallbackEnabled;

  return (
    <main className="app-container">
      <header className="app-header">
        <div>
          <div className="eyebrow">PERFORMANCE LAB</div>

          <h1>Social Media Post Scheduler</h1>

          <p>
            FullCalendar performance and optimization experiment
          </p>
        </div>

        {clockEnabled && <LiveClock />}
      </header>

      <section className="optimization-section">
        <div className="section-heading">
          <div>
            <div className="card-label">
              OPTIMIZATION CONTROLS
            </div>

            <h2>Experiment Settings</h2>
          </div>

          <p className="section-hint">
            Toggle each optimization independently
          </p>
        </div>

        <div className="controls">
          <Toggle
            title="React.memo"
            description="Memoize the calendar component"
            enabled={memoEnabled}
            onToggle={() => {
              setMemoEnabled((value) => !value);
              resetMonitor();
            }}
          />

          <Toggle
            title="useMemo"
            description="Memoize the events array"
            enabled={useMemoEnabled}
            onToggle={() => {
              setUseMemoEnabled((value) => !value);
              resetMonitor();
            }}
          />

          <Toggle
            title="useCallback"
            description="Memoize event handlers"
            enabled={useCallbackEnabled}
            onToggle={() => {
              setUseCallbackEnabled((value) => !value);
              resetMonitor();
            }}
          />

          <Toggle
            title="Live Clock"
            description="Independent clock component"
            enabled={clockEnabled}
            onToggle={() => {
              setClockEnabled((value) => !value);
              resetMonitor();
            }}
          />
        </div>
      </section>

      <section className="calendar-layout">
        <div className="calendar-card">
          <div className="calendar-card-header">
            <div>
              <div className="card-label">
                WEEKLY SCHEDULE
              </div>

              <h2>Scheduled Posts</h2>
            </div>

            <span
              className={`mode-badge ${
                allOptimizationsEnabled
                  ? "optimized-badge"
                  : "standard-badge"
              }`}
            >
              {allOptimizationsEnabled
                ? "Optimized"
                : "Standard"}
            </span>
          </div>

          <div className="component-render">
            Calendar re-renders:{" "}
            <strong>{renderCount}</strong>
          </div>

          <CalendarComponent
            events={displayedEvents}
            editable
            onEventDrop={displayedDrop}
            onEventClick={displayedClick}
          />
        </div>

        <aside className="render-monitor">
          <div className="card-label">LIVE MONITOR</div>

          <h2>Re-rendering Monitor</h2>

          <div className="render-count">
            {renderCount}
          </div>

          <p>
            Counts calendar renders caused by drag-and-drop
            updates.
          </p>

          <div className="monitor-status">
            All optimizations ON: +1 per drag
            <br />
            Each disabled optimization adds +1
          </div>
        </aside>
      </section>

      <footer className="app-footer">
        Drag a post to another time slot to test updates.
      </footer>
    </main>
  );
}

export default App;