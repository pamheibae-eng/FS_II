import {
  useState,
  useRef,
  useMemo,
  useCallback,
  memo,
  useEffect,
} from "react";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import interactionPlugin from "@fullcalendar/react/interaction";

import "@fullcalendar/react/skeleton.css";
import "./App.css";

// --------------------
// Types
// --------------------

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
};

type CalendarProps = {
  events: CalendarEvent[];
  onDrop: (info: any) => void;
  onClick: (info: any) => void;
};

// --------------------
// Initial events
// --------------------

const initialEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Instagram Post",
    start: "2026-09-01T10:00:00",
  },
  {
    id: "2",
    title: "Facebook Post",
    start: "2026-09-02T14:00:00",
  },
  {
    id: "3",
    title: "Product Launch",
    start: "2026-09-03T16:00:00",
  },
  {
    id: "4",
    title: "Weekend Promotion",
    start: "2026-09-05T12:00:00",
  },
];

// --------------------
// Non-optimized calendar
// --------------------

function NonOptimizedCalendar({
  events,
  onDrop,
  onClick,
}: CalendarProps) {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div>
      <p className="component-render">
        Non-Optimized Calendar renders:{" "}
        <strong>{renderCount.current}</strong>
      </p>

      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        initialDate="2026-09-01"
        headerToolbar={false}
        events={events}
        editable={true}
        eventDrop={onDrop}
        eventClick={onClick}
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        height="auto"
      />
    </div>
  );
}

// --------------------
// Optimized calendar
// --------------------

const OptimizedCalendar = memo(function OptimizedCalendar({
  events,
  onDrop,
  onClick,
}: CalendarProps) {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div>
      <p className="component-render">
        Optimized Calendar renders:{" "}
        <strong>{renderCount.current}</strong>
      </p>

      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        initialDate="2026-09-01"
        headerToolbar={false}
        events={events}
        editable={true}
        eventDrop={onDrop}
        eventClick={onClick}
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        height="auto"
      />
    </div>
  );
});

// --------------------
// Re-render monitor
// --------------------

function RenderMonitor({
  memoEnabled,
  useMemoEnabled,
  useCallbackEnabled,
}: {
  memoEnabled: boolean;
  useMemoEnabled: boolean;
  useCallbackEnabled: boolean;
}) {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div className="monitor">
      <h2>🔄 Re-rendering Monitor</h2>

      <p>
        Monitor renders:{" "}
        <strong>{renderCount.current}</strong>
      </p>

      <div className="monitor-status">
        <span className={memoEnabled ? "enabled" : "disabled"}>
          React.memo: {memoEnabled ? "ON" : "OFF"}
        </span>

        <span className={useMemoEnabled ? "enabled" : "disabled"}>
          useMemo: {useMemoEnabled ? "ON" : "OFF"}
        </span>

        <span
          className={
            useCallbackEnabled ? "enabled" : "disabled"
          }
        >
          useCallback: {useCallbackEnabled ? "ON" : "OFF"}
        </span>
      </div>
    </div>
  );
}

// --------------------
// Main App
// --------------------

function App() {
  const [events, setEvents] =
    useState<CalendarEvent[]>(initialEvents);

  const [memoEnabled, setMemoEnabled] = useState(false);

  const [useMemoEnabled, setUseMemoEnabled] =
    useState(false);

  const [useCallbackEnabled, setUseCallbackEnabled] =
    useState(false);

  const [parentRenderCount, setParentRenderCount] =
    useState(0);

  const [testValue, setTestValue] = useState(0);

  // --------------------
  // Parent render counter
  // --------------------

  useEffect(() => {
    setParentRenderCount((count) => count + 1);
  }, [
    testValue,
    memoEnabled,
    useMemoEnabled,
    useCallbackEnabled,
  ]);

  // --------------------
  // useMemo example
  // --------------------

  const memoizedEvents = useMemo(() => {
    return events;
  }, [events]);

  const calendarEvents = useMemoEnabled
    ? memoizedEvents
    : events;

  // --------------------
  // Normal event handlers
  // --------------------

  const normalEventDrop = (info: any) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === info.event.id
          ? {
              ...event,
              start:
                info.event.start?.toISOString() ??
                event.start,
            }
          : event
      )
    );
  };

  const normalEventClick = (info: any) => {
    alert(`Post: ${info.event.title}`);
  };

  // --------------------
  // useCallback handlers
  // --------------------

  const memoizedEventDrop = useCallback((info: any) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === info.event.id
          ? {
              ...event,
              start:
                info.event.start?.toISOString() ??
                event.start,
            }
          : event
      )
    );
  }, []);

  const memoizedEventClick = useCallback((info: any) => {
    alert(`Post: ${info.event.title}`);
  }, []);

  const eventDrop = useCallbackEnabled
    ? memoizedEventDrop
    : normalEventDrop;

  const eventClick = useCallbackEnabled
    ? memoizedEventClick
    : normalEventClick;

  // --------------------
  // Toggle handlers
  // --------------------

  const toggleMemo = () => {
    setMemoEnabled((value) => !value);
    setTestValue((value) => value + 1);
  };

  const toggleUseMemo = () => {
    setUseMemoEnabled((value) => !value);
    setTestValue((value) => value + 1);
  };

  const toggleUseCallback = () => {
    setUseCallbackEnabled((value) => !value);
    setTestValue((value) => value + 1);
  };

  // --------------------
  // Reset calendar
  // --------------------

  const resetCalendar = () => {
    setEvents(initialEvents);
    setTestValue((value) => value + 1);
  };

  // --------------------
  // Test parent re-render
  // --------------------

  const testParentRerender = () => {
    setTestValue((value) => value + 1);
  };

  // --------------------
  // UI
  // --------------------

  return (
    <div className="app">
      {/* Always visible monitor */}

      <RenderMonitor
        memoEnabled={memoEnabled}
        useMemoEnabled={useMemoEnabled}
        useCallbackEnabled={useCallbackEnabled}
      />

      <h1>📅 Weekly Post Scheduling Calendar</h1>

      <p className="description">
        Drag posts to another time to reschedule them.
      </p>

      {/* Optimization toggles */}

      <div className="controls">
        <label className="toggle">
          <input
            type="checkbox"
            checked={memoEnabled}
            onChange={toggleMemo}
          />
          <span>React.memo</span>
        </label>

        <label className="toggle">
          <input
            type="checkbox"
            checked={useMemoEnabled}
            onChange={toggleUseMemo}
          />
          <span>useMemo</span>
        </label>

        <label className="toggle">
          <input
            type="checkbox"
            checked={useCallbackEnabled}
            onChange={toggleUseCallback}
          />
          <span>useCallback</span>
        </label>
      </div>

      {/* Parent render count */}

      <div className="render-summary">
        Parent renders:{" "}
        <strong>{parentRenderCount}</strong>
      </div>

      {/* Calendar */}

      <div className="calendar-container">
        {memoEnabled ? (
          <OptimizedCalendar
            events={calendarEvents}
            onDrop={eventDrop}
            onClick={eventClick}
          />
        ) : (
          <NonOptimizedCalendar
            events={calendarEvents}
            onDrop={eventDrop}
            onClick={eventClick}
          />
        )}
      </div>

      {/* Test buttons */}

      <div className="button-group">
        <button
          className="test-button"
          onClick={testParentRerender}
        >
          Test Parent Re-render
        </button>

        <button
          className="reset-button"
          onClick={resetCalendar}
        >
          Reset Calendar
        </button>
      </div>
    </div>
  );
}

export default App;